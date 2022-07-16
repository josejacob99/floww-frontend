export interface IUsers {
  id?: string;
  name: string;
  phone?: string;
  dob?: Date;
  address?: string;
  gender?: string;
  password?: string;
  email: string;
  photoUrl?: string;
  provider?: string;
  googleId?: string;
  tags: string[];
}
