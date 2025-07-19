import { Component } from '@angular/core';
import { Article } from 'src/app/shared/models/article.model';

@Component({
  selector: 'app-articles',
  templateUrl: './articles.component.html',
  styleUrls: ['./articles.component.scss'],
})
export class ArticlesComponent {
  articles: Article[] = [
    {
      id: 1,
      title: 'Title 1',
      date: 'Date 1',
      author: 'Author 1',
      content: 'some content right here right now !!!',
    },
    {
      id: 2,
      title: 'Title 2',
      date: 'Date 2',
      author: 'Author 2',
      content: 'some content right here right now !!!',
    },
    {
      id: 3,
      title: 'Title 3',
      date: 'Date 3',
      author: 'Author 3',
      content: 'some content right here right now !!!',
    },
    {
      id: 4,
      title: 'Title 4',
      date: 'Date 4',
      author: 'Author 4',
      content: 'some content right here right now !!!',
    },
    {
      id: 5,
      title: 'Title 5',
      date: 'Date 5',
      author: 'Author 5',
      content: 'some content right here right now !!!',
    },
  ];
}
