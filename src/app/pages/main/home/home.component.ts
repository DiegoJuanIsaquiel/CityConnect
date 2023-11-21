import { Component, OnInit } from '@angular/core';
import { PostProxy } from 'src/app/models/proxys/post.proxy';
import { HttpAsyncService } from 'src/app/modules/http-async/services/http-async.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {

  //#region Constructor

  constructor(
    private readonly http: HttpAsyncService
  ) {}

  //#endregion

  //#region Public Properties

  public postList: PostProxy[] = [
    {
      usuarioName: 'Bruna Andressa Bragatti Antunes',
      usuarioId: 'a00Hu0000149jEEIAY',
      usuarioImagem: '',
      usuario: '@brunaantunes',
      imagem: '',
      Descricao: 'Teste Postagem',
      dataHoraPostagem: new Date(2023, 11, 8)
    }
  ];

  //#endregion

  public async ngOnInit(): Promise<void> {
    const { error, success } = await this.http.get<any>(`${environment.api.baseUrl}${environment.api.postagem.get}`);

    if (error || !success)
      return

    this.postList = success.dadosPostagens;
  }

}
