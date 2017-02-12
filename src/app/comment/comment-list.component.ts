import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { CommentService } from './comment.service';
import { Comment }        from './comment';
import { Post }        from './../post/post';

@Component({
  selector: 'comment-list',
  templateUrl: './comment-list.component.html',
  styleUrls: ['./comment-list.component.css'],
})
export class CommentListComponent implements OnInit {
  @Input() post: Post;
  comments: Comment[];
  errorMessage: string;

  searchQuery: string

  constructor(
    private commentService: CommentService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.commentService
        .getComments(this.post.id)
        .subscribe(
          comments => {this.comments = comments; console.log(comments)},
          error => this.errorMessage = <any>error
        );
  }

}
