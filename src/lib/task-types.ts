export const TASK_STATUS_VALUES = ["todo", "in_progress", "done"] as const;
export type TaskStatus = (typeof TASK_STATUS_VALUES)[number];

export const TASK_PRIORITY_VALUES = ["low", "medium", "high", "critical"] as const;
export type TaskPriority = (typeof TASK_PRIORITY_VALUES)[number];

export const TASK_CATEGORY_VALUES = ["work", "personal", "social"] as const;
export type TaskCategory = (typeof TASK_CATEGORY_VALUES)[number];

export type Task = {
  id: string;
  title: string;
  description: string;
  priority: TaskPriority;
  category: TaskCategory;
  imageUrl: string | null;
  status: TaskStatus;
  dueDate: string | null;
  createdAt: string;
  updatedAt: string;
};

export type TaskInput = {
  title: string;
  description: string;
  priority: TaskPriority;
  category: TaskCategory;
  imageUrl: string | null;
  status: TaskStatus;
  dueDate: string | null;
};

export type TaskUpdateInput = Partial<TaskInput>;

export function isTaskStatus(value: string): value is TaskStatus {
  return TASK_STATUS_VALUES.includes(value as TaskStatus);
}

export function isTaskPriority(value: string): value is TaskPriority {
  return TASK_PRIORITY_VALUES.includes(value as TaskPriority);
}

export function isTaskCategory(value: string): value is TaskCategory {
  return TASK_CATEGORY_VALUES.includes(value as TaskCategory);
}
