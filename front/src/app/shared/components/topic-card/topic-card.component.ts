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

  onToggle(): void {
    if (!this.topic?.id && this.topic?.id !== 0) return;
    this.topic.subscribed
      ? this.unsubscribe.emit(this.topic.id)
      : this.subscribe.emit(this.topic.id);
  }
}
