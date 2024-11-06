import { Account, Client, Databases } from "node-appwrite";
import { AUTH_COOKIE } from "../auth/constants";
import { getMember } from "../members/utils";
import { Project } from "./types";
import { DATABASE_ID, PROJECTS_ID } from "@/config";
import { cookies } from "next/headers";

interface GetProjectPrpos { 
    projectId: string;
 }

export const getProject = async ({ projectId }: GetProjectPrpos ) => {

   
        const client = new Client()
            .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT!)
            .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT!);

        const session = await cookies().get(AUTH_COOKIE);

        if (!session) return null;
        client.setSession(session.value);
        const account = new Account(client);
        const user = await account.get();
        const databases = new Databases(client);


        const project = await databases.getDocument<Project>(
            DATABASE_ID, 
            PROJECTS_ID,
            projectId,
        );

        const member = await getMember({
            databases,
            userId: user.$id,
            workspaceId: project.workspaceId,
        });

        if(!member){
            throw new Error("Unauthorized!");
        }
        return project;
    } 




// import { createSessionClient } from "@/lib/appwrite"
// import { getMember } from "../members/utils";
// import { DATABASE_ID, PROJECTS_ID,} from "@/config";
// import { Project } from "./types";

// interface GetProjectPrpos { 
//     projectId: string;
//  }

// export const getProject = async ({ projectId }: GetProjectPrpos ) => {

//     try {

//         const { databases, account } = await createSessionClient();

//         const user = await account.get();

//         const project = await databases.getDocument<Project>(
//             DATABASE_ID,
//             PROJECTS_ID,
//             projectId,
//         )

//         const member = await getMember({
//             databases,
//             userId: user.$id,
//             workspaceId: project.workspaceId,
//         });

//         if(!member){
//             return null;
//         }

//         return project;

//     } catch {
//         return null;
//     }
// }
