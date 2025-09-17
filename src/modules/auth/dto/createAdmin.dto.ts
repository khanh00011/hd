import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsEmail, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateAdmin {
  @ApiProperty()
  @IsEmail()
  email: string;

  @ApiProperty()
  @IsString()
  password: string;

  @ApiProperty()
  @IsString()
  name: string;

  @ApiProperty({ example: 1 })
  @IsNumber()
  roleId: number;

  @ApiPropertyOptional()
  @IsNumber()
  @IsOptional()
  branchId: number;
}
