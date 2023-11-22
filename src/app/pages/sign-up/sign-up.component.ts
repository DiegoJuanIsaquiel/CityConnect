import { Component, OnInit } from '@angular/core';
import { SignUpStepsEnum } from 'src/app/models/enums/sign-up-steps.enum';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BuscaCepService } from 'src/app/services/busca-cep/busca-cep.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss'],
})

export class SignUpComponent {

  //#region Constructor

  constructor(
    public readonly formBuilder: FormBuilder,
    public readonly buscaCepService: BuscaCepService,
    private readonly router: Router,
  ) {
    this.formGroup = formBuilder.group({
      name: ['', Validators.required],
      birthday: ['', Validators.required],
      cpf: ['', Validators.required],
      email: ['', Validators.required],
      phone: ['', Validators.required],
      cep: ['', Validators.required],
      street: ['', Validators.required],
      streetNumber: ['', Validators.required],
      city: ['', Validators.required]
    });
  }

  //#endregion

  //#region Public Properties

  public stepEnum: typeof SignUpStepsEnum = SignUpStepsEnum;

  public currentStep: SignUpStepsEnum = SignUpStepsEnum.PERSONAL_DATA;

  public formGroup!: FormGroup;

  public isPageValid: boolean = false;

  //#endregion

  //#region Public Methods

  public setCurrentStep(): void {
    if(this.currentStep !== this.stepEnum.CONFIRM_DATA)
      this.currentStep++;
  }

  public onSubmit(): void {
    // Completar quando a api estiver pronta
  }

  public checkIfPageIsValid(): void {
    this.isPageValid = false;

    if(this.currentStep == this.stepEnum.PERSONAL_DATA){
      if (
        this.formGroup.value.name !== '' &&
        this.formGroup.value.cpf !== '' &&
        this.formGroup.value.birthday !== ''
      ){
        this.isPageValid = true;
      }
    }
    
    if(this.currentStep == this.stepEnum.CONTACT){
      if (
        this.formGroup.value.name !== '' &&
        this.formGroup.value.cpf !== '' &&
        this.formGroup.value.birthday !== '' &&
        this.formGroup.value.email !== '' &&
        this.formGroup.value.phone !== ''
      ){
        this.isPageValid = true;
      }
    }

    if(this.currentStep == this.stepEnum.ADDRESS){
      if (
        this.formGroup.value.name !== '' &&
        this.formGroup.value.cpf !== '' &&
        this.formGroup.value.birthday !== '' &&
        this.formGroup.value.email !== '' &&
        this.formGroup.value.phone !== '' &&
        this.formGroup.value.cep !== '' &&
        this.formGroup.value.street !== '' &&
        this.formGroup.value.streetNumber !== '' &&
        this.formGroup.value.city !== ''
      ){
        this.isPageValid = true;
      }
    }

    if(this.currentStep == this.stepEnum.CONFIRM_DATA){
      if (
        this.formGroup.value.name !== '' &&
        this.formGroup.value.cpf !== '' &&
        this.formGroup.value.birthday !== '' &&
        this.formGroup.value.email !== '' &&
        this.formGroup.value.phone !== '' &&
        this.formGroup.value.cep !== '' &&
        this.formGroup.value.street !== '' &&
        this.formGroup.value.streetNumber !== '' &&
        this.formGroup.value.city !== ''
      ){
        this.isPageValid = true;
      }
    }
  }

  public convertToDate(stringDate: EventTarget | null): void {
    let date = new Date(new Date((stringDate as HTMLInputElement).value).toLocaleDateString('pt-BR', {timeZone: 'UTC'}));
    this.formGroup.controls['birthday'].setValue(date);
  }

  public async setAddress(cep: EventTarget | null): Promise<void> {
    let cepNumber = (cep as HTMLInputElement).value.replace("-","");

    const [success, error] = await this.buscaCepService.getAddress(cepNumber);

    if (!success)
      return

    this.formGroup.controls['street'].setValue(success.logradouro);
    this.formGroup.controls['city'].setValue(success.localidade + ', ' + success.uf);
  }

  public async goBack(): Promise<void> {
    await this.router.navigate(['/login/']);
  }

  //#endregion
}
