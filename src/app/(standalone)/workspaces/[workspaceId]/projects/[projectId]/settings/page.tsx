import { getCurrent } from "@/features/auth/actions";
import { EditProjectForm } from "@/features/projects/components/edit-project-form";
import { getProject } from "@/features/projects/queries";
import { redirect } from "next/navigation";

interface ProjectIdSettingsPageProps {
    params: {
        projectId:string;
    }
}



const ProjectIdSettingsPage = async ({ params } : ProjectIdSettingsPageProps) => {


    const user = getCurrent();
    if(!user) redirect("/sign-in");

    const initialValues = await getProject({
        projectId: params.projectId
    }); 

    if(!initialValues){
        redirect(`/workspaces/workspaceId/projects/${params.projectId}`);
    }


    return(
        <div className="w-full lg:max-w-xl">
            <EditProjectForm initialValues={initialValues} />
        </div>
    );
};

export default ProjectIdSettingsPage;