export type PriorityType = "low" | "medium" | "high";
export type StatusType = "active" | "completed" | "overdue";

export interface Note {
	titles: string;
	body: string;
	imageUrl?: string;
	priority: PriorityType;
	status: StatusType;
	createdAt: number;
	completedAt: number;
	dueDate: number;
}
