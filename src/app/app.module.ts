import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { Angular2TokenService } from 'angular2-token';
import { AuthGuardService } from './auth-guard.service';

import { AppRoutingModule }  from './app-routing.module';

import { AppComponent } from './app.component';

import { SigninComponent } from './authentication/signin.component';
import { SignupComponent } from './authentication/signup.component';

import { PostListComponent } from './post/post-list.component';
import { PostNewComponent } from './post/post-new.component';
import { PostDetailComponent } from './post/post-detail.component';
import { PostEditComponent } from './post/post-edit.component';
import { PostDestroyComponent } from './post/post-destroy.component';
import { PostService } from './post/post.service';

import { CommentListComponent } from './comment/comment-list.component';
import { CommentNewComponent } from './comment/comment-new.component';
import { CommentService } from './comment/comment.service';

import { FileUploadComponent } from './share/upload.component';


@NgModule({
  declarations: [
    AppComponent,
    FileUploadComponent,
    SigninComponent,
    SignupComponent,
    PostListComponent,
    PostNewComponent,
    PostDetailComponent,
    PostEditComponent,
    PostDestroyComponent,
    CommentListComponent,
    CommentNewComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    NgbModule.forRoot(),
    AppRoutingModule,
  ],
  providers: [
    Angular2TokenService,
    AuthGuardService,
    PostService,
    CommentService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
