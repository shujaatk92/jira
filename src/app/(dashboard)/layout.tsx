import { Sidebar } from "@/components/sidebar";

interface DashBoardLayoutProps {
    children: React.ReactNode;
}

const DashBoard = ({ children }: DashBoardLayoutProps) => {
    return (
        <div className="min-h-screen">
            <div className="w-full h-full">
                <div className="fixed top-0 left-0 hidden lg:block lg:w-[264px] h-full overflow-y-auto">
                    <Sidebar />
                </div>
                <div className="lg:pl-[264px]">
                    <div className="mx-auto max-w-screen-2xl h-full">
                        {/* TODO nav bar */}
                        <main className="flex flex-col py-8 px-6 h-full">
                        {children}
                        </main>
                    </div>
                    
                </div>

            </div>
        </div>
    )
};
export default DashBoard