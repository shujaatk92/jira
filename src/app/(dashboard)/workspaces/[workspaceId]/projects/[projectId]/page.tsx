import { getCurrent } from "@/features/auth/actions";
import { redirect } from "next/navigation";

interface ProjectIdpageProps {
    params: {
        projectId: string;
        workspaceId: string;
    }
}

const ProjectIdPage = async ({params}:ProjectIdpageProps) => {

    const user = await getCurrent();
    if(!user) redirect("/sign-in");

    return(
        <div>
            Project Id {params.projectId} Workspace Id {params.workspaceId}
        </div>
    );
};
export default ProjectIdPage;