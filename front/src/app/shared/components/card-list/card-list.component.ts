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
  @Input() subTopics: Topic[] = [];
  @Input() subscribedTopics: Subscription[] = [];

  @Output() subscribe = new EventEmitter<number>();
  @Output() unsubscribe = new EventEmitter<number>();

  private topicNameToId = new Map<string, number>();

  constructor() {}

  onSubscribe(topicId: number) {
    console.log('topicId', topicId);
    this.subscribe.emit(topicId);
  }

  private rebuildIndex() {
    this.topicNameToId.clear();
    for (const t of this.topics || []) {
      if (t?.name) this.topicNameToId.set(t.name, t.id);
    }
  }

  onUnsubscribeById(topicId: number) {
    console.log('unsubscribesss', topicId);
    if (topicId != null) this.unsubscribe.emit(topicId);
    else console.warn('Topic not found for number', topicId);
  }

  ngOnInit(): void {
    this.rebuildIndex();
  }
}
