import {ChangeDetectionStrategy, ChangeDetectorRef, Component, Inject, OnInit} from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MatDialogRef} from '@angular/material/dialog';
import {MatSnackBar} from '@angular/material/snack-bar';
import {IUserNgRxService} from '../../../store/interfaces/user-ng-rx.service';
import {NGRX_USER_SERVICE} from '../../../injectors';

@Component({
  selector: 'app-login-modal',
  templateUrl: './login-modal.component.html',
  styleUrls: ['./login-modal.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginModalComponent implements OnInit {
  public loginForm: FormGroup;
  public showPassword1: boolean;

  constructor(private _fb: FormBuilder,
              private _dialogRef: MatDialogRef<LoginModalComponent>,
              private _snackBar: MatSnackBar,
              private _cdr: ChangeDetectorRef,
              @Inject(NGRX_USER_SERVICE) private _userService: IUserNgRxService) {
  }

  get nameControl(): AbstractControl {
    return this.loginForm.get('name');
  }

  get passwordControl(): AbstractControl {
    return this.loginForm.get('password');
  }

  ngOnInit(): void {
    this.loginForm = this._toFormGroup();
  }

  public submitData() {
    if (!this.loginForm.valid) {
      return;
    }
    this._userService.login({name: this.nameControl.value}).subscribe(data => {
      this._closeModal();
      this._snackBar.open('Bienvenido', null, {
        duration: 4000,
      });
    });
  }

  private _closeModal() {
    this._dialogRef.close();
  }

  private _toFormGroup(): FormGroup {
    return this._fb.group({
      name: [null, [Validators.required]],
      password: [null, [Validators.required]],
    });
  }

}
