import {
  Component,
  OnInit,
  OnChanges,
  SimpleChanges,
  Input,
  Output,
  EventEmitter,
} from '@angular/core';
import { Topic } from '../../models/topic.model';
import { Subscription } from '../../models/subscription.model';
import { Article } from '../../models/article.model';

@Component({
  selector: 'app-card-list',
  templateUrl: './card-list.component.html',
  styleUrls: ['./card-list.component.scss'],
})
export class CardListComponent implements OnInit, OnChanges {
  @Input() articles: Article[] = [];
  @Input() topics: Topic[] = [];
  @Input() subscribedTopics: Subscription[] = [];

  @Output() subscribe = new EventEmitter<number>();
  @Output() unsubscribe = new EventEmitter<number>();

  private topicNameToId = new Map<string, number>();

  displayTopics: Topic[] = [];

  ngOnInit(): void {
    this.rebuildIndex();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['topics']) this.rebuildIndex();
  }

  onSubscribe(topicId: number) {
    this.subscribe.emit(topicId);
  }

  onUnsubscribeById(topicId: number) {
    if (topicId != null) this.unsubscribe.emit(topicId);
  }

  private rebuildIndex() {
    this.topicNameToId.clear();
    for (const t of this.topics || []) {
      if (t?.name) this.topicNameToId.set(t.name, t.id);
    }
  }

  // ✅ trackBy functions
  trackByArticleId = (_: number, a: Article) => a.id;
  trackByTopicId = (_: number, t: Topic) => t.id;
}
