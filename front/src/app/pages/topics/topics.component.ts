import { Component, OnInit } from '@angular/core';
import { Topic } from 'src/app/shared/models/topic.model';

@Component({
  selector: 'app-topics',
  templateUrl: './topics.component.html',
  styleUrls: ['./topics.component.scss'],
})
export class TopicsComponent implements OnInit {
  topics: Topic[] = [
    {
      id: 1,
      title: 'some stupid title',
      description: 'Description 1',
      subscribed: false,
    },
    {
      id: 2,
      title: 'some stupid title',
      description: 'Description 2',
      subscribed: true,
    },
    {
      id: 3,
      title: 'some stupid title',
      description: 'Description 3',
      subscribed: false,
    },
    {
      id: 4,
      title: 'some stupid title',
      description: 'Description 4',
      subscribed: true,
    },
    {
      id: 5,
      title: 'some stupid title',
      description: 'Description 5',
      subscribed: true,
    },
    {
      id: 6,
      title: 'some stupid title',
      description: 'Description 6',
      subscribed: false,
    },
    {
      id: 7,
      title: 'some stupid title',
      description: 'Description 7',
      subscribed: false,
    },
  ];

  ngOnInit(): void {}
}
