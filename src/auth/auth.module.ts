import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './auth.service';
import { JwtStrategy } from './jwt.strategy';
import { AuthController } from './auth.controller';
import { TeachersModule } from '../teachers/teachers.module';

@Module({
  imports: [
    TeachersModule,
    PassportModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET || 'mySuperSecretKey12345',
      signOptions: { expiresIn: '1h' },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy],
})
export class AuthModule {}
