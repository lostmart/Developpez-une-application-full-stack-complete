import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Topic } from '../../models/topic.model';
import { Subscription } from '../../models/subscription.model';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
})
export class CardComponent implements OnInit {
  @Input() article: any; // you can strongly type this later
  @Input() topic!: Topic;
  @Input() subscribedTopic!: Subscription;
  @Output() subscribe = new EventEmitter<number>();
  @Output() unsubscribe = new EventEmitter<number>();

  constructor() {}

  onSubscribeClick() {
    this.subscribe.emit(this.topic.id);
  }

  onUnsubscribeClick() {
    if (this.subscribedTopic) this.unsubscribe.emit(this.subscribedTopic.id);
  }

  ngOnInit(): void {}
}
