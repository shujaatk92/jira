import { DragDropContext } from "@hello-pangea/dnd";

import { useState } from "react";
import { Task, taskStatus } from "../type";
import { KanbanColumnHeader } from "./kanban-column-header";

const boards: taskStatus[] = [
    taskStatus.BACKLOG,
    taskStatus.TODO,
    taskStatus.IN_PROGRESS,
    taskStatus.IN_REVIEW,
    taskStatus.DONE,
];

type TasksState = {
    [key in taskStatus] : Task[]
}

interface DataKanbanProps {
    data: Task[];
}
export const DataKanban = ({data}:DataKanbanProps) => {

    const [tasks, setTasks] = useState<TasksState>(() => {

        const initialTasks: TasksState = {
            [taskStatus.BACKLOG]: [],
            [taskStatus.TODO]: [],
            [taskStatus.IN_PROGRESS]: [],
            [taskStatus.IN_REVIEW]: [],
            [taskStatus.DONE]: [],
        };

        data.forEach( (task) => {
            initialTasks[task.status].push(task);
        });

        Object.keys(initialTasks).forEach((status) => {
            initialTasks[status as taskStatus].sort((a,b) => a.position - b.position);
        });

        return initialTasks;
    });

    return(
        <DragDropContext onDragEnd={() => {}} >
            <div className="flex overflow-x-auto">
                {boards.map((board) => {
                    return(
                        <div key={board} className="flex-1 mx-2 bg-muted p-1.5 rounded-md min-w-[200px]">
                            <KanbanColumnHeader 
                            board={board}
                            taskCount={tasks[board].length}
                            />
                        </div>
                    )
                })}
            </div>
        </DragDropContext>
    );
};