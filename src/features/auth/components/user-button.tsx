"use client";

import { Loader, LogOut } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { DottedSeparator } from "@/components/dotted-separator";

import { useLogout } from "../api/use-logout";
import { useCurrent } from "../api/use-current";

export const UserButton = () => {
    const { mutate: logout  } = useLogout();
    const { data: user, isLoading } = useCurrent();
    if (isLoading) {
        return (
            <div className="size-10 rounded-md flex items-center justify-center bg-neutral-200 border-neutral-300">
                <Loader className="size-4 animate-spin text-muted-foreground" />
            </div>
        );
    };
    if (!user) {
        return null;
    }
   
    const { name, email } = user;
    const avatarFallback = name ? name.charAt(0).toUpperCase() : email.charAt(0).toUpperCase() ?? "U";
    return (
        <DropdownMenu modal={false}>
            <DropdownMenuTrigger className="outline-none relative">
                <Avatar className="size-10 hover:opacity-75 transition border border-neutral-300">
                    <AvatarFallback className="font-medium bg-neutral-200 text-neutral-500 flex items-center justify-center">
                        {avatarFallback}
                    </AvatarFallback>
                </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" side="bottom" className="w-60" sideOffset={10}>
                <div className="flex flex-col items-center justify-center gap-2 px-2.5 py-4 ">
                    <Avatar className="size-[52px] border border-neutral-300">
                        <AvatarFallback className="text-xl font-medium bg-neutral-200 text-neutral-500 flex items-center justify-center">
                            {avatarFallback}
                        </AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col items-center justify-center">
                        <p className="text-sm text-neutral-900 font-medium">{ name || "User"}</p>
                        <p className="text-xs text-neutral-500">{ email }</p>
                    </div>
                </div>
                <DottedSeparator className="mb-1" />
                <DropdownMenuItem onClick={() => logout() } className="h-10 flex items-center justify-center text-amber-700 font-medium cursor-pointer">
                    <LogOut className="s-ze-4 mr-1" />
                    Logout
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
};