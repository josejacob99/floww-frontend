import { IUsers } from "./user.interface";

export interface AuthenticationPayload {
  accessToken: string;
  authenticated: boolean;
  user: IUsers
}

