"use client";

import { useGetProjects } from "@/features/projects/api/use-get-projects";
import { useWorkspaceId } from "@/features/workspaces/hooks/use-workspace-id";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { RiAddCircleFill } from "react-icons/ri";

export const Projects = () => {

    const workspaceId = useWorkspaceId();
    const { data } = useGetProjects({workspaceId});
    const pathname = usePathname();

    const projectId = null //TODO ADD LATER

    return(
        <div className="flex flex-col gap-y-2">
            <div className="flex items-center justify-between">
                <p className="text-xs uppercase text-neutral-500">Projects</p>
                <RiAddCircleFill onClick={() => {}} className="size-5 text-neutral-500 hover:opacity-75 transition cursor-pointer"/>
            </div>
            {data?.documents.map( (project)=> {

                const href = `/wprkspaces/${workspaceId}/projects/${projectId}`;
                const isActive = pathname === href;
                return(
                    <Link href={href} key={project.$id}>
                        <div className={cn(
                            "flex items-center gap-2.5 p-2.5 rounded-md hover:opacity-75 transition cursor-pointer text-neutral-500",
                            isActive && "bg-white shadow-sm hover:opacity-100 text-primary"
                            )}>
                                <span className="truncate">{project.name}</span>
                        </div>
                    </Link>
                )

            })}
        </div>
    );
};