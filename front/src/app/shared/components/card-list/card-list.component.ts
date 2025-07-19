import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-card-list',
  templateUrl: './card-list.component.html',
  styleUrls: ['./card-list.component.scss'],
})
export class CardListComponent implements OnInit {
  @Input() articles: any[] = []; // TO DO: ❗ CHANGE any
  @Input() topics: any[] = []; // TO DO: ❗ CHANGE any

  constructor() {}

  ngOnInit(): void {}
}
