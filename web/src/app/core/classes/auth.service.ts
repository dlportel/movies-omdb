import {IUser} from '../models/user.model';

export interface IAuthService {
  login(data: IUser): IUser;

  updateUser(data: IUser): IUser;

  keepLogin(): { success: boolean, data?: IUser };

  logout(): void;

  getAuthToken(): string;
}

export abstract class AuthService implements IAuthService {
  abstract keepLogin(): { success: boolean, data?: IUser };

  abstract login(data: IUser): IUser;

  abstract updateUser(data: IUser): IUser;

  abstract logout(): void;

  abstract getAuthToken(): string;
}
