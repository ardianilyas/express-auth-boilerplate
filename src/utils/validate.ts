import z, { ZodError, ZodType } from "zod";
import { BadRequest } from "../errors/BadRequest";

function formatZodErrors(error: ZodError) {
    const formatted: Record<string, string> = {};

    for (const issue of error.issues) {
        const path = issue.path.join(".") || "root";
        formatted[path] = issue.message;
    }

    return formatted;
}

export function validate<T extends ZodType>(schema: T, input: unknown): z.infer<T> {
    const parsed = schema.safeParse(input);

    if (!parsed.success) {
        const error = new BadRequest("Validation Error", formatZodErrors(parsed.error));

        throw error;
    }

    return parsed.data;
}