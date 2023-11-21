import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable, Subscriber } from 'rxjs';
import { UserProxy } from 'src/app/models/proxys/user.proxy';
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
    private readonly http: HttpAsyncService
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

  //#endregion

  //#region Public Methods

  public async getUser(): Promise<void> {
    const { error, success } = await this.http.get<any>(`${environment.api.baseUrl}${environment.api.usuario.get}`);

    if(error || !success)
      return

    this.currentUser = success.dadosUsuario.Nome;
    this.currentUserUsername = success.dadosUsuario.Usuario;
    this.currentUserImage = success.dadosUsuario.fotoPerfil;
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

  public readFile(file: File, subscriber: Subscriber<any>){
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

  //#endregion

}
