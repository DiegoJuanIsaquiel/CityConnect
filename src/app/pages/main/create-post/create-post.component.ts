import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { Observable, Subscriber } from 'rxjs';
import { HttpAsyncService } from 'src/app/modules/http-async/services/http-async.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.scss'],
})
export class CreatePostComponent implements OnInit {

  //#region Constructor

  constructor(
    private readonly router: Router,
    private readonly formBuilder: FormBuilder,
    private readonly http: HttpAsyncService,
    private readonly toast: ToastController,
  ) {
    this.formGroup = formBuilder.group({
      Usuario__c: ['', Validators.required],
      Descricao__c: ['', Validators.required],
      RecordTypeId: ['012Hu000000z814IAA', Validators.required],
      imagemBase64__c: ['', Validators.required]
    })

  }

  //#endregion

  //#region Lifecycle Methods

  public async ngOnInit(): Promise<void> {
    await this.getUser();
  }

  //#endregion

  //#region public properties

  public formGroup!: FormGroup;

  public currentUser: string = 'Usuário não encontrado!';

  public currentUserUsername: string = 'Usuário não encontrado!';

  public currentUserImage: string = '../../../../assets/no-image.svg';

  public isLoading: boolean = true;

  //#endregion

  //#region Public Methods

  public async getUser(): Promise<void> {
    const currentUser = JSON.parse(localStorage.getItem(environment.keys.user)!)[0];

    if (!currentUser) {
      const toast = this.toast.create({
        message: 'Ocorreu um erro ao tentar obter o criador desta publicação. Por favor, tente novamente mais tarde',
        position: 'top',
        duration: 5000,
      });

      return (await toast).present();
    }
    
    this.currentUser = currentUser.Nome;
    this.currentUserUsername = currentUser.Usuario;
    
    if(currentUser.fotoPerfil)
      this.currentUserImage = currentUser.fotoPerfil;

    this.formGroup.controls['Usuario__c'].setValue('a00Hu0000149jEEIAY');
  }

  public async navigateTo(url: string): Promise<void> {
    await this.router.navigate(['/main/' + url]);
  }

  public async uploadImage(event: Event): Promise<void> {
    const target = event.target as HTMLInputElement;

    const file: File = (target.files as FileList)[0];

    this.convertToBase64(file);
  }

  public convertToBase64(file: File): void {
    const observable = new Observable((subscriber: Subscriber<any>) => {
      this.readFile(file, subscriber);
    });

    observable.subscribe((d: string) => {
      this.formGroup.controls['imagemBase64__c'].setValue(d);
    })
  }

  public readFile(file: File, subscriber: Subscriber<any>) {
    const fileReader = new FileReader();

    fileReader.readAsDataURL(file);

    fileReader.onload = () => {
      subscriber.next(fileReader.result);
      subscriber.complete();
    }

    fileReader.onerror = () => {
      subscriber.error();
      subscriber.complete();
    }
  }

  public removeImage(): void {
    this.formGroup.controls['imagemBase64__c'].setValue('');
  }

  public async onSubmit(): Promise<void> {
    if(!this.formGroup.valid)
      return

    const { error, success } = await this.http.post<any>(`${environment.api.baseUrl}${environment.api.postagem.create}`, 
      {
        publicacao: {
          Usuario__c: this.formGroup.controls['Usuario__c'].value,
          Descricao__c: this.formGroup.controls['Descricao__c'].value,
          RecordTypeId: this.formGroup.controls['RecordTypeId'].value,
          imagemBase64__c: this.formGroup.controls['imagemBase64__c'].value
        }
      }
    );

    if (error || !success || success.errorMessage !== null) {
      const toast = this.toast.create({
        message: 'Ocorreu um erro ao tentar criar publicação. Por favor, tente novamente mais tarde',
        position: 'top',
        duration: 5000,
      });

      this.router.navigate(['/main/home']);
      return (await toast).present();
    }

    const toast = this.toast.create({
      message: 'Postagem publicada com sucesso!',
      position: 'top',
      duration: 5000,
    });

    (await toast).present();

    this.router.navigate(['/main/home']);
      
  }

  //#endregion

}
