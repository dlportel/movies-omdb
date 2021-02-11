export interface IUtilsService {
  startLoading(): void;

  endLoading(): void;

  openSnackBar(m: string, duration?: number, action?: string): void;
}

export abstract class UtilService implements IUtilsService {
  abstract endLoading();

  abstract openSnackBar(m: string, duration?: number, action?: string);

  abstract startLoading();
}

