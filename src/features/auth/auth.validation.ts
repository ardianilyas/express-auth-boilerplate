import z from "zod";

export const registerSchema = z.object({
    name: z.string().min(1, "Name is required"),
    email: z.email("Invalid email").min(1, "Email is required"),
    password: z.string().min(1, "Password is required").min(8, "Password must be at least 8 characters"),
});

export const loginSchema = z.object({
    email: z.email("Invalid email").min(1, "Email is required"),
    password: z.string().min(1, "Password is required"),
});

export type RegisterSchema = z.infer<typeof registerSchema>;
export type LoginSchema = z.infer<typeof loginSchema>;