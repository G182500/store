export interface IUser {
  _id: string;
  email: string;
  first_name: string;
  last_name: string;
  _password: string;
  access_token?: string;
}
