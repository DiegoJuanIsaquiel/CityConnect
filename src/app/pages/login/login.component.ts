import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {

  //#region Constructor

  constructor(
    private readonly formBuilder: FormBuilder,
  ) {
    this.formGroup = formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  //#endregion

  //#region Public Properties

  public formGroup!: FormGroup;

  //#endregion

  //#region Public Methods

  public onSubmit(): void {


    localStorage.setItem('ACCESS_TOKEN_PROXY_KEY', '123')
  }

  //#endregion
}
