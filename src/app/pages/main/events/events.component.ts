import { Component, OnInit } from '@angular/core';
import { EventProxy } from 'src/app/models/proxys/event.proxy';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.scss'],
})
export class EventsComponent implements OnInit {

  //#region Public Properties

  public eventsList: EventProxy[] = [
    {
      id: 1,
      title: 'Pizza que o Caique tá devendo',
      owner: 'Pavilhão 11',
      imageUrl: 'https://s2.glbimg.com/YoyoPcrZsUISunBpFKa7kbyQOM0=/512x320/smart/e.glbimg.com/og/ed/f/original/2017/09/14/como-fazer-pizza-perfeita_07.jpg',
      date: new Date('2023-09-11 17:17:30.0'),
      address: 'Rua Facens, 23 - Sorocaba (SP)',
    },
    {
      id: 2,
      title: 'Muzzy vs Goes - A Luta histórica do Seculo',
      owner: 'Pavilhão 11',
      imageUrl: 'https://f.i.uol.com.br/fotografia/2023/07/26/169041362364c1aa3718104_1690413623_3x2_md.jpg',
      date: new Date('2023-10-15 17:17:30.0'),
      address: 'Grand Hotel Cassino - Las Vegas',
    },
    {
      id: 3,
      title: 'Entrega do Projeto de UPX',
      owner: 'Pavilhão 11',
      imageUrl: 'https://www.cruzeirofm.com.br/wp-content/uploads/2021/08/facens-sorocaba.jpg',
      date: new Date('2023-10-02 17:17:30.0'),
      address: 'Facens',
    }
  ];

  public upcomingEvents: EventProxy[] = []

  public othersEvents: EventProxy[] = []


  //#endregion

  //#region LifeCycle Methods

  public async ngOnInit(): Promise<void> {
    this.eventsList.forEach((item) => {
      let maxDate = new Date();
      maxDate.setDate(maxDate.getDate() + 30);

      if(item.date <= maxDate){
        this.upcomingEvents.push(item)
      }
      else {
        this.othersEvents.push(item)
      }

    })

    this.upcomingEvents = this.upcomingEvents.sort((b, a) => new Date(b.date).getTime() - new Date(a.date).getTime());
    this.othersEvents = this.othersEvents.sort((b, a) => new Date(b.date).getTime() - new Date(a.date).getTime());
  }

  //#endregion

}
