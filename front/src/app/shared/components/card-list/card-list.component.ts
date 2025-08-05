import { Component, OnInit, Input } from '@angular/core';
import { Topic } from '../../models/topic.model';

@Component({
  selector: 'app-card-list',
  templateUrl: './card-list.component.html',
  styleUrls: ['./card-list.component.scss'],
})
export class CardListComponent implements OnInit {
  @Input() articles: any[] = []; // TO DO: ❗ CHANGE any
  @Input() topics: Topic[] = [];

  constructor() {}

  ngOnInit(): void {}
}
