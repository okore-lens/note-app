export type PriorityType = "low" | "medium" | "high";
export type StatusType = "active" | "completed" | "overdue";

export interface Todo {
	title: string;
	imageUrl?: string;
	priority: PriorityType | string;
	status: StatusType;
	createdAt: number;
	completedAt: number | null;
	dueDate: number;
	priorityLevel?: number;
	id?: string;
	isRecurring?: boolean;
}
