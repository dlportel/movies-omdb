export interface ITokenService {
  decodeToken<T>(token: string): T;

  codeToken<T>(value: T): string;
}


export abstract class TokenService implements ITokenService {
  abstract decodeToken<T>(): T;

  abstract codeToken<T>(value: T): string;
}
