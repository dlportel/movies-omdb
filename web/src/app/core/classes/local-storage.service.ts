export interface ILocalStorageService {
  exist(name: string): boolean;

  getItem(name: string): string;

  setItem(name: string, value: string): void;

  removeItem(name: string): void;

  clear(): void;
}
