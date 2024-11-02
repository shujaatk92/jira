import Image from "next/image";
import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

interface ProjectAvatarProps {
    image?: string;
    name: string;
    className?: string;
}

export const ProjectAvatar = ({
    image, name, className
}: ProjectAvatarProps) => {
    if(image){
        return(
        <div className={cn(
            "size-10 relative overflow-hidden rounded-md", className
        )}>
            
            <Image src={image} alt={name} className="object-fit" fill />
       
        </div>
         );
        
    };
    return(
        <Avatar className={cn("size-10 rounded-md", className)}>
            <AvatarFallback className="text-white bg-blue-600 text-lg font-semibold uppercase rounded-md">
                {name[0]}
            </AvatarFallback>
        </Avatar>
    );
};