import z from "zod";

export const signupSchema = {
    body: z.strictObject({
        userName: z.string().min(3).max(20),
        email: z.email(),
        password: z.string().min(8).max(20),
        confirmPassword: z.string().min(8).max(20),
        phone: z.string().min(10).max(10),
        gender: z.string().min(1).max(1),
    })
}