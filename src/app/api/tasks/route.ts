import { NextResponse } from "next/server";

import { requireAllowedUser } from "@/lib/auth";
import { createTask, listTasks } from "@/lib/task-store";
import {
  isTaskPriority,
  isTaskStatus,
  type TaskInput,
  type TaskPriority,
  type TaskStatus,
} from "@/lib/task-types";

export const runtime = "nodejs";

const MAX_TITLE_LENGTH = 140;
const MAX_DESCRIPTION_LENGTH = 5000;

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

function parsePriority(value: unknown): TaskPriority {
  if (typeof value === "string" && isTaskPriority(value)) {
    return value;
  }

  return "medium";
}

function parseStatus(value: unknown): TaskStatus {
  if (typeof value === "string" && isTaskStatus(value)) {
    return value;
  }

  return "todo";
}

function parseCreatePayload(payload: unknown): { data: TaskInput } | { error: string } {
  if (!payload || typeof payload !== "object") {
    return { error: "Invalid payload" };
  }

  const body = payload as Record<string, unknown>;
  const title = normalizeText(body.title, MAX_TITLE_LENGTH);
  if (!title) {
    return { error: "Title is required" };
  }

  return {
    data: {
      title,
      description: normalizeText(body.description, MAX_DESCRIPTION_LENGTH),
      priority: parsePriority(body.priority),
      status: parseStatus(body.status),
      dueDate: normalizeDueDate(body.dueDate),
    },
  };
}

export async function GET() {
  const auth = await requireAllowedUser();
  if ("error" in auth) {
    return auth.error;
  }

  const tasks = await listTasks();
  return NextResponse.json({ tasks });
}

export async function POST(request: Request) {
  const auth = await requireAllowedUser();
  if ("error" in auth) {
    return auth.error;
  }

  let payload: unknown;
  try {
    payload = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const parsed = parseCreatePayload(payload);
  if ("error" in parsed) {
    return NextResponse.json({ error: parsed.error }, { status: 400 });
  }

  const task = await createTask(parsed.data);
  return NextResponse.json({ task }, { status: 201 });
}
