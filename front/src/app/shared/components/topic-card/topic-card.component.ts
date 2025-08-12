import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { Topic } from '../../models/topic.model';

@Component({
  selector: 'app-topic-card',
  templateUrl: './topic-card.component.html',
  styleUrls: ['./topic-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TopicCardComponent {
  @Input() topic!: Topic; // provided by parent
  @Output() subscribe = new EventEmitter<number>();
  @Output() unsubscribe = new EventEmitter<number>();

  onSubscribeClick() {
    this.subscribe.emit(this.topic.id);
  }
}
