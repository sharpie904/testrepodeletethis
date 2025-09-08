import {z} from "zod";
import {authClient} from "@/lib/auth-client";
import {registerFormSchema} from "@/app/(pages)/(public)/(authentication)/register/schema";
import {PrismaClient} from "@prisma/client";


type RegisterInput = z.infer<typeof registerFormSchema> & Partial<{
    name: string,
    image: string,
    callbackURL: string
}>;

export const registerUser = async ({email, password, name, image, callbackURL}: RegisterInput) => {
    console.log(`registering users with email = ${email} and password = ${password}`)

    const {data, error} = await authClient.signUp.email({
        email,
        password,
        name: name ? name : "",
        image: image ? image : "",
        callbackURL: callbackURL ? callbackURL : "/home",
        fetchOptions: {
            onResponse: () => {

            },
        }
    });

    return {data, error}
}

