import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsDateString,
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';
import { Gender } from 'src/common/enums/gender.enum';

export class RegisterDto {
  @ApiProperty()
  @IsEmail({}, { message: 'Email không hợp lệ' })
  email: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  password: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiPropertyOptional({ example: '09888888' })
  @IsOptional()
  @IsString()
  phone: string;

  @ApiProperty({ enum: Gender })
  @IsOptional()
  @IsString()
  gender: Gender;

  @ApiPropertyOptional({ type: String, format: 'date-time' })
  @IsDateString()
  birthday?: string;

  @ApiPropertyOptional()
  @IsString()
  address: string;
}
