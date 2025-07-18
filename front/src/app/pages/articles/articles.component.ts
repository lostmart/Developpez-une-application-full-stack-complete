import { Component } from '@angular/core';

@Component({
  selector: 'app-articles',
  templateUrl: './articles.component.html',
  styleUrls: ['./articles.component.scss'],
})
export class ArticlesComponent {
  articles = [
    { id: 1, subscribed: false },
    { id: 2, subscribed: false },
    { id: 3, subscribed: true },
    { id: 4, subscribed: true },
    { id: 5, subscribed: false },
    { id: 6, subscribed: false },
  ];
}
