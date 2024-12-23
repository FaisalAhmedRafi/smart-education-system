import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { TeachersService } from '../teachers/teachers.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private readonly teachersService: TeachersService,
    private readonly jwtService: JwtService,
  ) {}

  async validateTeacher(email: string, password: string): Promise<any> {
    
  
    const teacher = await this.teachersService.findByEmail(email);
    if (!teacher) {
      console.log('Teacher not found:', email);
      throw new UnauthorizedException('Invalid credentials');
    }
  
    const passwordMatch = await bcrypt.compare(password, teacher.password);
    
  
    if (passwordMatch) {
      const { password, ...result } = teacher;
      return result;
    }
  
    throw new UnauthorizedException('Invalid credentials');
  }
  

  async login(teacher: any) {
    const payload = { email: teacher.email, sub: teacher.id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
