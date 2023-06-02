export type PriorityType = "low" | "medium" | "high";
export type StatusType = "active" | "completed" | "overdue";

export interface Todo {
	title: string;
	imageUrl?: string;
	priority: PriorityType;
	status: StatusType;
	createdAt: number;
	completedAt: number;
	dueDate: number;
}
