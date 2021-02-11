import {Injectable, Injector} from '@angular/core';
import {Overlay, OverlayRef} from '@angular/cdk/overlay';
import {MatSnackBar} from '@angular/material/snack-bar';
import {MAT_DIALOG_DATA, MatDialog} from '@angular/material/dialog';
import {ThemePalette} from '@angular/material/core';
import {ComponentPortal, PortalInjector} from '@angular/cdk/portal';
import {LoadingComponent} from '../shared/components/loading/loading.component';
import {UtilService} from '../core/classes/utils.service';

@Injectable()
export class MaterialUtilsService extends UtilService {

  private _overlayRef: OverlayRef;

  constructor(private _dialog?: MatDialog,
              private _snackBar?: MatSnackBar,
              private _injector?: Injector,
              private _overlay?: Overlay) {
    super();
  }

  public startLoading() {
    if (!this._overlayRef) {
      this._overlayRef = this._overlay.create({
        positionStrategy: this._overlay.position().global().centerHorizontally().centerVertically(),
        hasBackdrop: true
      });
      const injectorTokens = new WeakMap();
      injectorTokens.set(MAT_DIALOG_DATA, {
        color: 'primary' as ThemePalette,
      });
      const injector = new PortalInjector(this._injector, injectorTokens);
      const componentPortal = new ComponentPortal(
        LoadingComponent,
        null,
        injector
      );
      this._overlayRef.attach(componentPortal);
    }
  }

  public endLoading() {
    this._overlayRef?.detach();
    this._overlayRef?.dispose();
    this._overlayRef = null;
  }

  public openSnackBar(message: string, duration?: number, action?: string) {
    this._snackBar.open(message, action, {
      panelClass: 'snack-bar-info',
      duration: duration ?? 4000,
    });
  }
}
