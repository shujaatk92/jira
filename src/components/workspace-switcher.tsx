"use client"

import { RiAddCircleFill } from "react-icons/ri";
import { 
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue
} from "./ui/select";

import { useWorkspaceId } from "@/features/workspaces/hooks/use-workspace-id"
import { useGetWorkspaces } from "@/features/workspaces/api/use-get-workspaces";
import { WorkspaceAvatar } from "@/features/workspaces/components/workspace-avatar";
import { useRouter } from "next/navigation";
import { useCreateWorkspaceModal } from "@/features/workspaces/hooks/use-create-workspace-modal";

export const WorkspaceSwitcher = () => {

    const workspaceId = useWorkspaceId();
    const router = useRouter();
    const { open } = useCreateWorkspaceModal();
    const { data: workspaces } = useGetWorkspaces();

    const onSelect = (id: string) => {
        router.push(`/workspaces/${id}`);
    } 
    
    return (
        <div className="flex flex-col gap-y-2">
            <div className="flex items-center justify-between">
                <p className="text-xs uppercase text-neutral-500">Workspaces</p>
                <RiAddCircleFill onClick={open} className="size-5 text-neutral-500 hover:opacity-75 transition cursor-pointer"/>
            </div>
            <Select onValueChange={onSelect} value={workspaceId}>
                <SelectTrigger className="w-full p-1 bg-neutral-100 font-medium">
                    <SelectValue placeholder="No workspace selected" />
                </SelectTrigger>
                <SelectContent>
                    {workspaces?.documents.map((workspace) => (
                        <SelectItem key={workspace.$id} value={workspace?.$id}>
                            <div className="flex items-center justify-start gap-3 font-medium">
                                <WorkspaceAvatar name={workspace.name} image={workspace.imageUrl} />
                                <span className="truncate">{workspace.name}</span>
                            </div>
                        </SelectItem>
                    ))}
                </SelectContent>
            </Select>
        </div>
    );
};