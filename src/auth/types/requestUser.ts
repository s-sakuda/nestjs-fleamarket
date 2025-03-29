import { UserStatus } from '@prisma/client';

export type RequestUser = {
  id: string;
  username: string;
  status: UserStatus;
};
