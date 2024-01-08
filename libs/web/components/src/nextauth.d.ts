/* eslint-disable @typescript-eslint/no-empty-interface */
import { DefaultSession } from "next-auth";
import { TUser } from "@uninus/entities";
export * from "next-auth__augment";

declare module "next-auth" {
  interface Session extends DefaultSession {
    user: TUser;
  }
}

declare module "next-auth/jwt" {
  interface JWT extends TUser {
    accessToken: string;
    refreshToken: string;
  }
}

declare module "next-auth/core/types" {
  interface User extends Partial<TUser> {
    user?: TUser;
  }
}
