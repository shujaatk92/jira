import { useCurrent } from "@/features/auth/api/use-current";
import { getProject } from "@/features/projects/queries";
import { redirect } from "next/navigation";

interface ProjectIdSettingsPageProps {
    params: {
        projectid:string;
    }
}

const ProjectIdSettingsPage = async ({ params } : ProjectIdSettingsPageProps) => {

    const user = useCurrent();
    if(!user) redirect("/sign-in");

    const initialVAlues = await getProject({
        projectId: params.projectid
    }); 

    return(
        <div>
            ProjectIdSettingsPage
        </div>
    );
};

export default ProjectIdSettingsPage;