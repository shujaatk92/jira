import { cookies } from "next/headers";
import { Account, Client, Databases, Query, } from "node-appwrite";
import { AUTH_COOKIE } from "@/features/auth/constants";
import { DATABASE_ID, MEMBERS_ID, WORKSPACES_ID,  } from "@/config";
import { getMember } from "../members/utils";
import { Workspace } from "./types";

export const getWorkspaces = async () => {
    
        const client = new Client()
            .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT!)
            .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT!);

        const session = await cookies().get(AUTH_COOKIE);

        if (!session) return {documents: [], total: 0};
        client.setSession(session.value);
        const account = new Account(client);
        const user = await account.get();
        const databases = new Databases(client);

        const members = await databases.listDocuments(
            DATABASE_ID, 
            MEMBERS_ID,
            [Query.equal("userId", user.$id)]
        );

        if(members.total === 0){
            return {documents: [], total: 0};
        }

        const workspaceIds = members.documents.map((member) => member.workspaceId);

        const workspaces = await databases.listDocuments(
            DATABASE_ID, 
            WORKSPACES_ID,
            [
                Query.orderDesc("$createdAt"),
                Query.contains("$id", workspaceIds)
            ],
        );

        return workspaces;
    
};

interface GetWorkspacePrpos { 
    workspaceId: string;
 }

export const getWorkspace = async ({ workspaceId }: GetWorkspacePrpos ) => {
    
        const client = new Client()
            .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT!)
            .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT!);

        const session = await cookies().get(AUTH_COOKIE);

        if (!session) return null;
        client.setSession(session.value);
        const account = new Account(client);
        const user = await account.get();
        const databases = new Databases(client);

        const member = await getMember({
            databases,
            userId: user.$id,
            workspaceId,
        });

        if(!member){
            throw new Error("Unauthorized");
        }


        const workspace = await databases.getDocument<Workspace>(
            DATABASE_ID, 
            WORKSPACES_ID,
            workspaceId,
        );
        
        return workspace;
}


interface GetWorkspaceInfoPrpos { 
    workspaceId: string;
 }

export const getWorkspaceInfo = async ({ workspaceId }: GetWorkspaceInfoPrpos ) => {
    
        const client = new Client()
            .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT!)
            .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT!);

        const session = await cookies().get(AUTH_COOKIE);

        if (!session) return null;
        client.setSession(session.value);
        const databases = new Databases(client);


        const workspace = await databases.getDocument<Workspace>(
            DATABASE_ID, 
            WORKSPACES_ID,
            workspaceId,
        );
        return {
            name: workspace.name,
        };

}