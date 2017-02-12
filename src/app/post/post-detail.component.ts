import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { PostService } from './post.service';
import { Post }        from './post';

@Component({
  selector: 'post-detail',
  templateUrl: './post-detail.component.html',
  styleUrls: ['./post-detail.component.css'],
})
export class PostDetailComponent implements OnInit {
  post: Post;
  errorMessage: string;

  constructor(
    private postService: PostService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.params
              .switchMap(
                (params: Params) => this.postService.getPost(+params['id'])
              )
              .subscribe(
                post => this.post = post,
                error => this.errorMessage = <any>error
              );
  }

}
