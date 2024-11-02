import Image from "next/image";
import Link from "next/link";
import { DottedSeparator } from "./dotted-separator";
import { Navigation } from "./navigation";
import { WorkspaceSwitcher } from "./workspace-switcher";
import { Projects } from "./projects";

export const Sidebar = () => {
    return(
        <aside className="h-full w-full bg-neutral-100 p-4">
            <Link href="/">
            <Image src="/logo.svg" alt="Logo" width={164} height={48} />
            </Link>
            <DottedSeparator className="my-4" />
            <WorkspaceSwitcher />
            <DottedSeparator className="my-4" />
            <Navigation />
            <DottedSeparator className="my-4" />
            <Projects />
            <DottedSeparator className="my-4" />
        </aside>
    );
};