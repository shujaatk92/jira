import { z } from "zod";
import { taskStatus } from "./type";

export const createTasksSchemas = z.object({
    name: z.string().trim().min(1, "Name is required"),
    status: z.nativeEnum(taskStatus, { required_error: "Status is required"}),
    workspaceId: z.string().trim().min(1, "WorkspaceId is required"),
    projectId: z.string().trim().min(1, "ProjectId is required"),
    dueDate: z.coerce.date(),
    assigneeId: z.string().trim().min(1, "AssigneeId is required"),
    description: z.string().optional(),
})