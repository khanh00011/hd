import {
  BadRequestException,
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { CreateAdmin } from './dto/createAdmin.dto';

@Controller('auth')
export class AuthController {
  constructor(private service: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Post('login')
  signIn(@Body() signInDto: LoginDto) {
    return this.service.signIn(signInDto.email, signInDto.password);
  }

  @Post('register')
  @HttpCode(HttpStatus.OK)
  async signUp(@Body() body: RegisterDto) {
    try {
      const user = await this.service.signUp(body);
      return {
        status: true,
        message: 'Tạo tài khoản thành công',
        data: user,
      };
    } catch (error) {
      throw error;
    }
  }

  @Post('create-admin')
  @HttpCode(HttpStatus.OK)
  async createAdmin(@Body() body: CreateAdmin) {
    try {
      const admin = await this.service.createAdmin(body);
      return {
        status: true,
        message: 'Tạo tài khoản thành công',
        data: admin,
      };
    } catch (error) {
      throw error;
    }
  }
}
