import { UserStatus } from '@prisma/client';
import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsString,
  IsStrongPassword,
  MaxLength,
} from 'class-validator';

export class CreateUserDTO {
  @IsString()
  @IsNotEmpty()
  @MaxLength(20)
  name: string;

  @IsEmail()
  email: string;

  @IsStrongPassword({
    minLength: 8, // パスワードの最小文字数
    minLowercase: 1, // 小文字の最小文字数
    minUppercase: 1, // 大文字の最小文字数
    minNumbers: 1, // 数字の最小文字数
    minSymbols: 1, // 記号の最小文字数
  })
  password: string;

  @IsEnum(UserStatus)
  status: UserStatus;
}
