import { Component, Input, OnInit } from '@angular/core';
import { ApiComment } from '../../models/comment.model';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.scss'],
})
export class CommentComponent implements OnInit {


  @Input() comment!: ApiComment;

  constructor() {}

  ngOnInit(): void {}
}
