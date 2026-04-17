import { Injectable, UnauthorizedException, BadRequestException } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import * as crypto from "crypto";
import { Role } from "@prisma/client";

@Injectable()
export class AdminAuthService {
  constructor(private readonly prisma: PrismaService) {}

  private hashPassword(password: string): string {
    const salt = "securecourse-salt-2026";
    return crypto.scryptSync(password, salt, 64).toString("hex");
  }

  async registerAdmin(email: string, passwordPlain: string) {
    const existing = await this.prisma.user.findUnique({
      where: { email: email.toLowerCase() }
    });

    if (existing) {
      throw new BadRequestException("Admin user already exists");
    }

    const passwordHash = this.hashPassword(passwordPlain);
    
    const user = await this.prisma.user.create({
      data: {
        email: email.toLowerCase(),
        fullName: "System Admin",
        role: Role.ADMIN,
        passwordHash
      }
    });

    return { success: true, email: user.email, role: user.role };
  }

  async loginAdmin(email: string, passwordPlain: string) {
    const user = await this.prisma.user.findUnique({
      where: { email: email.toLowerCase() }
    });

    if (!user || user.role !== Role.ADMIN) {
      throw new UnauthorizedException("Invalid credentials or access denied");
    }

    if (!user.passwordHash) {
      throw new UnauthorizedException("Invalid credentials");
    }

    const attemptedHash = this.hashPassword(passwordPlain);
    if (user.passwordHash !== attemptedHash) {
      throw new UnauthorizedException("Invalid credentials");
    }

    // Success! Return user data (Next.js will handle the actual cookie session)
    return { success: true, userId: user.id, email: user.email };
  }
}
