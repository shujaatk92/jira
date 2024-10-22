"use client"

import { RiAddCircleFill } from "react-icons/ri";
import { 
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue
} from "./ui/select";
 
import { useGetWorkspaces } from "@/features/workspaces/api/use-get-workspaces";

export const WorkspaceSwitcher = () => {
    const { data: workspaces } = useGetWorkspaces();
    return (
        <div className="flex flex-col gap-y-2">
            <div className="flex items-center justify-between">
                <p className="text-xs uppercase text-neutral-500">Workspaces</p>
                <RiAddCircleFill className="size-5 text-neutral-500 hover:opacity-75 transition cursor-pointer"/>
            </div>
            <Select>
                <SelectTrigger className="w-full p-1 bg-neutral-100 font-medium">
                    <SelectValue placeholder="No workspace selected" />
                </SelectTrigger>
                <SelectContent>
                    {workspaces?.documents.map((workspace) => (
                        <SelectItem key={workspace.$id} value={workspace?.$id}>
                            {workspace?.name}
                        </SelectItem>
                    ))}
                </SelectContent>
            </Select>
        </div>
    );
};