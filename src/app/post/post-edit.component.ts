import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { PostService } from './post.service';
import { Post }        from './post';

@Component({
  selector: 'post-edit',
  templateUrl: './post-edit.component.html',
  styleUrls: ['./post-edit.component.css'],
})
export class PostEditComponent implements OnInit {
  post: Post;
  errorMessage: string;

  constructor(
    private postService: PostService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  update(): void {
    var body = this.post.body.trim();
    if (!body) { return; }
    this.route
        .params
        .switchMap(
          (params: Params) => this.postService.update(+params['id'], body)
        )
        .subscribe(
          post =>  this.router.navigate(['/posts', post.id]),
          error => this.errorMessage = <any>error
        );
  }

  ngOnInit(): void {

    this.route
        .params
        .switchMap(
          (params: Params) => this.postService.getPost(+params['id'])
        )
        .subscribe(
          post => this.post = post,
          error => this.errorMessage = <any>error
        );
  }

}
