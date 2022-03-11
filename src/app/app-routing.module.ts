import { PostDetailsComponent } from './components/post-details/post-details.component';
import { PostsListComponent } from './components/posts-list/posts-list.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
    { path: 'posts', component: PostsListComponent },
    { path: 'post/:id', component: PostDetailsComponent },
    { path: '**', redirectTo: '/posts' }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})

export class AppRoutingModule { }