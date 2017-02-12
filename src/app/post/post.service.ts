import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { Post }   from './post';

@Injectable()
export class PostService {
  private url = 'http://localhost:3000/api/posts';

  constructor(
    private http: Http
  ) {}

  getPosts(body: string): Observable<Post[]> {
    const url = `${this.url}?q=${body}`;
    return this.http.get(url)
                    .map((res: Response) => <Post[]>res.json())
                    .catch(this.handleError);
  }

  getPost(id: number): Observable<Post> {
    const url = `${this.url}/${id}`;
    return this.http.get(url)
                    .map((res: Response) => <Post>res.json())
                    .catch(this.handleError);
  }

  create(body: string): Observable<Post> {
    const url = `${this.url}`;
    return this.http.post(url,{
                      body: body
                    })
                    .map((res: Response) => <Post>res.json())
                    .catch(this.handleError);
  }

  update(id: number, body: string): Observable<Post> {
    const url = `${this.url}/${id}`;
    return this.http.put(url,{
                      body: body
                    })
                    .map((res: Response) => <Post>res.json())
                    .catch(this.handleError);
  }

  delete(id: number): Observable<Post> {
    const url = `${this.url}/${id}`;
    return this.http.delete(url)
                    .map((res: Response) => <Post>res.json())
                    .catch(this.handleError);
  }

  private handleError (error: Response | any) {
    // In a real world app, we might use a remote logging infrastructure
    console.log('Errror');
    let errMsg: string;
    if (error instanceof Response) {
      const body = error.json() || '';
      const err = body.error || JSON.stringify(body);
      errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
    } else {
      errMsg = error.message ? error.message : error.toString();
    }
    console.error(errMsg);
    return Observable.throw(errMsg);
  }

}
