import { Component, OnInit } from '@angular/core';
import { RankingPeopleProxy } from 'src/app/models/proxys/ranking-people';

@Component({
  selector: 'app-ranking-people',
  templateUrl: './ranking-people.component.html',
  styleUrls: ['./ranking-people.component.scss'],
})
export class RankingPeopleComponent  implements OnInit {

  public rankingPeopleList: RankingPeopleProxy[] = [
  {
    name: 'Bruna Antunes',
    user: '@brunaantunes',
  }
  ];

  ngOnInit() {}

}
