import { SettingsIcon, UserIcon } from "lucide-react";
import Link  from "next/link";
import { GoCheckCircle, GoCheckCircleFill, GoHome, GoHomeFill } from "react-icons/go";

const routes = [
    {
        label: "Home",
        href: "",
        icon: GoHome,
        activeIcon: GoHomeFill,
    },
    {
        label: "My Tasks",
        href: "/tasks",
        icon: GoCheckCircle,
        activeIcon: GoCheckCircleFill,
    },
    {
        label: "Settings",
        href: "/settings",
        icon: SettingsIcon,
        activeIcon: SettingsIcon,
    },
    {
        label: "Members",
        href: "/members",
        icon: UserIcon,
        activeIcon: UserIcon,
    },

]

export const Navigation = () => {
    return (
        <ul>
            {routes.map((item) => {

                const isActive = false;
                const Icon = isActive ? item.activeIcon : item.icon;
                
                return(
                    <Link key={item.href} href={item.href}>
                        <div>
                            <Icon className="size-5 text-neutral-500"/>
                            {item.label}
                        </div>
                    </Link>
                )
            })
            }
        </ul>
    );
};