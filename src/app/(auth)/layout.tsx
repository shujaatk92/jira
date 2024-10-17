import { Button } from "@/components/ui/button";
import Image from "next/image";

interface AuthLayoutProps {
    children: React.ReactNode;
}

const AuthLayout = ({ children }: AuthLayoutProps) => {
    return (
        <main className="bg-neutral-100 min-h-screen">
            <div className="mx-auto max-w-screen-2xl p-4">
                <nav className="flex justify-between items-center">
                    <Image src="/logo.svg" alt="Logo" height={56} width={152} />
                    <Button variant="secondary">
                        Sign up
                    </Button>
                </nav>
                <div className="flex items-center justify-center flex-col pt-4 md:pt-14">
                {children}
                </div>
            </div>
        </main>
    );
}

export default AuthLayout;