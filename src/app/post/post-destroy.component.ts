import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { PostService } from './post.service';
import { Post }        from './post';

@Component({
  selector: 'post-destroy',
  templateUrl: './post-destroy.component.html',
  styleUrls: ['./post-destroy.component.css'],
})
export class PostDestroyComponent implements OnInit {
  post: Post;
  errorMessage: string;

  constructor(
    private postService: PostService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  delete(): void {
    this.route
        .params
        .switchMap(
          (params: Params) => this.postService.delete(+params['id'])
        )
        .subscribe(
          post =>  this.router.navigate(['/posts']),
          error => this.errorMessage = <any>error
        );
  }

  ngOnInit(): void {
  }

}