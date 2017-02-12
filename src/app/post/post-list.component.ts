import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { PostService } from './post.service';
import { Post }        from './post';

@Component({
  selector: 'post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css'],
})
export class PostListComponent implements OnInit {
  posts: Post[];
  errorMessage: string;

  searchQuery: string

  constructor(
    private postService: PostService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  search(): void {
    if(this.searchQuery)
      this.router.navigateByUrl('/posts?q=' + this.searchQuery);
    else
      this.router.navigateByUrl('/posts');
  }

  ngOnInit(): void {
    this.route
        .queryParams
        .switchMap(
          (params: Params) => this.postService.getPosts(params['q'] || '')
        )
        .subscribe(
          posts => this.posts = posts,
          error => this.errorMessage = <any>error
        );
  }

}
