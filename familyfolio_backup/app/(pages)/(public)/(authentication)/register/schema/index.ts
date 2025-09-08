import {z} from "zod";

export const registerFormSchema = z.object({
    name: z.string().optional(),
    email: z.string().email({message: "Valid email required"}),
    password: z.string().min(6, "Password must be at least 6 characters"),
    confirmPassword: z.string().min(6, "Password must be at least 6 characters"),
}).refine(data => {
    return data.password === data.confirmPassword;
}, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
});

