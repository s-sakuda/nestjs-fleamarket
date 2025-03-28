import {
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
  Min,
} from 'class-validator';

export class CrateItemDto {
  @IsString() // 文字列であること
  @IsNotEmpty({ message: '名前は必須です。' }) // 1文字以上
  @MaxLength(40) // 40文字以内
  readonly name: string;

  @IsInt() // 整数であること
  @Min(1) // 1以上
  readonly price: number;

  @IsOptional() // 任意項目。値が null or undefinedの場合、バリデーションをスキップ
  @IsString() // 文字列であること
  @MaxLength(1000) // 1000文字以内
  readonly description?: string;
}
