import { NextRequest, NextResponse } from "next/server";

import { isValidCalendarFeedToken, requireAllowedUser } from "@/lib/auth";
import { buildTasksCalendarIcs } from "@/lib/calendar";
import { listTasks } from "@/lib/task-store";

export const runtime = "nodejs";

export async function GET(request: NextRequest) {
  const token = request.nextUrl.searchParams.get("token");

  if (!isValidCalendarFeedToken(token)) {
    const auth = await requireAllowedUser();
    if ("error" in auth) {
      return auth.error;
    }
  }

  const tasks = await listTasks();
  const ics = buildTasksCalendarIcs(tasks);

  return new NextResponse(ics, {
    status: 200,
    headers: {
      "Content-Type": "text/calendar; charset=utf-8",
      "Content-Disposition": "inline; filename=glass-todo.ics",
      "Cache-Control": "no-store",
    },
  });
}
