"use client";

import { FormEvent, useCallback, useEffect, useMemo, useState } from "react";

import {
  TASK_PRIORITY_VALUES,
  TASK_STATUS_VALUES,
  type Task,
  type TaskPriority,
  type TaskStatus,
} from "@/lib/task-types";

type PlannerTab = "kanban" | "calendar" | "settings";

type PlannerAppProps = {
  initialTab?: PlannerTab;
};

type SyncLinks = {
  feedUrl: string;
  googleUrl: string;
  appleUrl: string;
  tokenConfigured: boolean;
};

type TaskResponse = {
  task: Task;
};

type TasksResponse = {
  tasks: Task[];
};

const TABS: Array<{ id: PlannerTab; label: string }> = [
  { id: "kanban", label: "Kanban" },
  { id: "calendar", label: "Calendar" },
  { id: "settings", label: "Settings" },
];

const STATUS_COLUMNS: Array<{ status: TaskStatus; title: string }> = [
  { status: "todo", title: "To Do" },
  { status: "in_progress", title: "In Progress" },
  { status: "done", title: "Done" },
];

const PRIORITY_LABEL: Record<TaskPriority, string> = {
  low: "Low",
  medium: "Medium",
  high: "High",
  critical: "Critical",
};

const STATUS_LABEL: Record<TaskStatus, string> = {
  todo: "To Do",
  in_progress: "In Progress",
  done: "Done",
};

const STATUS_INDEX: Record<TaskStatus, number> = {
  todo: 0,
  in_progress: 1,
  done: 2,
};

const PRIORITY_WEIGHT: Record<TaskPriority, number> = {
  critical: 4,
  high: 3,
  medium: 2,
  low: 1,
};

function createDraft() {
  return {
    title: "",
    description: "",
    priority: "medium" as TaskPriority,
    dueDate: "",
  };
}

function formatDisplayDate(value: string | null) {
  if (!value) {
    return "No date";
  }

  const date = new Date(`${value}T00:00:00`);
  if (Number.isNaN(date.getTime())) {
    return value;
  }

  return date.toLocaleDateString(undefined, {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

function toDateKey(date: Date) {
  const year = date.getFullYear();
  const month = `${date.getMonth() + 1}`.padStart(2, "0");
  const day = `${date.getDate()}`.padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function toMonthLabel(date: Date) {
  return date.toLocaleDateString(undefined, {
    month: "long",
    year: "numeric",
  });
}

function shiftMonth(date: Date, amount: number) {
  return new Date(date.getFullYear(), date.getMonth() + amount, 1);
}

function monthGrid(anchorMonth: Date) {
  const firstDay = new Date(anchorMonth.getFullYear(), anchorMonth.getMonth(), 1);
  const gridStart = new Date(firstDay);
  gridStart.setDate(firstDay.getDate() - firstDay.getDay());

  const days: Date[] = [];
  for (let index = 0; index < 42; index += 1) {
    const day = new Date(gridStart);
    day.setDate(gridStart.getDate() + index);
    days.push(day);
  }

  return days;
}

function sortTasks(tasks: Task[]) {
  return [...tasks].sort((a, b) => {
    if (a.status !== b.status) {
      return STATUS_INDEX[a.status] - STATUS_INDEX[b.status];
    }

    if (a.priority !== b.priority) {
      return PRIORITY_WEIGHT[b.priority] - PRIORITY_WEIGHT[a.priority];
    }

    return b.updatedAt.localeCompare(a.updatedAt);
  });
}

async function requestJson<T>(input: RequestInfo | URL, init?: RequestInit): Promise<T> {
  const response = await fetch(input, {
    ...init,
    headers: {
      "Content-Type": "application/json",
      ...(init?.headers ?? {}),
    },
  });

  const payload = (await response.json().catch(() => null)) as
    | { error?: string }
    | T
    | null;

  if (!response.ok) {
    const message = payload && typeof payload === "object" && "error" in payload ? payload.error : null;
    throw new Error(message || "Request failed");
  }

  return payload as T;
}

export function PlannerApp({ initialTab = "kanban" }: PlannerAppProps) {
  const [activeTab, setActiveTab] = useState<PlannerTab>(initialTab);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [draft, setDraft] = useState(createDraft);
  const [selectedTaskId, setSelectedTaskId] = useState<string | null>(null);
  const [monthCursor, setMonthCursor] = useState(() => {
    const today = new Date();
    return new Date(today.getFullYear(), today.getMonth(), 1);
  });
  const [selectedDay, setSelectedDay] = useState(() => toDateKey(new Date()));
  const [syncLinks, setSyncLinks] = useState<SyncLinks | null>(null);
  const [copyMessage, setCopyMessage] = useState<string | null>(null);

  useEffect(() => {
    setActiveTab(initialTab);
  }, [initialTab]);

  const refreshTasks = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const data = await requestJson<TasksResponse>("/api/tasks", {
        cache: "no-store",
      });
      const sorted = sortTasks(data.tasks);
      setTasks(sorted);
      setSelectedTaskId((current) => current ?? sorted[0]?.id ?? null);
    } catch (requestError) {
      setError(requestError instanceof Error ? requestError.message : "Unable to load tasks");
    } finally {
      setLoading(false);
    }
  }, []);

  const refreshSyncLinks = useCallback(async () => {
    try {
      const data = await requestJson<SyncLinks>("/api/calendar/feed-url", {
        cache: "no-store",
      });
      setSyncLinks(data);
    } catch {
      setSyncLinks(null);
    }
  }, []);

  useEffect(() => {
    void refreshTasks();
    void refreshSyncLinks();
  }, [refreshSyncLinks, refreshTasks]);

  const selectedTask = useMemo(
    () => tasks.find((task) => task.id === selectedTaskId) ?? null,
    [selectedTaskId, tasks],
  );

  const tasksByDate = useMemo(() => {
    const map = new Map<string, Task[]>();

    for (const task of tasks) {
      if (!task.dueDate) {
        continue;
      }

      const bucket = map.get(task.dueDate) ?? [];
      bucket.push(task);
      bucket.sort((a, b) => PRIORITY_WEIGHT[b.priority] - PRIORITY_WEIGHT[a.priority]);
      map.set(task.dueDate, bucket);
    }

    return map;
  }, [tasks]);

  const dayTasks = tasksByDate.get(selectedDay) ?? [];

  async function createTask(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const title = draft.title.trim();
    if (!title) {
      setError("Title is required");
      return;
    }

    setBusy(true);
    setError(null);

    try {
      const data = await requestJson<TaskResponse>("/api/tasks", {
        method: "POST",
        body: JSON.stringify({
          title,
          description: draft.description,
          priority: draft.priority,
          dueDate: draft.dueDate || null,
          status: "todo",
        }),
      });

      setTasks((previous) => sortTasks([data.task, ...previous]));
      setSelectedTaskId(data.task.id);
      setDraft(createDraft());
    } catch (requestError) {
      setError(requestError instanceof Error ? requestError.message : "Unable to create task");
    } finally {
      setBusy(false);
    }
  }

  async function patchTask(id: string, payload: Record<string, unknown>) {
    const data = await requestJson<TaskResponse>(`/api/tasks/${id}`, {
      method: "PATCH",
      body: JSON.stringify(payload),
    });

    setTasks((previous) =>
      sortTasks(previous.map((task) => (task.id === id ? data.task : task))),
    );

    return data.task;
  }

  async function moveTask(task: Task, direction: "left" | "right") {
    const currentIndex = STATUS_COLUMNS.findIndex((item) => item.status === task.status);
    const nextIndex = direction === "left" ? currentIndex - 1 : currentIndex + 1;

    if (nextIndex < 0 || nextIndex >= STATUS_COLUMNS.length) {
      return;
    }

    setBusy(true);
    setError(null);
    try {
      await patchTask(task.id, { status: STATUS_COLUMNS[nextIndex].status });
    } catch (requestError) {
      setError(requestError instanceof Error ? requestError.message : "Unable to update task");
    } finally {
      setBusy(false);
    }
  }

  async function removeTask(id: string) {
    setBusy(true);
    setError(null);

    try {
      await requestJson<{ success: boolean }>(`/api/tasks/${id}`, {
        method: "DELETE",
      });

      setTasks((previous) => previous.filter((task) => task.id !== id));
      setSelectedTaskId((current) => (current === id ? null : current));
    } catch (requestError) {
      setError(requestError instanceof Error ? requestError.message : "Unable to delete task");
    } finally {
      setBusy(false);
    }
  }

  async function saveDetails(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!selectedTask) {
      return;
    }

    const formData = new FormData(event.currentTarget);
    const payload = {
      title: String(formData.get("title") ?? "").trim(),
      description: String(formData.get("description") ?? "").trim(),
      priority: String(formData.get("priority") ?? "medium"),
      status: String(formData.get("status") ?? "todo"),
      dueDate: String(formData.get("dueDate") ?? "").trim() || null,
    };

    setBusy(true);
    setError(null);

    try {
      await patchTask(selectedTask.id, payload);
    } catch (requestError) {
      setError(requestError instanceof Error ? requestError.message : "Unable to save task");
    } finally {
      setBusy(false);
    }
  }

  async function copyFeedUrl() {
    if (!syncLinks?.feedUrl) {
      return;
    }

    try {
      await navigator.clipboard.writeText(syncLinks.feedUrl);
      setCopyMessage("Copied");
      setTimeout(() => setCopyMessage(null), 1800);
    } catch {
      setCopyMessage("Copy failed");
      setTimeout(() => setCopyMessage(null), 1800);
    }
  }

  const calendarDays = useMemo(() => monthGrid(monthCursor), [monthCursor]);

  return (
    <>
      <section className="glass-card tabs-shell" role="tablist" aria-label="Planner tabs">
        {TABS.map((tab) => (
          <button
            key={tab.id}
            type="button"
            role="tab"
            aria-selected={activeTab === tab.id}
            className={activeTab === tab.id ? "tab-btn active" : "tab-btn"}
            onClick={() => setActiveTab(tab.id)}
          >
            {tab.label}
          </button>
        ))}
      </section>

      {error ? <p className="glass-card error-banner">{error}</p> : null}

      {activeTab === "kanban" ? (
        <>
          <section className="kanban-page">
            <section className="glass-card create-card">
              <h2>Create Task</h2>
              <form className="create-form" onSubmit={createTask}>
                <input
                  type="text"
                  placeholder="Task title"
                  maxLength={140}
                  value={draft.title}
                  onChange={(event) => setDraft((prev) => ({ ...prev, title: event.target.value }))}
                />
                <textarea
                  placeholder="Description"
                  maxLength={5000}
                  value={draft.description}
                  onChange={(event) =>
                    setDraft((prev) => ({ ...prev, description: event.target.value }))
                  }
                />
                <div className="form-row">
                  <select
                    value={draft.priority}
                    onChange={(event) =>
                      setDraft((prev) => ({ ...prev, priority: event.target.value as TaskPriority }))
                    }
                  >
                    {TASK_PRIORITY_VALUES.map((priority) => (
                      <option key={priority} value={priority}>
                        {PRIORITY_LABEL[priority]}
                      </option>
                    ))}
                  </select>
                  <input
                    type="date"
                    value={draft.dueDate}
                    onChange={(event) => setDraft((prev) => ({ ...prev, dueDate: event.target.value }))}
                  />
                  <button type="submit" disabled={busy}>
                    {busy ? "Saving..." : "Create"}
                  </button>
                </div>
              </form>
            </section>

            <section className="glass-card detail-card">
              <h2>Task Details</h2>
              {!selectedTask ? (
                <p className="subtle">Select a task</p>
              ) : (
                <form key={selectedTask.id} className="detail-form" onSubmit={saveDetails}>
                  <input name="title" defaultValue={selectedTask.title} maxLength={140} required />
                  <textarea name="description" defaultValue={selectedTask.description} maxLength={5000} />
                  <div className="form-row">
                    <select name="status" defaultValue={selectedTask.status}>
                      {TASK_STATUS_VALUES.map((status) => (
                        <option key={status} value={status}>
                          {STATUS_LABEL[status]}
                        </option>
                      ))}
                    </select>
                    <select name="priority" defaultValue={selectedTask.priority}>
                      {TASK_PRIORITY_VALUES.map((priority) => (
                        <option key={priority} value={priority}>
                          {PRIORITY_LABEL[priority]}
                        </option>
                      ))}
                    </select>
                    <input name="dueDate" type="date" defaultValue={selectedTask.dueDate ?? ""} />
                  </div>

                  <div className="detail-actions">
                    <button type="submit" disabled={busy}>
                      {busy ? "Saving..." : "Save"}
                    </button>
                    <button
                      type="button"
                      className="danger-btn compact-btn"
                      onClick={() => void removeTask(selectedTask.id)}
                    >
                      Delete
                    </button>
                  </div>
                </form>
              )}
            </section>
          </section>

          <section className="kanban-layout">
            {STATUS_COLUMNS.map((column) => {
              const columnTasks = tasks.filter((task) => task.status === column.status);

              return (
                <article key={column.status} className="glass-card kanban-column">
                  <header>
                    <h3>{column.title}</h3>
                    <span>{columnTasks.length}</span>
                  </header>

                  <div className="kanban-list">
                    {loading ? <p className="subtle">Loading...</p> : null}
                    {!loading && columnTasks.length === 0 ? <p className="column-empty">No tasks</p> : null}

                    {columnTasks.map((task) => (
                      <article
                        key={task.id}
                        className={`task-card ${task.id === selectedTaskId ? "selected" : ""}`}
                        onClick={() => setSelectedTaskId(task.id)}
                      >
                        <header>
                          <h4>{task.title}</h4>
                          <span className={`priority-chip priority-${task.priority}`}>
                            {PRIORITY_LABEL[task.priority]}
                          </span>
                        </header>
                        <p className="task-meta">{formatDisplayDate(task.dueDate)}</p>

                        <div className="task-actions">
                          <button
                            type="button"
                            className="secondary-btn compact-btn"
                            onClick={(event) => {
                              event.stopPropagation();
                              void moveTask(task, "left");
                            }}
                          >
                            Left
                          </button>
                          <button
                            type="button"
                            className="secondary-btn compact-btn"
                            onClick={(event) => {
                              event.stopPropagation();
                              void moveTask(task, "right");
                            }}
                          >
                            Right
                          </button>
                        </div>
                      </article>
                    ))}
                  </div>
                </article>
              );
            })}
          </section>
        </>
      ) : null}

      {activeTab === "calendar" ? (
        <section className="glass-card calendar-card">
          <header className="calendar-toolbar">
            <h2>Calendar</h2>
            <div className="calendar-nav">
              <button
                type="button"
                className="secondary-btn compact-btn"
                onClick={() => setMonthCursor((current) => shiftMonth(current, -1))}
              >
                Prev
              </button>
              <strong>{toMonthLabel(monthCursor)}</strong>
              <button
                type="button"
                className="secondary-btn compact-btn"
                onClick={() => setMonthCursor((current) => shiftMonth(current, 1))}
              >
                Next
              </button>
            </div>
          </header>

          <div className="calendar-grid-head">
            {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((weekday) => (
              <span key={weekday}>{weekday}</span>
            ))}
          </div>

          <div className="calendar-grid">
            {calendarDays.map((day) => {
              const key = toDateKey(day);
              const dayTasksList = tasksByDate.get(key) ?? [];
              const isCurrentMonth = day.getMonth() === monthCursor.getMonth();
              const isSelected = selectedDay === key;

              return (
                <button
                  key={key}
                  type="button"
                  className={`calendar-cell ${isCurrentMonth ? "" : "outside"} ${isSelected ? "selected" : ""}`}
                  onClick={() => setSelectedDay(key)}
                >
                  <span>{day.getDate()}</span>
                  <ul>
                    {dayTasksList.slice(0, 2).map((task) => (
                      <li key={task.id}>{task.title}</li>
                    ))}
                    {dayTasksList.length > 2 ? <li>+{dayTasksList.length - 2}</li> : null}
                  </ul>
                </button>
              );
            })}
          </div>

          <div className="calendar-day-list">
            <h3>{formatDisplayDate(selectedDay)}</h3>
            {dayTasks.length === 0 ? <p className="subtle">No tasks</p> : null}
            {dayTasks.map((task) => (
              <article key={task.id} className="day-task">
                <div>
                  <p>{task.title}</p>
                  <span>
                    {PRIORITY_LABEL[task.priority]} · {STATUS_LABEL[task.status]}
                  </span>
                </div>
                <button
                  type="button"
                  className="secondary-btn compact-btn"
                  onClick={() => {
                    setSelectedTaskId(task.id);
                    setActiveTab("kanban");
                  }}
                >
                  Open
                </button>
              </article>
            ))}
          </div>
        </section>
      ) : null}

      {activeTab === "settings" ? (
        <section className="glass-card settings-card">
          <h2>Settings</h2>

          <section className="sync-card">
            <h3>Calendar Sync</h3>
            <div className="sync-actions">
              <a className="secondary-btn compact-btn" href={syncLinks?.googleUrl ?? "#"} target="_blank" rel="noreferrer">
                Google Subscribe
              </a>
              <a className="secondary-btn compact-btn" href={syncLinks?.appleUrl ?? "#"}>
                Apple Subscribe
              </a>
              <a className="secondary-btn compact-btn" href={syncLinks?.feedUrl ?? "#"} target="_blank" rel="noreferrer">
                Open ICS
              </a>
              <button
                type="button"
                className="secondary-btn compact-btn"
                onClick={() => void copyFeedUrl()}
                disabled={!syncLinks?.feedUrl}
              >
                Copy Feed URL
              </button>
            </div>
            <input readOnly value={syncLinks?.feedUrl ?? ""} placeholder="Feed URL" />
            {copyMessage ? <p className="subtle">{copyMessage}</p> : null}
          </section>
        </section>
      ) : null}
    </>
  );
}
