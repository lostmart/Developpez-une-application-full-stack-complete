import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Topic } from '../../models/topic.model';

@Component({
  selector: 'app-card-list',
  templateUrl: './card-list.component.html',
  styleUrls: ['./card-list.component.scss'],
})
export class CardListComponent implements OnInit {
  @Input() articles: any[] = []; // TO DO: ❗ CHANGE any
  @Input() topics: Topic[] = [];

  @Output() subscribe = new EventEmitter<number>();

  constructor() {}

  onSubscribe(topicId: number) {
    console.log('topicId', topicId);
    this.subscribe.emit(topicId);
  }

  ngOnInit(): void {}
}
