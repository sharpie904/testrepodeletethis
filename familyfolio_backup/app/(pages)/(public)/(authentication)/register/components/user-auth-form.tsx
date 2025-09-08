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
import {registerFormSchema} from "@/app/(pages)/(public)/(authentication)/register/schema";
import {authClient} from "@/lib/auth-client";
import {toast} from "sonner";

type UserAuthFormProps = React.HTMLAttributes<HTMLDivElement>

export function UserAuthForm({className, ...props}: UserAuthFormProps) {
    const [isLoading, setIsLoading] = React.useState<boolean>(false)

    type registerFormValues = z.infer<typeof registerFormSchema>;

    const onSubmit: SubmitHandler<registerFormValues> = async (data: FieldValues) => {
        await authClient.signUp.email({
            email: data?.email,
            password: data?.password,
            name: data?.name ? data?.name : "",
            image: data?.image ? data?.image : "",
            callbackURL: data?.callbackURL ? data?.callbackURL : "/login",
            fetchOptions: {
                onResponse: async () => {
                    setIsLoading(false);
                    toast("Registration success! Please check your email for further details.")

                    await authClient.sendVerificationEmail({
                        email: data?.email,
                        callbackURL: "/verification",
                    });
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

    const form = useForm<registerFormValues>({
        resolver: zodResolver(registerFormSchema)
    });

    return (
        <div className={cn("grid gap-6", className)} {...props}>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)}>
                    <div className="grid gap-2">
                        <div className="grid gap-1">
                            <FormField control={form.control} name="name" render={({field}) => (
                                <FormItem>
                                    <FormLabel>Name</FormLabel>
                                    <FormControl>
                                        <Input id="name"
                                               type="text"
                                               placeholder="Your name (leave it empty if you prefer not to say)"
                                               autoCapitalize={"words"}
                                               autoCorrect={"off"} {...field}
                                               autoComplete="name"
                                               disabled={isLoading}/>
                                    </FormControl>
                                    <FormMessage>{form.formState.errors.root?.message}</FormMessage>
                                </FormItem>
                            )}/>

                            <FormField control={form.control} name="email" render={({field}) => (
                                <FormItem>
                                    <FormLabel>Email</FormLabel>
                                    <FormControl>
                                        <Input id="email"
                                               type="email"
                                               placeholder="name@example.com (required)"
                                               autoCapitalize={"none"}
                                               autoCorrect={"off"} {...field}
                                               autoComplete="email"
                                               disabled={isLoading}/>
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

                            <FormField control={form.control} name="confirmPassword" render={({field}) => (
                                <FormItem>
                                    <FormLabel>Confirm Password</FormLabel>
                                    <FormControl>
                                        <Input
                                            id="confirm-password"
                                            placeholder="Confirm your password"
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
                            Sign Up with Email
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
