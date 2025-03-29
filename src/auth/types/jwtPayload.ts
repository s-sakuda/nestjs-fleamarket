import { UserStatus } from '@prisma/client';

export type JwtPayload = {
  /**
   * ユーザーの識別子
   */
  sub: string;
  /**
   * ユーザー名
   */
  username: string;
  /**
   * ユーザーのステータス
   */
  status: UserStatus;
};
