import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Angular2TokenService } from 'angular2-token';
import { Observable } from 'rxjs/Rx';
import { Comment }   from './comment';

@Injectable()
export class CommentService {
  private url = 'http://localhost:3000/api/comments';

  constructor(
    private http: Http,
    private token_http: Angular2TokenService
  ) {}

  getComments(post_id: number): Observable<Comment[]> {
    const url = `${this.url}?post_id=${post_id}`;
    return this.http.get(url)
                    .map((res: Response) => <Comment[]>res.json())
                    .catch(this.handleError);
  }

  getComment(id: number): Observable<Comment> {
    const url = `${this.url}/${id}`;
    return this.http.get(url)
                    .map((res: Response) => <Comment>res.json())
                    .catch(this.handleError);
  }

  create(body: string, post_id: number): Observable<Comment> {
    const url = `${this.url}`;
    return this.token_http.post(url,{
                            body: body,
                            post_id: post_id
                          })
                          .map((res: Response) => <Comment>res.json())
                          .catch(this.handleError);
  }

  update(id: number, body: string): Observable<Comment> {
    const url = `${this.url}/${id}`;
    return this.http.put(url,{
                      body: body
                    })
                    .map((res: Response) => <Comment>res.json())
                    .catch(this.handleError);
  }

  delete(id: number): Observable<Comment> {
    const url = `${this.url}/${id}`;
    return this.http.delete(url)
                    .map((res: Response) => <Comment>res.json())
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
