import { Models } from "node-appwrite";

export enum taskStatus {
BACKLOG = "BACKLOG",
TODO = "TODO",
IN_PROGRESS = "IN_PROGRESS",
IN_REVIEW = "IN_REVIEW",
DONE = "DONE"
}

export type Task = Models.Document & {
    name: string;
    status: taskStatus;
    assigneeId: string;
    workspaceId: string;
    projectId: string;
    position: number;
    duedate: string;
}