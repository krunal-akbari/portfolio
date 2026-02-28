import { mkdir, readFile, rename, writeFile } from "node:fs/promises";
import { dirname } from "node:path";

import {
  isTaskCategory,
  isTaskPriority,
  isTaskStatus,
  type Task,
  type TaskInput,
  type TaskUpdateInput,
} from "@/lib/task-types";

const STORAGE_FILE = process.env.TASKS_STORAGE_FILE || "/tmp/glass-todo-tasks.json";

type TasksFile = {
  tasks: Task[];
};

let writeQueue = Promise.resolve();

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

async function readStore(): Promise<TasksFile> {
  try {
    const file = await readFile(STORAGE_FILE, "utf8");
    const parsed = JSON.parse(file) as Partial<TasksFile>;

    const tasks = Array.isArray(parsed.tasks)
      ? parsed.tasks.map(coerceTask).filter((task): task is Task => Boolean(task))
      : [];

    return { tasks };
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code === "ENOENT") {
      return { tasks: [] };
    }

    throw error;
  }
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

export async function listTasks() {
  const { tasks } = await readStore();
  return [...tasks].sort(byUpdatedDesc);
}

export async function getTask(id: string) {
  const { tasks } = await readStore();
  return tasks.find((task) => task.id === id) ?? null;
}

export async function createTask(input: TaskInput) {
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
