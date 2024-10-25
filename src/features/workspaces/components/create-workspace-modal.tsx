"use client";

import { ResponsiveModal } from "@/components/responsive-modal";
import { CreateWorkspaceForm } from "./create-workspace-form";
import { useCreateWorkspaceModal } from "../hooks/use-create-workspace-modal";


export const CreateWorkspaceModal = () => {

    const {isOpen, setIsopen, close} = useCreateWorkspaceModal();

    return(
        <ResponsiveModal open={isOpen} onOpenChange={setIsopen} >
            <CreateWorkspaceForm onCancel={close} />
        </ResponsiveModal>
    )
}