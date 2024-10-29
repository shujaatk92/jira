import { getCurrent } from "@/features/auth/actions";
import { redirect } from "next/navigation";

interface WorkspaceIdSettingPageProps {
    params: {
        workspaceId: string;
    };
}

const WorkspaceIdSettingsPage = async({params}: WorkspaceIdSettingPageProps) => {
    const user = getCurrent();
    if(!user) redirect("/sign-in")
    return(
        <div>
            WorkspaceIdSettingsPage {params.workspaceId}
        </div>
    );
};

export default WorkspaceIdSettingsPage;