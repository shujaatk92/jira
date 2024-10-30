import { getCurrent } from "@/features/auth/actions";
import { getWorkspaceInfo } from "@/features/workspaces/actions";
import { JoinWorkspaceForm } from "@/features/workspaces/components/join-workspace-form";
import { redirect } from "next/navigation";

interface WorkspaceIdJoinPageProps {
    params: {
        workspaceId: string;
    };
}

const WorkspaceIdJoinPage = async({ params }: WorkspaceIdJoinPageProps) => {
    const user = getCurrent();
    if(!user){
        redirect("/sign-in")
    };

    const initialValues = await getWorkspaceInfo({
        workspaceId: params.workspaceId,
    });
    if(!initialValues) redirect("/");    
    
    return(
        <div className="w-full md:max-w-md">
            <JoinWorkspaceForm initialValues={initialValues}/>
        </div>
    );
};

export default WorkspaceIdJoinPage;