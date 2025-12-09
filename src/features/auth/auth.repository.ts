import { prisma } from "../../lib/prisma";
import { RegisterSchema } from "./auth.validation";

export class AuthRepository {
    async createUser(data: RegisterSchema) {
        return await prisma.user.create({ data });
    }

    async findUserByEmail(email: string) {
        return await prisma.user.findUnique({ where: { email } });
    }

    async findUserById(id: string) {
        return await prisma.user.findUnique({ where: { id } });
    }
}