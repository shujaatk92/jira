import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue, SelectSeparator } from "@/components/ui/select";
import { useGetMembers } from "@/features/members/api/use-get-members";
import { useGetProjects } from "@/features/projects/api/use-get-projects";
import { useWorkspaceId } from "@/features/workspaces/hooks/use-workspace-id";
import { ListCheckIcon, UserIcon, FolderIcon } from "lucide-react";
import { taskStatus } from "../type";
import { UseTaskFilters } from "../hooks/use-task-filters";
import { DatePicker } from "@/components/date-picker";

interface DataFeltersProbs {
    hideProjectFilter?: boolean;
}

export const DataFelters = ({ hideProjectFilter }: DataFeltersProbs) => {

    const workspaceId = useWorkspaceId();

    const { data: projects, isLoading: isLoadingProjects } = useGetProjects({ workspaceId });
    const { data: members, isLoading: isLoadingMembers } = useGetMembers({ workspaceId });

    const isLoading = isLoadingProjects || isLoadingMembers;

    const projectOptions = projects?.documents.map((project) => ({
        value: project.$id,
        label: project.name,
    }));

    const memberOptions = members?.documents.map((member) => ({
        value: member.$id,
        label: member.name,
    }));

    const [{
        projectId,
        status,
        assigneeId,
        dueDate, 
    }, setFilters] = UseTaskFilters();

    const onStatusChange = (value: string) => {
        setFilters({ status: value === "all" ? null : value as taskStatus });
    }

    const onAssigneeChange = (value: string) => {
        setFilters({ assigneeId: value === "all" ? null : value as string });
    }

    const onProjectChange = (value: string) => {
        setFilters({ projectId: value === "all" ? null : value as string });
    }

    if (isLoading) return null;

    return (
        <div className="flex flex-col lg:flex-row gap-2">
            <Select
                defaultValue={status ?? undefined}
                onValueChange={(value) => onStatusChange(value)}
            >
                <SelectTrigger className="w-full lg:w-auto h-8">
                    <div className="flex items-center pr-2">
                        <ListCheckIcon className="size-4 mr-2" />
                        <SelectValue placeholder="All statuese" />
                    </div>
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="all">All statuses</SelectItem>
                    <SelectSeparator/>
                    <SelectItem value={taskStatus.BACKLOG}>Backlog</SelectItem>
                    <SelectItem value={taskStatus.IN_PROGRESS}>In Progress</SelectItem>
                    <SelectItem value={taskStatus.IN_REVIEW}>In Review</SelectItem>
                    <SelectItem value={taskStatus.TODO}>Todo</SelectItem>
                    <SelectItem value={taskStatus.DONE}>Done</SelectItem>

                </SelectContent>
            </Select>

            <Select
                defaultValue={assigneeId ?? undefined}
                onValueChange={(value) => onAssigneeChange(value)}
            >
                <SelectTrigger className="w-full lg:w-auto h-8">
                    <div className="flex items-center pr-2">
                        <UserIcon className="size-4 mr-2" />
                        <SelectValue placeholder="All Assignees" />
                    </div>
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="all">All Assignees</SelectItem>
                    <SelectSeparator/>
                    {memberOptions?.map( (member) => (
                        <SelectItem key={member.value} value={member.value}>
                            {member.label}
                        </SelectItem>
                    ))}

                </SelectContent>
            </Select>

            <Select
                defaultValue={projectId ?? undefined}
                onValueChange={(value) => onProjectChange(value)}
            >
                <SelectTrigger className="w-full lg:w-auto h-8">
                    <div className="flex items-center pr-2">
                        <FolderIcon className="size-4 mr-2" />
                        <SelectValue placeholder="All Projects" />
                    </div>
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="all">All Projects</SelectItem>
                    <SelectSeparator/>
                    {projectOptions?.map( (project) => (
                        <SelectItem key={project.value} value={project.value}>
                            {project.label}
                        </SelectItem>
                    ))}

                </SelectContent>
            </Select>
            <DatePicker 
            placeholder="Due date"
            className="w-full h-8 lg:w-auto"
            value={dueDate ? new Date(dueDate) : undefined}
            onChange={(date) => {
                setFilters({dueDate: date ? date.toISOString() : null })
            }}
            />

        </div>
    );
};