import { applyDecorators } from '@nestjs/common';
import { ApiProperty, ApiPropertyOptions } from '@nestjs/swagger';
import { IsEmail, IsString, ValidationOptions } from 'class-validator';

export function ApiEmail(
  apiOptions?: ApiPropertyOptions,
  validationOptions?: ValidationOptions,
) {
  return applyDecorators(
    ApiProperty({ type: String, format: 'email', ...apiOptions }),
    IsEmail(undefined, validationOptions),
  );
}

export function ApiString(options?: ApiPropertyOptions & ValidationOptions) {
  return applyDecorators(
    ApiProperty({ type: String, ...options }),
    IsString(options),
  );
}
