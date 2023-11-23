import { Component, OnInit } from '@angular/core';
import { SignUpStepsEnum } from 'src/app/models/enums/sign-up-steps.enum';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BuscaCepService } from 'src/app/services/busca-cep/busca-cep.service';
import { Router } from '@angular/router';
import { GeocodingService } from 'src/app/services/geocoding/geocoding.service';
import { HttpAsyncService } from 'src/app/modules/http-async/services/http-async.service';
import { environment } from 'src/environments/environment';
import { ToastController } from '@ionic/angular';

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
    public readonly geocodingService: GeocodingService,
    private readonly router: Router,
    private readonly http: HttpAsyncService,
    private readonly toast: ToastController
  ) {
    this.formGroup = formBuilder.group({
      Usuario__c: ['', Validators.required],
      Name: ['', Validators.required],
      Email__c: ['', Validators.required],
      Telefone__c: ['', Validators.required],
      CPF__c: ['', Validators.required],
      DataNascimento__c: ['', Validators.required],
      Localizacao__Latitude__s: ['', Validators.required],
      Localizacao__Longitude__s: ['', Validators.required],
      Estado__c: ['', Validators.required],
      Cidade__c: ['', Validators.required],
      Rua__c: ['', Validators.required],
      Bairro__c: ['', Validators.required],
      Numero__c: ['', Validators.required],
      CEP__c: ['', Validators.required],
      imagemBase64__c: [''],
      Senha__c: ['', Validators.required]
    });
  }

  //#endregion

  //#region Public Properties

  public stepEnum: typeof SignUpStepsEnum = SignUpStepsEnum;

  public currentStep: SignUpStepsEnum = SignUpStepsEnum.CREDENTIALS;

  public formGroup!: FormGroup;

  public isPageValid: boolean = false;

  public formattedDate: string = '';

  //#endregion

  //#region Public Methods

  public setCurrentStep(): void {
    if (this.currentStep !== this.stepEnum.CONFIRM_DATA)
      this.currentStep++;
  }

  public async onSubmit(): Promise<void> {

    this.formGroup.controls['DataNascimento__c'].setValue(this.formattedDate);

    const [isSuccess] = await this.geocodingService.getCoordinates(this.formGroup.value.Rua__c, this.formGroup.value.Numero__c);

    this.formGroup.controls['Localizacao__Latitude__s'].setValue(isSuccess.results[0].geometry.location.lat);
    this.formGroup.controls['Localizacao__Longitude__s'].setValue(isSuccess.results[0].geometry.location.lng);

    const { success, error } = await this.http.post<any>(`${environment.api.baseUrl}${environment.api.usuario.create}`, {
      Usuarios: {
        Usuario__c: this.formGroup.value.Usuario__c.startsWith('@') ? '@' + this.formGroup.value.Usuario__c : this.formGroup.value.Usuario__c,
        Name: this.formGroup.value.Name,
        Email__c: this.formGroup.value.Email__c,
        Telefone__c: this.formGroup.value.Telefone__c,
        CPF__c: this.formGroup.value.CPF__c,
        DataNascimento__c: this.formGroup.value.DataNascimento__c,
        Localizacao__Latitude__s: this.formGroup.value.Localizacao__Latitude__s,
        Localizacao__Longitude__s: this.formGroup.value.Localizacao__Longitude__s,
        Estado__c: this.formGroup.value.Estado__c,
        Cidade__c: this.formGroup.value.Cidade__c,
        Rua__c: this.formGroup.value.Rua__c,
        Bairro__c: this.formGroup.value.Bairro__c,
        Numero__c: this.formGroup.value.Numero__c,
        CEP__c: this.formGroup.value.CEP__c,
        Senha__c: this.formGroup.value.Senha__c
      }
    });

    if (success.errorMessage !== null) {
      const toast = this.toast.create({
        message: 'Ocorreu um erro ao tentar criar usuário. Por favor, tente novamente mais tarde',
        position: 'top',
        duration: 5000,
      });

      return (await toast).present();
    }

    this.router.navigate(['/login/']);
  }

  public checkIfPageIsValid(): void {
    this.isPageValid = false;

    if (this.currentStep == this.stepEnum.CREDENTIALS) {
      if (
        this.formGroup.value.Usuario__c !== '' &&
        this.formGroup.value.Senha__c !== ''
      ) {
        this.isPageValid = true;
      }
    }

    if (this.currentStep == this.stepEnum.PERSONAL_DATA) {
      if (
        this.formGroup.value.Usuario__c !== '' &&
        this.formGroup.value.Senha__c !== '' &&
        this.formGroup.value.Name !== '' &&
        this.formGroup.value.CPF__c !== '' &&
        this.formGroup.value.DataNascimento__c !== ''
      ) {
        this.isPageValid = true;
      }
    }

    if (this.currentStep == this.stepEnum.CONTACT) {
      if (
        this.formGroup.value.Usuario__c !== '' &&
        this.formGroup.value.Senha__c !== '' &&
        this.formGroup.value.Name !== '' &&
        this.formGroup.value.CPF__c !== '' &&
        this.formGroup.value.DataNascimento__c !== '' &&
        this.formGroup.value.Email__c !== '' &&
        this.formGroup.value.Telefone__c !== ''
      ) {
        this.isPageValid = true;
      }
    }

    if (this.currentStep == this.stepEnum.ADDRESS) {
      if (
        this.formGroup.value.Usuario__c !== '' &&
        this.formGroup.value.Senha__c !== '' &&
        this.formGroup.value.Name !== '' &&
        this.formGroup.value.CPF__c !== '' &&
        this.formGroup.value.DataNascimento__c !== '' &&
        this.formGroup.value.Email__c !== '' &&
        this.formGroup.value.Telefone__c !== '' &&
        this.formGroup.value.CEP__c !== '' &&
        this.formGroup.value.Rua__c !== '' &&
        this.formGroup.value.Numero__c !== '' &&
        this.formGroup.value.Cidade__c !== ''
      ) {
        this.isPageValid = true;
      }
    }

    if (this.currentStep == this.stepEnum.CONFIRM_DATA) {
      if (
        this.formGroup.value.Usuario__c !== '' &&
        this.formGroup.value.Senha__c !== '' &&
        this.formGroup.value.Name !== '' &&
        this.formGroup.value.CPF__c !== '' &&
        this.formGroup.value.DataNascimento__c !== '' &&
        this.formGroup.value.Email__c !== '' &&
        this.formGroup.value.Telefone__c !== '' &&
        this.formGroup.value.CEP__c !== '' &&
        this.formGroup.value.Rua__c !== '' &&
        this.formGroup.value.Numero__c !== '' &&
        this.formGroup.value.Cidade__c !== ''
      ) {
        this.isPageValid = true;
      }
    }
  }

  public convertToDate(stringDate: EventTarget | null): void {
    let date = (stringDate as HTMLInputElement).value.split('/');
    this.formattedDate = `${date[2]}-${date[1]}-${date[0]}`;
  }

  public async setAddress(cep: EventTarget | null): Promise<void> {
    let cepNumber = (cep as HTMLInputElement).value.replace("-", "");

    const [success, error] = await this.buscaCepService.getAddress(cepNumber);

    if (!success)
      return

    this.formGroup.controls['Rua__c'].setValue(success.logradouro);
    this.formGroup.controls['Bairro__c'].setValue(success.bairro);
    this.formGroup.controls['Cidade__c'].setValue(success.localidade);


    this.formGroup.controls['Estado__c'].setValue(this.convertUFtoState(success.uf));

  }

  public convertUFtoState(UF: string): string {
    switch (UF.toUpperCase()) {
      case 'AC':
        return 'Acre';
      case 'AL':
        return 'Alagoas';
      case 'AP':
        return 'Amapá';
      case 'AM':
        return 'Amazonas';
      case 'BA':
        return 'Bahia';
      case 'CE':
        return 'Ceará';
      case 'DF':
        return 'Distrito Federal';
      case 'ES':
        return 'Espírito Santo';
      case 'GO':
        return 'Goiás';
      case 'MA':
        return 'Maranhão';
      case 'MT':
        return 'Mato Grosso';
      case 'MS':
        return 'Mato Grosso do Sul';
      case 'MG':
        return 'Minas Gerais';
      case 'PA':
        return 'Pará';
      case 'PB':
        return 'Paraíba';
      case 'PR':
        return 'Paraná';
      case 'PE':
        return 'Pernambuco';
      case 'PI':
        return 'Piauí';
      case 'RJ':
        return 'Rio de Janeiro';
      case 'RN':
        return 'Rio Grande do Norte';
      case 'RS':
        return 'Rio Grande do Sul';
      case 'RO':
        return 'Rondônia';
      case 'RR':
        return 'Roraima';
      case 'SC':
        return 'Santa Catarina';
      case 'SP':
        return 'São Paulo';
      case 'SE':
        return 'Sergipe';
      case 'TO':
        return 'Tocantins';
      default:
        return 'UF não encontrada';
    }
  }

  public async goBack(): Promise<void> {
    await this.router.navigate(['/login/']);
  }

  //#endregion
}
