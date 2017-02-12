import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthGuardService } from './auth-guard.service';

import { SigninComponent } from './authentication/signin.component';
import { SignupComponent } from './authentication/signup.component';

import { PostListComponent } from './post/post-list.component';
import { PostDetailComponent } from './post/post-detail.component';
import { PostEditComponent } from './post/post-edit.component';

const routes: Routes  = [
  { path: '', redirectTo: '/posts', pathMatch: 'full' },

  { path: 'posts',          component: PostListComponent },
  { path: 'posts/:id',      component: PostDetailComponent},
  { path: 'posts/:id/edit', component: PostEditComponent},

  { path: 'signup',         component: SignupComponent },
  { path: 'signin',         component: SigninComponent },

];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ],
})

export class AppRoutingModule {}
