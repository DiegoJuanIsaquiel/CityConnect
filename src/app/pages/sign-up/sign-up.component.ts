import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { SignUpStepsEnum } from 'src/app/models/enums/sign-up-steps.enum';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss'],
})
export class SignUpComponent implements OnInit {
  constructor() {}

  //#region Public Properties

  public stepEnum: typeof SignUpStepsEnum = SignUpStepsEnum;

  public currentStep: SignUpStepsEnum = SignUpStepsEnum.PERSONAL_DATA;

  public formGrup!: FormGroup;

  //#endregion

  ngOnInit() {}

  //#region Public Methods

  public setCurrentStep(): void {
    if(this.currentStep !== this.stepEnum.CONFIRM_DATA)
      this.currentStep++

  }

  //#endregion
}
