import Image from "next/image";
import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

interface ProjectAvatarProps {
    image?: string;
    name: string;
    className?: string;
    fallbackClassName?: string;
}

export const ProjectAvatar = ({
    image, name, className, fallbackClassName,
}: ProjectAvatarProps) => {
    if(image){
        return(
        <div className={cn(
            "size-5 relative overflow-hidden rounded-md", className
        )}>
            
            <Image src={image} alt={name} className="object-fit" fill />
       
        </div>
         );
        
    };
    return(
        <Avatar className={cn("size-5 rounded-md", className)}>
            <AvatarFallback className={cn("text-white bg-blue-600 text-sm font-semibold uppercase rounded-md",
                fallbackClassName,
            )}>
                {name[0]}
            </AvatarFallback>
        </Avatar>
    );
};