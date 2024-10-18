import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";


import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import { DottedSeparator } from "@/components/dotted-separator"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import Link from "next/link";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";

const formSchema = z.object({
    name: z.string().trim().min(1, "Required"),
    email: z.string().email(),
    password: z.string().min(8, "Minimum 8 characters required"),
})

export const SignUpCard = () => {

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            email: "",
            password: "",
        },
    });

    const onSubmit = (values: z.infer<typeof formSchema>) => {
        console.log(values);

    }


    return (
        <Card className="w-full h-full sm:w-[486px] border-none shadow-sm">
            <CardHeader className="flex items-center justify-center text-center p-6">
                <CardTitle className="text-2xl">
                    Sign up
                </CardTitle>
                <CardDescription>
                    By signing up, your are agree to our {" "}
                    <Link href="/privacy">
                        <span className="text-blue-700">Privacy Policy</span>
                    </Link>

                </CardDescription>
            </CardHeader>
            <div className="px-7">
                <DottedSeparator />
            </div>
            <CardContent className="p-6">
                <Form {...form} >
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                        <FormField
                            name="name"
                            control={form.control}
                            render={({ field }) => (
                                <FormItem>
                                    <FormControl>
                                        <Input
                                            {...field}
                                            type="text"
                                            placeholder="Enter your name"
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            name="email"
                            control={form.control}
                            render={({ field }) => (
                                <FormItem>
                                    <FormControl>
                                        <Input
                                            {...field}
                                            type="email"
                                            placeholder="Enter email address"
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            name="password"
                            control={form.control}
                            render={({ field }) => (
                                <FormItem>
                                    <FormControl>
                                        <Input
                                            {...field}
                                            type="password"
                                            placeholder="Enter password"
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <Button disabled={false} size="lg" className="w-full">
                            Sign up
                        </Button>
                    </form>
                </Form>
            </CardContent>
            <div className="px-7">
                <DottedSeparator />
            </div>
            <CardContent className="flex flex-col gap-y-4 p-6">
                <Button variant="secondary" size="lg" className="w-full" disabled={false}>
                    <FcGoogle className="mr-2 size-5" />
                    Login with Google
                </Button>
                <Button variant="secondary" size="lg" className="w-full" disabled={false}>
                    <FaGithub className="mr-2 size-5" />
                    Login with Github
                </Button>
            </CardContent>
            <div className="px-7">
                <DottedSeparator />
            </div>
            <CardContent className="flex items-center justify-center p-6">
                <p className="text-sm">
                    Already have an account?
                    <Link href="/sign-in">
                        <span className="text-blue-700">&nbsp;Login</span>
                    </Link>
                </p>
            </CardContent>
        </Card>
    )
}