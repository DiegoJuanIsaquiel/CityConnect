import { Component, OnInit } from '@angular/core';
import { PostProxy } from 'src/app/models/proxys/post.proxy';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent  implements OnInit {

  //#region Public Properties

  public postList: PostProxy[] = [
    {
      id: 1,
      owner: 'Mateus Dias',
      imageUrl: 'https://img.olhardigital.com.br/wp-content/uploads/2020/02/20200226021016.jpg',
      description: 'Um descaso imenso com o cidadão sorocabano. Estava caminhando próximo a Praça do Canhão, quando me deparei com essa cena assustadora. Precisamos arrumar isso @Prefeitura, cuidar das nossas maritacas que pousam nesses fios. #SOSMaritacas #BrasilVerde&Amarelo',
    },
    {
      id: 2,
      owner: 'Diego Juan Isaquiel',
      imageUrl: 'https://img.nsctotal.com.br/wp-content/uploads/2022/10/foto-onibus-lotado-blumenau-guilherme-de-morais_1-1.jpg',
      description: '6h34 da manhã. Busão lotado e o prefeito tá onde? Gravando vídeo pra instagram. Até quando isso @RodrigoManga? Já está na hora de pensar em medidas pra resolver o problema da lotação dos onibus na cidade,',
    }
  ];

  //#endregion

  ngOnInit() {}

}
