import { AppRoutingModule } from './app-routing.module';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http'

import { AppComponent } from './app.component';
import { PostsListComponent } from './components/posts-list/posts-list.component';
import { PostItemComponent } from './components/post-item/post-item.component';
import { PostDetailsComponent } from './components/post-details/post-details.component';
import { CommentItemComponent } from './components/comment-item/comment-item.component';
import { PaginationBarComponent } from './components/pagination-bar/pagination-bar.component';
import { FormsModule } from '@angular/forms';
import { SpinnerComponent } from './components/spinner/spinner.component';

@NgModule({
    declarations: [
        AppComponent,
        PostsListComponent,
        PostItemComponent,
        PostDetailsComponent,
        CommentItemComponent,
        PaginationBarComponent,
        SpinnerComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        HttpClientModule,
        FormsModule
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule { }
