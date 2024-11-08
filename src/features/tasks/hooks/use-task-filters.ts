import { parseAsString, parseAsStringEnum, useQueryStates } from "nuqs";
import { taskStatus } from "../type";

export const UseTaskFilters = () => {
    return useQueryStates({
        projectId: parseAsString,
        status: parseAsStringEnum(Object.values(taskStatus)),
        assigneeId: parseAsString,
        search: parseAsString,
        dueDate: parseAsString,
    });
};