import { getCurrent } from "@/features/auth/actions";
import { getProject } from "@/features/projects/queries";
import { redirect } from "next/navigation";

interface ProjectIdpageProps {
    params: {
        projectId: string;
    }
}

const ProjectIdPage = async ({params}:ProjectIdpageProps) => {

    const user = await getCurrent();
    if(!user) redirect("/sign-in");

    const initialValues = await getProject({
        projectId: params.projectId
    })

    return(
        <div>
            {JSON.stringify(initialValues)}
        </div>
    );
};
export default ProjectIdPage;