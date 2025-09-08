"use client"

import * as React from "react"

import {cn} from "@/lib/utils"
import {Icons} from "@/components/ui/icons"
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import {z} from "zod";
import {FieldValues, SubmitHandler, useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form";
import {authClient} from "@/lib/auth-client";
import {toast} from "sonner";
import {useSearchParams} from "next/navigation";

type UserAuthFormProps = React.HTMLAttributes<HTMLDivElement>

export function UserAuthForm({className, ...props}: UserAuthFormProps) {
    const [isLoading, setIsLoading] = React.useState<boolean>(false)
    const searchParams = useSearchParams();
    const callbackURL = searchParams.get("callback");

    const formSchema = z.object({
        email: z.string().email({message: "Valid email required"}),
        password: z.string().min(6, "Password must be at least 6 characters"),
    });

    type formValues = z.infer<typeof formSchema>;

    const onSubmit: SubmitHandler<formValues> = async (data: FieldValues) => {
        await authClient.signIn.email({
            email: data?.email,
            password: data?.password,
            callbackURL: callbackURL ? callbackURL : "/home",
            fetchOptions: {
                onResponse: async () => {
                    setIsLoading(false);
                    toast("Login success!")
                },

                onRequest: () => {
                    setIsLoading(true);
                },

                onError: (ctx) => {
                    setIsLoading(false);
                    toast(ctx.error.message);
                }
            }
        });
    }

    const form = useForm<formValues>({
        resolver: zodResolver(formSchema)
    });

    return (
        <div className={cn("grid gap-6", className)} {...props}>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)}>
                    <div className="grid gap-2">
                        <div className="grid gap-1">
                            <FormField control={form.control} name="email" render={({field}) => (
                                <FormItem>
                                    <FormLabel>Email</FormLabel>
                                    <FormControl>
                                        <Input id="email" type="email" placeholder="name@example.com"
                                               autoCapitalize={"none"} autoCorrect={"off"} {...field}
                                               autoComplete="email" disabled={isLoading}/>
                                    </FormControl>
                                    <FormMessage>{form.formState.errors.root?.message}</FormMessage>
                                </FormItem>
                            )}/>

                            <FormField control={form.control} name="password" render={({field}) => (
                                <FormItem>
                                    <FormLabel>Password</FormLabel>
                                    <FormControl>
                                        <Input id="password"
                                               placeholder="Password"
                                               type="password"
                                               autoCapitalize="none"
                                               autoComplete="password"
                                               autoCorrect="off"
                                               disabled={isLoading}
                                               {...field}
                                        />
                                    </FormControl>
                                    <FormMessage/>
                                </FormItem>
                            )}/>
                        </div>
                        <Button disabled={isLoading}>
                            {isLoading && (
                                <Icons.spinner className="mr-2 h-4 w-4 animate-spin"/>
                            )}
                            Sign In with Email
                        </Button>
                    </div>
                </form>
            </Form>
            <div className="relative">
                <div className="absolute inset-0 flex items-center">
                    <span className="w-full border-t"/>
                </div>
                <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-muted-foreground">
            Or continue with
          </span>
                </div>
            </div>
            <Button variant="outline" type="button" disabled={isLoading}>
                {isLoading ? (
                    <Icons.spinner className="mr-2 h-4 w-4 animate-spin"/>
                ) : (
                    <Icons.gitHub className="mr-2 h-4 w-4"/>
                )}{" "}
                GitHub
            </Button>
            <Button variant="outline" type="button" disabled={isLoading}>
                {isLoading ? (
                    <Icons.spinner className="mr-2 h-4 w-4 animate-spin"/>
                ) : (
                    <Icons.gitHub className="mr-2 h-4 w-4"/>
                )}{" "}
                Google
            </Button>
        </div>
    )
}