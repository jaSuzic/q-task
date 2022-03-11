import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

import { Comment } from './../../interfaces/comment.model';
import { DetailedPost } from './../../interfaces/detailed-post.model';
import { PostService } from './../../services/post.service';

@Component({
    selector: 'app-post-details',
    templateUrl: './post-details.component.html',
    styleUrls: ['./post-details.component.css']
})
export class PostDetailsComponent implements OnInit, OnDestroy {

    selectedPost: DetailedPost;
    sub: Subscription = new Subscription();
    postId: number;
    comments: Comment[];
    isLoading: boolean = false;

    constructor(
        private postService: PostService
    ) { }

    ngOnInit(): void {
        this.startLoading();

        this.sub.add(this.postService.getSelectedItem().subscribe(
            {
                next: selectedItem => {
                    if (selectedItem) {
                        this.selectedPost = selectedItem;
                        this.fetchComments();
                    }
                },
                error: err => {
                    console.log("There was error", err);
                    this.stopLoading();
                }
            }
        ))
    }

    fetchComments() {
        this.postService.fetchCommentsByPostId(this.selectedPost.id).then(receivedComments => {
            this.comments = receivedComments;
            this.stopLoading();
        }).catch(err => {
            console.log("There was error: ", err)
            this.stopLoading();
        })
    }

    ngOnDestroy(): void {
        this.sub.unsubscribe();
    }

    startLoading() {
        this.isLoading = true;
    }

    stopLoading() {
        this.isLoading = false;
    }

}
