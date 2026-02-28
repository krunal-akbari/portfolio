import { NextResponse } from "next/server";

import { requireAllowedUser } from "@/lib/auth";
import { deleteTask, getTask, updateTask } from "@/lib/task-store";
import {
  isTaskPriority,
  isTaskStatus,
  type TaskUpdateInput,
  type TaskPriority,
  type TaskStatus,
} from "@/lib/task-types";

export const runtime = "nodejs";

const MAX_TITLE_LENGTH = 140;
const MAX_DESCRIPTION_LENGTH = 5000;

type RouteContext = {
  params: Promise<{ id: string }>;
};

function normalizeText(value: unknown, maxLength: number) {
  if (typeof value !== "string") {
    return "";
  }

  return value.trim().slice(0, maxLength);
}

function normalizeDueDate(value: unknown): string | null {
  if (typeof value !== "string") {
    return null;
  }

  const trimmed = value.trim();
  return /^\d{4}-\d{2}-\d{2}$/.test(trimmed) ? trimmed : null;
}

function parsePriority(value: unknown): TaskPriority | null {
  if (typeof value !== "string" || !isTaskPriority(value)) {
    return null;
  }

  return value;
}

function parseStatus(value: unknown): TaskStatus | null {
  if (typeof value !== "string" || !isTaskStatus(value)) {
    return null;
  }

  return value;
}

function parseUpdatePayload(payload: unknown): { data: TaskUpdateInput } | { error: string } {
  if (!payload || typeof payload !== "object") {
    return { error: "Invalid payload" };
  }

  const body = payload as Record<string, unknown>;
  const updates: TaskUpdateInput = {};

  if ("title" in body) {
    const title = normalizeText(body.title, MAX_TITLE_LENGTH);
    if (!title) {
      return { error: "Title cannot be empty" };
    }
    updates.title = title;
  }

  if ("description" in body) {
    updates.description = normalizeText(body.description, MAX_DESCRIPTION_LENGTH);
  }

  if ("priority" in body) {
    const priority = parsePriority(body.priority);
    if (!priority) {
      return { error: "Invalid priority" };
    }
    updates.priority = priority;
  }

  if ("status" in body) {
    const status = parseStatus(body.status);
    if (!status) {
      return { error: "Invalid status" };
    }
    updates.status = status;
  }

  if ("dueDate" in body) {
    updates.dueDate = normalizeDueDate(body.dueDate);
  }

  if (Object.keys(updates).length === 0) {
    return { error: "No valid fields provided" };
  }

  return { data: updates };
}

export async function PATCH(request: Request, context: RouteContext) {
  const auth = await requireAllowedUser();
  if ("error" in auth) {
    return auth.error;
  }

  const { id } = await context.params;

  let payload: unknown;
  try {
    payload = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const parsed = parseUpdatePayload(payload);
  if ("error" in parsed) {
    return NextResponse.json({ error: parsed.error }, { status: 400 });
  }

  const task = await updateTask(id, parsed.data);
  if (!task) {
    return NextResponse.json({ error: "Task not found" }, { status: 404 });
  }

  return NextResponse.json({ task });
}

export async function DELETE(_request: Request, context: RouteContext) {
  const auth = await requireAllowedUser();
  if ("error" in auth) {
    return auth.error;
  }

  const { id } = await context.params;

  const existing = await getTask(id);
  if (!existing) {
    return NextResponse.json({ error: "Task not found" }, { status: 404 });
  }

  await deleteTask(id);
  return NextResponse.json({ success: true });
}
