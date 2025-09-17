import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import { RegisterDto } from './dto/register.dto';
import helper from 'src/common/helper/index.helper';
import { CreateAdmin } from './dto/createAdmin.dto';
import { UserHelper } from 'src/common/helper/user.heplper';
@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
  ) {}

  async signUp(body: RegisterDto): Promise<any> {
    const { email, name, password, ...rest } = body;
    helper.validateEmail(email);
    const existingUser = await this.prisma.users.findFirst({
      where: {
        email,
      },
    });
    if (!name) {
      throw new BadRequestException('Tên không được để trống');
    }

    if (existingUser) {
      throw new BadRequestException('Email đã tồn tại');
    }
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await this.prisma.users.create({
      data: {
        email,
        password: hashedPassword,
        name,
        ...rest,
      },
    });
    const { password: _pass, ...userWithoutPassword } = newUser;
    return userWithoutPassword;
  }

  async createAdmin(body: CreateAdmin): Promise<any> {
    const { email, name, password, roleId, branchId } = body;
    const user = await UserHelper.finUserByEmail(this.prisma, email);
    if (user) {
      throw new BadRequestException('Email đã tồn tại');
    }
    if (!name) {
      throw new BadRequestException('Tên không được để trống');
    }
    if (!roleId) {
      throw new BadRequestException('Vui lòng chọn quyền cho tài khoản');
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newAdmin = await this.prisma.users.create({
      data: {
        email,
        name,
        password: hashedPassword,
        userRoles: {
          create: {
            roleId: roleId,
            branchId: branchId,
          },
        },
      },
    });
    const { password: _p, ...admin } = newAdmin;
    return admin;
  }

  async signIn(email: string, pass: string): Promise<any> {
    if (!email || !pass) {
      throw new BadRequestException(
        'Vui lòng nhập đầy đủ thông tin tài khoản và mật khấu',
      );
    }
    const user = await UserHelper.finUserByEmail(this.prisma, email);
    if (!user || !(await bcrypt.compare(pass, user.password))) {
      throw new UnauthorizedException();
    }
    const { password, ...userInfo } = user;
    const payload = { sub: user.id, username: user.email };
    const token = await this.jwtService.signAsync(payload);
    return {
      access_token: token,
      users: userInfo,
    };
  }
}
