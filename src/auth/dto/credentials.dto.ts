import { IsEmail, IsStrongPassword } from 'class-validator';

export class CredentialsDTO {
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
}
