import { DragDropContext, Draggable, Droppable, type DropResult } from "@hello-pangea/dnd";

import { useCallback, useState } from "react";
import { Task, taskStatus } from "../type";
import { KanbanColumnHeader } from "./kanban-column-header";
import { KanbanCard } from "./kanban-card";

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

    const onDragEnd = useCallback( (result: DropResult) => {

        if(!result.destination) return;

        const { source, destination} = result;
        const sourceStatus = source.droppableId as taskStatus;
        const destStatus = destination.droppableId as taskStatus;

        let updatesPayload: {$id: string, status: taskStatus, position: number}[] = [] ;

        setTasks((prevTasks) => {
            const newTasks = {...prevTasks };

            //safely remove the task from the source column

            const sourceColumn = [...newTasks[sourceStatus]];
            const [movedTask] = sourceColumn.splice(source.index, 1);

            //If there is no moved task (shouldn't happen but in case) return the previous state
            if(!movedTask){
                console.log("No task found at the source index");
                return prevTasks;
            }

            //create a new task with potentially updated status
            const updatedMovedTask = sourceStatus !== destStatus
            ? {...movedTask, status: destStatus}
            : movedTask;

            //Update the source column
            newTasks[sourceStatus] = sourceColumn;

            //Add the task to the new destination column
            const destColumn = [...newTasks[destStatus]];
            destColumn.splice(destination.index, 0, updatedMovedTask);
            newTasks[destStatus] = destColumn;

            //Prepare minimum update payloads
            updatesPayload = [];

            //Always update the moved task
            updatesPayload.push({
                $id: updatedMovedTask.$id,
                status: destStatus,
                position: Math.min((destination.index + 1) * 1000, 1_000_000),
            });

            //Update positions for affected task in the destination column
            newTasks[destStatus].forEach((task, index) => {
                if(task && task.$id !== updatedMovedTask.$id){
                    const newPostion = Math.min((index + 1) * 1000, 1_000_000);
                    if(task.position !== newPostion){
                        updatesPayload.push({
                            $id: task.$id,
                            status: destStatus,
                            position: newPostion,
                        });
                    };
                };
            });

            //If the task moved between column, update positions in the source column
        });

    }, []);

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
                            <Droppable droppableId={board}>
                                {(provided) => (
                                    <div 
                                    {...provided.droppableProps}
                                    ref={provided.innerRef}
                                    className="min-h-[200px] py-1.5"
                                    >
                                        {tasks[board].map( (task, index) => (
                                            <Draggable 
                                            key={task.$id}
                                            draggableId={task.$id}
                                            index={index}
                                            >
                                               {(provided) => (
                                                <div
                                                ref={provided.innerRef}
                                                {...provided.draggableProps}
                                                {...provided.dragHandleProps}
                                                >
                                                    <KanbanCard task={task} />
                                                </div>
                                               )}  

                                            </Draggable>
                                        ))}
                                        {provided.placeholder}
                                    </div>
                                )}
                            </Droppable>
                        </div>
                    )
                })}
            </div>
        </DragDropContext>
    );
};