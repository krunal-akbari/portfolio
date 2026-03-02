import { mkdir, readFile, rename, writeFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import { createClient } from "@supabase/supabase-js";

import {
  isTaskCategory,
  isTaskPriority,
  isTaskStatus,
  type Task,
  type TaskInput,
  type TaskUpdateInput,
} from "@/lib/task-types";

const DEFAULT_STORAGE_FILE = join(process.cwd(), ".data", "glass-todo-tasks.json");
const LEGACY_STORAGE_FILE = "/tmp/glass-todo-tasks.json";
const TASKS_STORAGE_FILE_ENV = process.env.TASKS_STORAGE_FILE?.trim();
const STORAGE_FILE = TASKS_STORAGE_FILE_ENV || DEFAULT_STORAGE_FILE;
const SUPABASE_URL =
  process.env.SUPABASE_URL?.trim() ||
  process.env.NEXT_PUBLIC_SUPABASE_URL?.trim() ||
  process.env.SUPPERBASE_PROJECT_URI?.trim() ||
  "";
const SUPABASE_KEY =
  process.env.SUPABASE_SERVICE_ROLE_KEY?.trim() ||
  process.env.SUPABASE_SECRET_KEY?.trim() ||
  process.env.SUPABASE_SERVICE_KEY?.trim() ||
  process.env.SUPABASE_KEY?.trim() ||
  process.env.SUPPERBASE_KEY?.trim() ||
  "";
const SUPABASE_TASKS_TABLE = process.env.SUPABASE_TASKS_TABLE?.trim() || "tasks";

type TasksFile = {
  tasks: Task[];
};

type DbTaskRow = {
  id: string;
  title: string;
  description: string;
  priority: string;
  category: string;
  image_url: string | null;
  status: string;
  due_date: string | null;
  created_at: string;
  updated_at: string;
};

type SupabaseDatabase = {
  public: {
    Tables: {
      tasks: {
        Row: DbTaskRow;
        Insert: DbTaskRow;
        Update: Partial<DbTaskRow>;
        Relationships: [];
      };
    };
    Views: Record<string, never>;
    Functions: Record<string, never>;
    Enums: Record<string, never>;
    CompositeTypes: Record<string, never>;
  };
};

type TaskSupabaseClient = ReturnType<typeof createClient<SupabaseDatabase>>;

let writeQueue = Promise.resolve();
let supabaseClient: TaskSupabaseClient | null = null;

function enqueueWrite<T>(operation: () => Promise<T>) {
  const next = writeQueue.then(operation, operation);
  writeQueue = next.then(
    () => undefined,
    () => undefined,
  );
  return next;
}

function isIsoDate(value: string) {
  return /^\d{4}-\d{2}-\d{2}$/.test(value);
}

function hasSupabaseConfig() {
  return Boolean(SUPABASE_URL && SUPABASE_KEY);
}

function getSupabaseClient() {
  if (!hasSupabaseConfig()) {
    return null;
  }

  if (!supabaseClient) {
    supabaseClient = createClient<SupabaseDatabase>(SUPABASE_URL, SUPABASE_KEY, {
      auth: {
        autoRefreshToken: false,
        persistSession: false,
      },
    });
  }

  return supabaseClient;
}

function coerceTask(candidate: unknown): Task | null {
  if (!candidate || typeof candidate !== "object") {
    return null;
  }

  const input = candidate as Partial<Task>;
  const category = input.category;
  const priority = input.priority;
  const status = input.status;

  if (
    typeof input.id !== "string" ||
    typeof input.title !== "string" ||
    typeof input.description !== "string" ||
    typeof input.createdAt !== "string" ||
    typeof input.updatedAt !== "string" ||
    typeof priority !== "string" ||
    typeof status !== "string" ||
    !isTaskPriority(priority) ||
    !isTaskStatus(status)
  ) {
    return null;
  }

  const dueDate =
    input.dueDate === null || (typeof input.dueDate === "string" && isIsoDate(input.dueDate))
      ? input.dueDate
      : null;

  return {
    id: input.id,
    title: input.title,
    description: input.description,
    priority,
    category:
      typeof category === "string" && isTaskCategory(category)
        ? category
        : "work",
    imageUrl: typeof input.imageUrl === "string" ? input.imageUrl : null,
    status,
    dueDate,
    createdAt: input.createdAt,
    updatedAt: input.updatedAt,
  };
}

function fromDbRow(row: DbTaskRow): Task | null {
  return coerceTask({
    id: row.id,
    title: row.title,
    description: row.description,
    priority: row.priority,
    category: row.category,
    imageUrl: row.image_url,
    status: row.status,
    dueDate: row.due_date,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  });
}

function toDbRow(task: Task): DbTaskRow {
  return {
    id: task.id,
    title: task.title,
    description: task.description,
    priority: task.priority,
    category: task.category,
    image_url: task.imageUrl,
    status: task.status,
    due_date: task.dueDate,
    created_at: task.createdAt,
    updated_at: task.updatedAt,
  };
}

function formatDbError(context: string, error: { message: string; details?: string | null }) {
  const details = error.details ? ` (${error.details})` : "";
  return `${context}: ${error.message}${details}`;
}

async function readStoreFile(filePath: string): Promise<TasksFile | null> {
  try {
    const file = await readFile(filePath, "utf8");
    const parsed = JSON.parse(file) as Partial<TasksFile>;

    const tasks = Array.isArray(parsed.tasks)
      ? parsed.tasks.map(coerceTask).filter((task): task is Task => Boolean(task))
      : [];

    return { tasks };
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code === "ENOENT") {
      return null;
    }

    throw error;
  }
}

async function readStore(): Promise<TasksFile> {
  const primary = await readStoreFile(STORAGE_FILE);
  if (primary) {
    return primary;
  }

  // One-time migration for existing local data from older /tmp default.
  if (!TASKS_STORAGE_FILE_ENV && STORAGE_FILE !== LEGACY_STORAGE_FILE) {
    const legacy = await readStoreFile(LEGACY_STORAGE_FILE);
    if (legacy) {
      try {
        await writeStore(legacy);
      } catch {
        // Keep serving the legacy data even if migration write fails.
      }

      return legacy;
    }
  }

  return { tasks: [] };
}

async function writeStore(data: TasksFile) {
  await mkdir(dirname(STORAGE_FILE), { recursive: true });

  const tempFile = `${STORAGE_FILE}.tmp`;
  await writeFile(tempFile, JSON.stringify(data, null, 2), "utf8");
  await rename(tempFile, STORAGE_FILE);
}

function byUpdatedDesc(a: Task, b: Task) {
  return b.updatedAt.localeCompare(a.updatedAt);
}

function buildId() {
  return `${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

async function listTasksFromSupabase(client: TaskSupabaseClient) {
  const { data, error } = await client
    .from(SUPABASE_TASKS_TABLE as "tasks")
    .select("*")
    .order("updated_at", { ascending: false });

  if (error) {
    throw new Error(formatDbError("Unable to list tasks from Supabase", error));
  }

  return (data ?? [])
    .map((row) => fromDbRow(row as DbTaskRow))
    .filter((task): task is Task => Boolean(task));
}

async function getTaskFromSupabase(client: TaskSupabaseClient, id: string) {
  const { data, error } = await client
    .from(SUPABASE_TASKS_TABLE as "tasks")
    .select("*")
    .eq("id", id)
    .maybeSingle();

  if (error) {
    throw new Error(formatDbError("Unable to fetch task from Supabase", error));
  }

  return data ? fromDbRow(data as DbTaskRow) : null;
}

async function createTaskInSupabase(client: TaskSupabaseClient, input: TaskInput) {
  const now = new Date().toISOString();
  const task: Task = {
    id: buildId(),
    title: input.title,
    description: input.description,
    priority: input.priority,
    category: input.category,
    imageUrl: input.imageUrl,
    status: input.status,
    dueDate: input.dueDate,
    createdAt: now,
    updatedAt: now,
  };

  const { data, error } = await client
    .from(SUPABASE_TASKS_TABLE as "tasks")
    .insert(toDbRow(task))
    .select("*")
    .single();

  if (error) {
    throw new Error(formatDbError("Unable to create task in Supabase", error));
  }

  const parsed = data ? fromDbRow(data as DbTaskRow) : null;
  if (!parsed) {
    throw new Error("Supabase create returned invalid task payload");
  }

  return parsed;
}

async function updateTaskInSupabase(
  client: TaskSupabaseClient,
  id: string,
  updates: TaskUpdateInput,
) {
  const rowUpdates: Partial<DbTaskRow> = {
    updated_at: new Date().toISOString(),
  };

  if ("title" in updates && updates.title !== undefined) {
    rowUpdates.title = updates.title;
  }
  if ("description" in updates && updates.description !== undefined) {
    rowUpdates.description = updates.description;
  }
  if ("priority" in updates && updates.priority !== undefined) {
    rowUpdates.priority = updates.priority;
  }
  if ("category" in updates && updates.category !== undefined) {
    rowUpdates.category = updates.category;
  }
  if ("status" in updates && updates.status !== undefined) {
    rowUpdates.status = updates.status;
  }
  if ("dueDate" in updates) {
    rowUpdates.due_date = updates.dueDate ?? null;
  }
  if ("imageUrl" in updates) {
    rowUpdates.image_url = updates.imageUrl ?? null;
  }

  const { data, error } = await client
    .from(SUPABASE_TASKS_TABLE as "tasks")
    .update(rowUpdates)
    .eq("id", id)
    .select("*")
    .maybeSingle();

  if (error) {
    throw new Error(formatDbError("Unable to update task in Supabase", error));
  }

  return data ? fromDbRow(data as DbTaskRow) : null;
}

async function deleteTaskInSupabase(client: TaskSupabaseClient, id: string) {
  const { data, error } = await client
    .from(SUPABASE_TASKS_TABLE as "tasks")
    .delete()
    .eq("id", id)
    .select("id");

  if (error) {
    throw new Error(formatDbError("Unable to delete task in Supabase", error));
  }

  return Array.isArray(data) && data.length > 0;
}

export async function listTasks() {
  const supabase = getSupabaseClient();
  if (supabase) {
    return listTasksFromSupabase(supabase);
  }

  const { tasks } = await readStore();
  return [...tasks].sort(byUpdatedDesc);
}

export async function getTask(id: string) {
  const supabase = getSupabaseClient();
  if (supabase) {
    return getTaskFromSupabase(supabase, id);
  }

  const { tasks } = await readStore();
  return tasks.find((task) => task.id === id) ?? null;
}

export async function createTask(input: TaskInput) {
  const supabase = getSupabaseClient();
  if (supabase) {
    return createTaskInSupabase(supabase, input);
  }

  return enqueueWrite(async () => {
    const store = await readStore();
    const now = new Date().toISOString();

    const task: Task = {
      id: buildId(),
      title: input.title,
      description: input.description,
      priority: input.priority,
      category: input.category,
      imageUrl: input.imageUrl,
      status: input.status,
      dueDate: input.dueDate,
      createdAt: now,
      updatedAt: now,
    };

    store.tasks.push(task);
    await writeStore(store);

    return task;
  });
}

export async function updateTask(id: string, updates: TaskUpdateInput) {
  const supabase = getSupabaseClient();
  if (supabase) {
    return updateTaskInSupabase(supabase, id, updates);
  }

  return enqueueWrite(async () => {
    const store = await readStore();
    const index = store.tasks.findIndex((task) => task.id === id);

    if (index < 0) {
      return null;
    }

    const current = store.tasks[index];
    const next: Task = {
      ...current,
      ...updates,
      updatedAt: new Date().toISOString(),
    };

    store.tasks[index] = next;
    await writeStore(store);

    return next;
  });
}

export async function deleteTask(id: string) {
  const supabase = getSupabaseClient();
  if (supabase) {
    return deleteTaskInSupabase(supabase, id);
  }

  return enqueueWrite(async () => {
    const store = await readStore();
    const previousLength = store.tasks.length;

    store.tasks = store.tasks.filter((task) => task.id !== id);

    if (store.tasks.length === previousLength) {
      return false;
    }

    await writeStore(store);
    return true;
  });
}
