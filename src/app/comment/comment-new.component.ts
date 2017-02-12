import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { CommentService } from './comment.service';
import { Comment }        from './comment';
import { Post }        from './../post/post';

@Component({
  selector: 'comment-new',
  templateUrl: './comment-new.component.html',
  styleUrls: ['./comment-new.component.css'],
})
export class CommentNewComponent implements OnInit {
  @Input() post: Post;
  comment: Comment;
  errorMessage: string;
  body = "";

  constructor(
    private commentService: CommentService,
    private router: Router,
  ) {}

  create(): void {
    var body = this.body.trim();
    if (!body) { return; }
    this.commentService
        .create(body, this.post.id)
        .subscribe(
          comment =>  this.router.navigate(['/posts', this.post.id]),
          error => this.errorMessage = <any>error
        );
  }

  ngOnInit(): void {
  }

}
