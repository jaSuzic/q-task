import { Component, OnInit, OnDestroy } from '@angular/core';
import { forkJoin, Subscription } from 'rxjs';

import { User } from './../../interfaces/user.model';
import { Comment } from './../../interfaces/comment.model';
import { DetailedPost } from './../../interfaces/detailed-post.model';
import { PostService } from './../../services/post.service';
import { Post } from './../../interfaces/post.model';

@Component({
    selector: 'app-posts-list',
    templateUrl: './posts-list.component.html',
    styleUrls: ['./posts-list.component.css']
})
export class PostsListComponent implements OnInit, OnDestroy {

    nonPaginatedPosts: Array<DetailedPost>;
    posts: Array<DetailedPost> = [];
    sub: Subscription = new Subscription();
    numberOfPages: number;
    pageSize: number = 20;
    filterValue: string = '';
    loading: boolean = false;

    constructor(private postService: PostService) { }

    ngOnInit(): void {

        this.startLoading();
        this.sub.add(forkJoin({
            posts: this.postService.fetchPosts(),
            comments: this.postService.fetchComments(),
            users: this.postService.fetchUsers()
        }).subscribe({
            next: response => {
                const { posts, comments, users } = response;
                this.nonPaginatedPosts = this.convertToDetailedPosts(posts, comments, users);
                this.numberOfPages = this.calculateNumberOfPages();
                this.paginatePosts();
                this.stopLoading();
            },
            error: err => {
                console.log("There was error: ", err);
                this.stopLoading();
            }
        }))
    }

    onItemSelect(selectedPost: DetailedPost) {
        this.postService.setSelectedItem(selectedPost)
    }

    ngOnDestroy(): void {
        this.sub.unsubscribe();
    }

    convertToDetailedPosts(posts: Post[], comments: Comment[], users: User[]): DetailedPost[] {
        let detailedPosts: any[] = [...posts];
        detailedPosts.map((post) => {
            post.user = users.find(user => post.userId === user.id);
            post.commentsNumber = comments.filter(comment => comment.postId === post.id).length;
            return post;
        })
        return detailedPosts as DetailedPost[];
    }

    onPageChange(num: number) {
        this.paginatePosts(num);
    }

    calculateNumberOfPages(filteredPosts: DetailedPost[] = this.nonPaginatedPosts) {
        return Math.ceil(filteredPosts.length / 20);
    }

    paginatePosts(page: number = 1, filteredPosts: DetailedPost[] = this.nonPaginatedPosts) {
        this.posts = filteredPosts.slice((page - 1) * this.pageSize, page * this.pageSize);
        window.scroll(0, 0);
    }

    onFilterSubmit() {
        const filteredPosts = this.nonPaginatedPosts.filter(post => {
            return post.user.name.toLowerCase().includes(this.filterValue.toLowerCase());
        })
        this.numberOfPages = this.calculateNumberOfPages(filteredPosts);
        this.paginatePosts(1, filteredPosts);
    }

    resetFilter() {
        this.filterValue = '';
        this.onFilterSubmit();
    }

    startLoading() {
        this.loading = true;
    }

    stopLoading() {
        this.loading = false;
    }
}
