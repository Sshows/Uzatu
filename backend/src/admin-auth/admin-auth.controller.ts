import { Body, Controller, Post, UnauthorizedException } from "@nestjs/common";
import { AdminAuthService } from "./admin-auth.service";

@Controller("admin/auth")
export class AdminAuthController {
  constructor(private readonly authService: AdminAuthService) {}

  @Post("register")
  register(@Body() body: any) {
    if (!body.username || !body.password) {
      throw new UnauthorizedException("Username and password are required.");
    }
    return this.authService.registerAdmin(body.username, body.password);
  }

  @Post("login")
  login(@Body() body: any) {
    if (!body.username || !body.password) {
      throw new UnauthorizedException("Username and password are required.");
    }
    return this.authService.loginAdmin(body.username, body.password);
  }
}
