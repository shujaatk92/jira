"use client"

import { DottedSeparator } from "@/components/dotted-separator";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PlusIcon } from "@radix-ui/react-icons";
import { useCreateTaskModal } from "../hooks/use-create-task-modal";
import { useGetTasks } from "../api/use-get-tasks";
import { useWorkspaceId } from "@/features/workspaces/hooks/use-workspace-id";
import { useQueryState } from "nuqs";
import { Loader } from "lucide-react";
import { DataFelters } from "./data-filters";
import { UseTaskFilters } from "../hooks/use-task-filters";
import { columns } from "./columns";
import { DataTable } from "./data-table";


export const TaskViewSwitcher = () => {

    const [{
        projectId,
        status,
        assigneeId,
        dueDate, 
    }] = UseTaskFilters();

    const [view, setView] = useQueryState("task-view", {
        defaultValue: "table",
    });

    const workspaceId = useWorkspaceId();

    const { data: tasks, isLoading: isLoadingtasks } = useGetTasks({ 
        workspaceId,
        projectId,
        status,
        assigneeId,
        dueDate
     });
    const { open } = useCreateTaskModal();


    return (
        <Tabs
            defaultValue={view}
            onValueChange={setView}
            className="flex-1 w-full border rounded-lg">
            <div className="h-full flex flex-col overflow-auto p-4">
                <div className="flex flex-col gap-y-2 md:flex-row justify-between items-center">
                    <TabsList className="w-full md:w-auto">
                        <TabsTrigger className="h-8 w-full md:w-auto" value="table">
                            Table
                        </TabsTrigger>
                        <TabsTrigger className="h-8 w-full md:w-auto" value="kanban">
                            Kanban
                        </TabsTrigger>
                        <TabsTrigger className="h-8 w-full md:w-auto" value="calendar">
                            Calendar
                        </TabsTrigger>
                    </TabsList>
                    <Button
                        onClick={open}
                        size="sm"
                        className="w-full md:w-auto"
                    >
                        <PlusIcon className="size-4" />
                        New
                    </Button>
                </div>
                <DottedSeparator className="my-4" />
                <DataFelters />
                <DottedSeparator className="my-4" />
                {isLoadingtasks ? (
                    <div className="w-full border rounded-lg flex flex-col items-center justify-center h-[200px]">
                        <Loader className="size-5 animate-spin text-muted-foreground" />
                    </div>
                ) : (
                    <>
                        <TabsContent value="table" className="mt-0">
                            <DataTable columns={columns} data={tasks?.documents ?? []} />
                        </TabsContent>
                        <TabsContent value="kanban" className="mt-0">
                            {JSON.stringify(tasks)}
                        </TabsContent>
                        <TabsContent value="calendar" className="mt-0">
                            {JSON.stringify(tasks)}
                        </TabsContent>
                    </>
                )}
            </div>
        </Tabs>
    );
};