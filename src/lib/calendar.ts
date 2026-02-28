import type { Task } from "@/lib/task-types";

function escapeIcsText(value: string) {
  return value
    .replace(/\\/g, "\\\\")
    .replace(/\n/g, "\\n")
    .replace(/,/g, "\\,")
    .replace(/;/g, "\\;");
}

function toIcsDate(date: Date) {
  const year = date.getUTCFullYear();
  const month = `${date.getUTCMonth() + 1}`.padStart(2, "0");
  const day = `${date.getUTCDate()}`.padStart(2, "0");
  return `${year}${month}${day}`;
}

function toIcsDateTime(value: string | Date) {
  const date = typeof value === "string" ? new Date(value) : value;
  const safeDate = Number.isNaN(date.getTime()) ? new Date() : date;

  const year = safeDate.getUTCFullYear();
  const month = `${safeDate.getUTCMonth() + 1}`.padStart(2, "0");
  const day = `${safeDate.getUTCDate()}`.padStart(2, "0");
  const hours = `${safeDate.getUTCHours()}`.padStart(2, "0");
  const minutes = `${safeDate.getUTCMinutes()}`.padStart(2, "0");
  const seconds = `${safeDate.getUTCSeconds()}`.padStart(2, "0");

  return `${year}${month}${day}T${hours}${minutes}${seconds}Z`;
}

function parseDueDate(value: string) {
  const [year, month, day] = value.split("-").map(Number);
  if (!year || !month || !day) {
    return null;
  }

  const start = new Date(Date.UTC(year, month - 1, day));
  const end = new Date(Date.UTC(year, month - 1, day + 1));

  return {
    start: toIcsDate(start),
    end: toIcsDate(end),
  };
}

function toSequence(dateString: string) {
  const stamp = Math.floor(new Date(dateString).getTime() / 1000);
  return Number.isFinite(stamp) && stamp > 0 ? stamp : 1;
}

export function buildTasksCalendarIcs(tasks: Task[]) {
  const now = new Date();

  const lines = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//Glass Planner//Task Planner//EN",
    "CALSCALE:GREGORIAN",
    "METHOD:PUBLISH",
    "X-WR-CALNAME:Glass Planner",
    "REFRESH-INTERVAL;VALUE=DURATION:PT5M",
    "X-PUBLISHED-TTL:PT5M",
  ];

  for (const task of tasks) {
    if (!task.dueDate) {
      continue;
    }

    const due = parseDueDate(task.dueDate);
    if (!due) {
      continue;
    }

    const description = [
      `Status: ${task.status.replace("_", " ")}`,
      `Priority: ${task.priority}`,
      task.description,
    ]
      .filter(Boolean)
      .join("\n");

    lines.push(
      "BEGIN:VEVENT",
      `UID:${escapeIcsText(task.id)}@glass-planner`,
      `SEQUENCE:${toSequence(task.updatedAt)}`,
      `DTSTAMP:${toIcsDateTime(now)}`,
      `CREATED:${toIcsDateTime(task.createdAt)}`,
      `LAST-MODIFIED:${toIcsDateTime(task.updatedAt)}`,
      `DTSTART;VALUE=DATE:${due.start}`,
      `DTEND;VALUE=DATE:${due.end}`,
      `SUMMARY:${escapeIcsText(task.title)}`,
      `DESCRIPTION:${escapeIcsText(description)}`,
      `CATEGORIES:${escapeIcsText(task.priority.toUpperCase())}`,
      `STATUS:${task.status === "done" ? "COMPLETED" : "CONFIRMED"}`,
      "END:VEVENT",
    );
  }

  lines.push("END:VCALENDAR", "");

  return lines.join("\r\n");
}
