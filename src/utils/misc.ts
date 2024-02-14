import { TaskStatus } from "./enums";
import { Task } from "./types";

export function setStatusColor(status: string) {
  switch (status) {
    case TaskStatus.created:
      return "info.main";
    case TaskStatus.inProgress:
      return "wheat";
    case TaskStatus.finished:
      return "success.main";
    case TaskStatus.overdue:
      return "error.main";
    case TaskStatus.cancelled:
      return "rgba(0, 0, 0, 0.08)";
    default:
      return "white";
  }
}

export function filterTasksByStatus(status: string, tasks: Task[]): Task[] {
  return tasks.filter((task: Task) => task.status === status);
}

export function formatDate(date: number) {
  const d = new Date(date);
  return `${d.getUTCDate()}.${d.getUTCMonth()}.${d.getFullYear()} at ${d.getHours()}:${d.getMinutes()}`;
}
