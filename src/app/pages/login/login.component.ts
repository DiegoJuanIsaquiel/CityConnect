import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {

  //#region Constructor

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly router: Router,
    private readonly http: HttpClient,
    private readonly toast: ToastController
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

  public async onSubmit(): Promise<void> {
    if(!this.formGroup.valid)
      return;

    this.getRefreshToken();

    const header = new HttpHeaders()
      .set('usuario', '@' + this.formGroup.controls['username'].value)
      .set('senha', this.formGroup.controls['password'].value)

    await this.http.get(`${environment.api.baseUrl}${environment.api.usuario.get}`, {headers: header})
      .subscribe(async (response: any) => {
        if (!response.senhaValida){
          const toast = this.toast.create({
            message: 'Usuário não foi encontrado. Tente novamente!',
            position: 'top',
            duration: 5000,
          });
      
          return (await toast).present();
        }

        const toast = this.toast.create({
          message: 'Usuário autenticado com sucesso!',
          position: 'top',
          duration: 5000,
        });
    
        (await toast).present();

        localStorage.setItem(environment.keys.user, JSON.stringify(response.dadosUsuario))

        return this.router.navigate(['/main/home']);

      });
    

  }

  public async getRefreshToken(): Promise<void> {
      const body = new HttpParams()
      .set('grant_type', 'refresh_token')
      .set('client_id', '3MVG9VTfpJmxg1yga5iZP6UgJBC5vM64b8zfjqMCXoi.uHu6mmnSTb0eEKyNKtCfefFhwejxTjNRlth85gQlV')
      .set('client_secret', '10B4ACA578F7C01A0ED0F6E10FA1DF4874C1DFA5FA67C2A98FC2B9A0C5251035')
      .set('refresh_token', '5Aep861Hcw0p_.s1fnlCs484bvR9pEA6hSYLDVlaEkE_zv297wyJeBrfGWbTuLEy6ccgZr7SGm0pff_eroF5W.0')

    await this.http.post(environment.login,
      body.toString(), {
      headers: new HttpHeaders()
        .set('Content-Type', 'application/x-www-form-urlencoded')
    }).subscribe((response: any) => {
      
      localStorage.setItem(environment.keys.token, response.access_token)
    });
  }

  //#endregion
}
