import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(@Body() loginDto: { email: string; password: string }) {
    const teacher = await this.authService.validateTeacher(
      loginDto.email,
      loginDto.password,
    );

    return this.authService.login(teacher);
  }
}
