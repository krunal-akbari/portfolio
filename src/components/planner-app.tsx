"use client";

import { FormEvent, useCallback, useEffect, useMemo, useRef, useState } from "react";

import {
  TASK_CATEGORY_VALUES,
  TASK_PRIORITY_VALUES,
  TASK_STATUS_VALUES,
  type Task,
  type TaskCategory,
  type TaskPriority,
  type TaskStatus,
} from "@/lib/task-types";

type PlannerTab = "kanban" | "calendar" | "settings" | "matrix";
type ThemeMode = "light" | "dark";

type PlannerAppProps = {
  initialTab?: PlannerTab;
  userEmail?: string | null;
  localMode?: boolean;
  signOutAction?: () => Promise<void>;
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

type TaskDraft = {
  title: string;
  description: string;
  priority: TaskPriority;
  category: TaskCategory;
  dueDate: string;
  imageUrl: string;
};

type MatrixBucket = "need_urgent" | "avoidable_urgent" | "need_not_urgent" | "avoidable_not_urgent";

type MatrixBuckets = {
  need_urgent: Task[];
  avoidable_urgent: Task[];
  need_not_urgent: Task[];
  avoidable_not_urgent: Task[];
};

const THEME_STORAGE_KEY = "planner-theme-mode";

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

const CATEGORY_LABEL: Record<TaskCategory, string> = {
  work: "Work",
  personal: "Personal",
  social: "Social",
};

const CATEGORY_ICON: Record<TaskCategory, string> = {
  work: "W",
  personal: "P",
  social: "S",
};

const MATRIX_LABEL: Record<MatrixBucket, string> = {
  need_urgent: "Need to Done + Urgent",
  avoidable_urgent: "Avoidable + Urgent",
  need_not_urgent: "Need to Done + Not Urgent",
  avoidable_not_urgent: "Avoidable + Not Urgent",
};

const MATRIX_SHORT_LABEL: Record<MatrixBucket, string> = {
  need_urgent: "Need + Urgent",
  avoidable_urgent: "Avoid + Urgent",
  need_not_urgent: "Need + Not Urgent",
  avoidable_not_urgent: "Avoid + Not Urgent",
};

const MATRIX_DESCRIPTION: Record<MatrixBucket, string> = {
  need_urgent: "Do first",
  avoidable_urgent: "Limit or delegate",
  need_not_urgent: "Plan and schedule",
  avoidable_not_urgent: "Defer or drop",
};

const MATRIX_ORDER: MatrixBucket[] = [
  "need_urgent",
  "avoidable_urgent",
  "need_not_urgent",
  "avoidable_not_urgent",
];

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

function createDraft(dueDate = ""): TaskDraft {
  return {
    title: "",
    description: "",
    priority: "medium",
    category: "work",
    dueDate,
    imageUrl: "",
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

function clamp(value: number, min: number, max: number) {
  return Math.max(min, Math.min(max, value));
}

function taskStrength(task: Task) {
  let score =
    task.priority === "critical"
      ? 90
      : task.priority === "high"
        ? 72
        : task.priority === "medium"
          ? 54
          : 35;

  if (task.dueDate) {
    const due = new Date(`${task.dueDate}T00:00:00`);
    const today = new Date();
    const now = new Date(today.getFullYear(), today.getMonth(), today.getDate());
    const daysUntilDue = Math.floor((due.getTime() - now.getTime()) / 86_400_000);

    if (daysUntilDue < 0) {
      score += 16;
    } else if (daysUntilDue === 0) {
      score += 14;
    } else if (daysUntilDue <= 2) {
      score += 10;
    } else if (daysUntilDue <= 7) {
      score += 6;
    }
  }

  if (task.category === "work") {
    score += 4;
  }

  if (task.status === "in_progress") {
    score += 3;
  }

  if (task.status === "done") {
    score -= 24;
  }

  const value = clamp(score, 10, 99);
  const label =
    value >= 85
      ? "Very Strong"
      : value >= 65
        ? "Strong"
        : value >= 45
          ? "Balanced"
          : "Light";

  return { value, label };
}

function matchesSearch(task: Task, query: string) {
  if (!query) {
    return true;
  }

  const q = query.toLowerCase();
  return (
    task.title.toLowerCase().includes(q) ||
    task.description.toLowerCase().includes(q) ||
    PRIORITY_LABEL[task.priority].toLowerCase().includes(q) ||
    STATUS_LABEL[task.status].toLowerCase().includes(q) ||
    CATEGORY_LABEL[task.category].toLowerCase().includes(q)
  );
}

function dueDayOffset(task: Task) {
  if (!task.dueDate) {
    return null;
  }

  const due = new Date(`${task.dueDate}T00:00:00`);
  const today = new Date();
  const now = new Date(today.getFullYear(), today.getMonth(), today.getDate());
  return Math.floor((due.getTime() - now.getTime()) / 86_400_000);
}

function isUrgentTask(task: Task) {
  if (task.status === "done") {
    return false;
  }

  if (task.priority === "critical" || task.priority === "high") {
    return true;
  }

  const dueOffset = dueDayOffset(task);
  if (dueOffset === null) {
    return false;
  }

  return dueOffset <= 1;
}

function isNeedToDoneTask(task: Task) {
  if (task.category === "work" || task.status === "in_progress") {
    return true;
  }

  return task.priority === "critical" || task.priority === "high" || task.priority === "medium";
}

function matrixBucket(task: Task): MatrixBucket {
  const urgent = isUrgentTask(task);
  const needToDone = isNeedToDoneTask(task);

  if (needToDone && urgent) {
    return "need_urgent";
  }

  if (!needToDone && urgent) {
    return "avoidable_urgent";
  }

  if (needToDone) {
    return "need_not_urgent";
  }

  return "avoidable_not_urgent";
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

export function PlannerApp({
  initialTab = "kanban",
  userEmail = null,
  localMode = false,
  signOutAction,
}: PlannerAppProps) {
  const [activeTab, setActiveTab] = useState<PlannerTab>(initialTab);
  const [themeMode, setThemeMode] = useState<ThemeMode>("dark");
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [draft, setDraft] = useState<TaskDraft>(createDraft);
  const [selectedTaskId, setSelectedTaskId] = useState<string | null>(null);
  const [monthCursor, setMonthCursor] = useState(() => {
    const today = new Date();
    return new Date(today.getFullYear(), today.getMonth(), 1);
  });
  const [selectedDay, setSelectedDay] = useState(() => toDateKey(new Date()));
  const [syncLinks, setSyncLinks] = useState<SyncLinks | null>(null);
  const [copyMessage, setCopyMessage] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  const createTitleRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setActiveTab(initialTab);
  }, [initialTab]);

  useEffect(() => {
    try {
      const saved = window.localStorage.getItem(THEME_STORAGE_KEY);
      if (saved === "light" || saved === "dark") {
        setThemeMode(saved);
      }
    } catch {
      // Ignore browser storage restrictions.
    }
  }, []);

  useEffect(() => {
    document.documentElement.dataset.theme = themeMode;
    document.documentElement.style.colorScheme = themeMode;
    try {
      window.localStorage.setItem(THEME_STORAGE_KEY, themeMode);
    } catch {
      // Ignore browser storage restrictions.
    }
  }, [themeMode]);

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

  const visibleTasks = useMemo(
    () => tasks.filter((task) => matchesSearch(task, searchQuery.trim())),
    [searchQuery, tasks],
  );

  useEffect(() => {
    setSelectedTaskId((current) => {
      if (current && visibleTasks.some((task) => task.id === current)) {
        return current;
      }

      return visibleTasks[0]?.id ?? null;
    });
  }, [visibleTasks]);

  const selectedTask = useMemo(
    () => visibleTasks.find((task) => task.id === selectedTaskId) ?? null,
    [selectedTaskId, visibleTasks],
  );

  const tasksByDate = useMemo(() => {
    const map = new Map<string, Task[]>();

    for (const task of visibleTasks) {
      if (!task.dueDate) {
        continue;
      }

      const bucket = map.get(task.dueDate) ?? [];
      bucket.push(task);
      bucket.sort((a, b) => PRIORITY_WEIGHT[b.priority] - PRIORITY_WEIGHT[a.priority]);
      map.set(task.dueDate, bucket);
    }

    return map;
  }, [visibleTasks]);

  const dayTasks = tasksByDate.get(selectedDay) ?? [];
  const calendarDays = useMemo(() => monthGrid(monthCursor), [monthCursor]);

  const taskMatrix = useMemo<MatrixBuckets>(() => {
    const buckets: MatrixBuckets = {
      need_urgent: [],
      avoidable_urgent: [],
      need_not_urgent: [],
      avoidable_not_urgent: [],
    };

    for (const task of visibleTasks) {
      buckets[matrixBucket(task)].push(task);
    }

    return buckets;
  }, [visibleTasks]);

  function jumpToCreate() {
    setActiveTab("kanban");
    setTimeout(() => {
      createTitleRef.current?.focus();
    }, 0);
  }

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
          category: draft.category,
          imageUrl: draft.imageUrl || null,
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
      category: String(formData.get("category") ?? "work"),
      imageUrl: String(formData.get("imageUrl") ?? "").trim() || null,
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
      setTimeout(() => setCopyMessage(null), 1500);
    } catch {
      setCopyMessage("Copy failed");
      setTimeout(() => setCopyMessage(null), 1500);
    }
  }

  return (
    <>
      {error ? <p className="glass-card error-banner">{error}</p> : null}

      <header className="glass-card top-header planner-main-header">
        <div className="brand-wrap">
          <span className="logo-mark" aria-hidden>
            GP
          </span>
          <div>
            <h1>Glass Planner</h1>
            <p className="subtle">{localMode ? "Local mode (auth disabled)" : userEmail}</p>
          </div>
        </div>

        <label className="search-field header-search">
          <span aria-hidden>F</span>
          <input
            type="search"
            placeholder="Find to-dos"
            value={searchQuery}
            onChange={(event) => setSearchQuery(event.target.value)}
          />
        </label>

        <div className="toolbar-actions">
          <button type="button" className="secondary-btn" onClick={jumpToCreate}>
            + Add To-Do
          </button>
          <button
            type="button"
            className={activeTab === "kanban" ? "icon-btn active" : "icon-btn"}
            onClick={() => setActiveTab("kanban")}
            aria-label="Open Kanban"
          >
            K
          </button>
          <button
            type="button"
            className={activeTab === "calendar" ? "icon-btn active" : "icon-btn"}
            onClick={() => setActiveTab("calendar")}
            aria-label="Open Calendar"
          >
            C
          </button>
          <button
            type="button"
            className={activeTab === "settings" ? "icon-btn active" : "icon-btn"}
            onClick={() => setActiveTab("settings")}
            aria-label="Open Settings"
          >
            S
          </button>
          <button
            type="button"
            className={activeTab === "matrix" ? "icon-btn active" : "icon-btn"}
            onClick={() => setActiveTab("matrix")}
            aria-label="Open Priority Matrix"
          >
            M
          </button>
        </div>
      </header>

      {activeTab === "kanban" ? (
        <>
          <section className="kanban-page">
            <section className="glass-card create-card">
              <h2>Create Task</h2>
              <form className="create-form" onSubmit={createTask}>
                <input
                  ref={createTitleRef}
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
                <input
                  type="url"
                  placeholder="Task image URL"
                  value={draft.imageUrl}
                  onChange={(event) => setDraft((prev) => ({ ...prev, imageUrl: event.target.value }))}
                  required
                />
                <div className="form-row form-row-create">
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
                  <select
                    value={draft.category}
                    onChange={(event) =>
                      setDraft((prev) => ({ ...prev, category: event.target.value as TaskCategory }))
                    }
                  >
                    {TASK_CATEGORY_VALUES.map((category) => (
                      <option key={category} value={category}>
                        {CATEGORY_LABEL[category]}
                      </option>
                    ))}
                  </select>
                  <label className="date-field">
                    <span aria-hidden>D</span>
                    <input
                      type="date"
                      value={draft.dueDate}
                      onChange={(event) =>
                        setDraft((prev) => ({ ...prev, dueDate: event.target.value }))
                      }
                    />
                  </label>
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
                  <input
                    name="imageUrl"
                    type="url"
                    defaultValue={selectedTask.imageUrl ?? ""}
                    placeholder="Task image URL"
                    required
                  />
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
                    <select name="category" defaultValue={selectedTask.category}>
                      {TASK_CATEGORY_VALUES.map((category) => (
                        <option key={category} value={category}>
                          {CATEGORY_LABEL[category]}
                        </option>
                      ))}
                    </select>
                  </div>

                  <label className="date-field">
                    <span aria-hidden>D</span>
                    <input name="dueDate" type="date" defaultValue={selectedTask.dueDate ?? ""} />
                  </label>

                  <p className="task-strength-note">
                    Matrix Assignment: <strong>{MATRIX_LABEL[matrixBucket(selectedTask)]}</strong> | Signal{" "}
                    <strong>{taskStrength(selectedTask).value}/100</strong> ({taskStrength(selectedTask).label})
                  </p>

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
              const columnTasks = visibleTasks.filter((task) => task.status === column.status);

              return (
                <article key={column.status} className="glass-card kanban-column">
                  <header>
                    <h3>{column.title}</h3>
                    <span>{columnTasks.length}</span>
                  </header>

                  <div className="kanban-list">
                    {loading ? <p className="subtle">Loading...</p> : null}
                    {!loading && columnTasks.length === 0 ? <p className="column-empty">No tasks</p> : null}

                    {columnTasks.map((task) => {
                      const strength = taskStrength(task);
                      const bucket = matrixBucket(task);

                      return (
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

                          <div className="task-image-wrap">
                            {task.imageUrl ? (
                              // eslint-disable-next-line @next/next/no-img-element
                              <img className="task-image" src={task.imageUrl} alt={task.title} />
                            ) : (
                              <div className="task-image placeholder">No image</div>
                            )}
                          </div>

                          <div className="task-tags">
                            <span className={`category-chip category-${task.category}`}>
                              {CATEGORY_ICON[task.category]} {CATEGORY_LABEL[task.category]}
                            </span>
                            <span className={`matrix-chip matrix-${bucket}`}>{MATRIX_SHORT_LABEL[bucket]}</span>
                            <span className="strength-chip">S {strength.value}</span>
                          </div>

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
                      );
                    })}
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
            <div>
              <h2>Calendar</h2>
              <p className="subtle">Tasks auto-sync to Google/Apple after one-time subscription in Settings.</p>
            </div>

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
                    {CATEGORY_LABEL[task.category]} - {PRIORITY_LABEL[task.priority]} - {taskStrength(task).value}
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

          <section className="settings-row">
            <h3>Sync</h3>
            <div className="sync-actions sync-icons">
              <a className="icon-btn" href={syncLinks?.googleUrl ?? "#"} target="_blank" rel="noreferrer" title="Google sync">
                G
              </a>
              <a className="icon-btn" href={syncLinks?.appleUrl ?? "#"} title="Apple sync">
                A
              </a>
              <a className="icon-btn" href={syncLinks?.feedUrl ?? "#"} target="_blank" rel="noreferrer" title="Open ICS">
                ICS
              </a>
              <button
                type="button"
                className="icon-btn"
                onClick={() => void copyFeedUrl()}
                disabled={!syncLinks?.feedUrl}
                title="Copy feed URL"
              >
                CP
              </button>
            </div>
            {copyMessage ? <p className="subtle">{copyMessage}</p> : null}
          </section>

          <section className="settings-row">
            <h3>Theme</h3>
            <div className="theme-buttons">
              <button
                type="button"
                className={themeMode === "light" ? "secondary-btn active-theme" : "secondary-btn"}
                onClick={() => setThemeMode("light")}
              >
                Light
              </button>
              <button
                type="button"
                className={themeMode === "dark" ? "secondary-btn active-theme" : "secondary-btn"}
                onClick={() => setThemeMode("dark")}
              >
                Dark
              </button>
            </div>
          </section>

          <section className="settings-row">
            <h3>Logout</h3>
            {signOutAction ? (
              <form action={signOutAction}>
                <button type="submit" className="danger-btn compact-btn">
                  Logout
                </button>
              </form>
            ) : (
              <button type="button" className="danger-btn compact-btn" disabled>
                Logout
              </button>
            )}
          </section>
        </section>
      ) : null}

      {activeTab === "matrix" ? (
        <section className="glass-card matrix-card">
          <header>
            <h2>Priority Matrix</h2>
            <p className="subtle">Each task is auto-assigned into your 4 requested quadrants.</p>
          </header>

          <div className="matrix-grid">
            {MATRIX_ORDER.map((bucket) => (
              <article key={bucket} className={`matrix-box matrix-${bucket}`}>
                <h3>{MATRIX_LABEL[bucket]}</h3>
                <p className="subtle">{MATRIX_DESCRIPTION[bucket]}</p>
                <div className="matrix-list">
                  {taskMatrix[bucket].length === 0 ? <p className="subtle">No tasks</p> : null}
                  {taskMatrix[bucket].map((task) => (
                    <article key={task.id} className="matrix-item">
                      {task.imageUrl ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img src={task.imageUrl} alt={task.title} className="matrix-thumb" />
                      ) : (
                        <div className="matrix-thumb placeholder">No image</div>
                      )}
                      <div>
                        <p>{task.title}</p>
                        <span>
                          {PRIORITY_LABEL[task.priority]} | {CATEGORY_LABEL[task.category]} | S
                          {" "}
                          {taskStrength(task).value}
                        </span>
                      </div>
                    </article>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </section>
      ) : null}
    </>
  );
}
