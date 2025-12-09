import { Prisma } from "../generated/prisma/client";
import { Conflict } from "./Conflict";
import { NotFound } from "./NotFound";

export function prismaErrorHandler(err: any) {
    if (err instanceof Prisma.PrismaClientKnownRequestError) {
        // Unique constraint
        if (err.code === "P2002") {
            return new Conflict("Record already exists");
        }

        // Record not found
        if (err.code === "P2025") {
            return new NotFound("Record not found");
        }
    }

    return err;
}