"use client"

import { DottedSeparator } from "@/components/dotted-separator"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"


export const SignInCard = () => {
    return(
        <Card className="w-full h-full md:w-[486px] border-none shadow-none ">
            <CardHeader className="flex items-center justify-center text-center p-7">
                <CardTitle className="text-2xl">
                    Welcome back!
                </CardTitle>
            </CardHeader>
            <div className="px-7">
                <DottedSeparator />
            </div>
            <CardContent className="p-7">
                <form className="space-y-4">
                    <Input 
                    required
                    value={""}
                    type="email"
                    placeholder="Enter your email address"
                    onChange={() => {}}
                    disabled={false}
                    />
                </form>
            </CardContent>
        </Card>
    )
}