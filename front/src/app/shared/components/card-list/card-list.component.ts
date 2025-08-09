import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Topic } from '../../models/topic.model';
import { Subscription } from '../../models/subscription.model';
import { Article } from '../../models/article.model';

@Component({
  selector: 'app-card-list',
  templateUrl: './card-list.component.html',
  styleUrls: ['./card-list.component.scss'],
})
export class CardListComponent implements OnInit {
  @Input() articles: Article[] = [];
  @Input() topics: Topic[] = [];
  @Input() subscribedTopics: Subscription[] = [];

  @Output() subscribe = new EventEmitter<number>();

  constructor() {}

  onSubscribe(topicId: number) {
    console.log('topicId', topicId);
    this.subscribe.emit(topicId);
  }

  ngOnInit(): void {}
}
