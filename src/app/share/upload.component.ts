import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { Observable } from 'rxjs/Rx';

@Component({
  selector: 'file-upload',
  template: '<input type="file" [multiple]="multiple" #fileInput>'
})
export class FileUploadComponent {
  @Input() multiple: boolean = false;
  @ViewChild('fileInput') inputEl: ElementRef;
  private S3_BUCKET = 'yashiro-image-store';

  constructor(private http: Http, private el: ElementRef) {}

  upload() {
    let inputEl: HTMLInputElement = this.inputEl.nativeElement;
    let fileCount: number = inputEl.files.length;
    if (fileCount < 1) {
      console.log('file is none');
      return ;
    }
    for (let i = 0; i < fileCount; i++) {
      let item = inputEl.files.item(i);
      this.issue(item.size, item.type)
          .switchMap(data => {
            let formData = new FormData();
            formData.append('key', data.key);
            formData.append('AWSAccessKeyId', data.AWSAccessKeyId);
            formData.append('acl', data.acl);
            formData.append('policy', data.policy);
            formData.append('signature', data.signature);
            formData.append('Content-Type', data['Content-Type']);
            formData.append('file', item);
            return this.transmit(formData);
          })
          .subscribe(
            res => console.log(res),
            error => console.log(error)
          );
    }
  }
  
  // AWS S3にデータ送信
  private transmit(formData: any): Observable<any> {
    const url = 'http://' + this.S3_BUCKET + '.s3.amazonaws.com/';
    return this.http.post(url, formData)
                    .map( (res: Response) => console.log(res))
                    .catch(this.handleError);
  }

  // AWS S3にデータ送信するためのtokenを取得
  private issue(csize: number, ctype: string): Observable<any> {
    const url = 'http://localhost:3000/api/issue_upload_token';
    return this.http.post(url, {
                      csize: csize,
                      ctype: ctype
                    })
                    .map( (res: Response) => <any>res.json())
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