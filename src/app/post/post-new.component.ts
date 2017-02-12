import { Component, OnInit } from '@angular/core';
import { Router }            from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { PostService } from './post.service';
import { Post }        from './post';

@Component({
  selector: 'post-new',
  templateUrl: './post-new.component.html',
  styleUrls: ['./post-new.component.css'],
})
export class PostNewComponent implements OnInit {
  post: Post;
  errorMessage: string;
  body = "";

  constructor(
    private postService: PostService,
    private router: Router
  ) {}

  create(): void {
    var body = this.body.trim();
    if (!body) { return; }
    this.postService
        .create(body)
        .subscribe(
          post =>  this.router.navigate(['/posts', post.id]),
          error => this.errorMessage = <any>error
        );
  }

  ngOnInit(): void {
  }

}
