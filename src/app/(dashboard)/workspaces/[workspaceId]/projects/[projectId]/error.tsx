"use client"

import { Button } from "@/components/ui/button";
import { TriangleAlertIcon } from "lucide-react";
import Link from "next/link";

const Errorpage = () => {
    return (
        <div className="h-screen flex flex-col items-center justify-center gap-y-4">
            <TriangleAlertIcon className="size-6"/>
            <p className="text-sm">
                Something went wrong
            </p>
            <Button variant="secondary" size="sm" asChild>
                <Link href="/">
                    Back to home
                </Link>
            </Button>
        </div>
    );
};

export default Errorpage;