import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, BehaviorSubject, firstValueFrom, map } from 'rxjs';

import { User } from './../interfaces/user.model';
import { Comment } from './../interfaces/comment.model';
import { DetailedPost } from '../interfaces/detailed-post.model';
import { Post } from '../interfaces/post.model';

const JSONPHURL = 'https://jsonplaceholder.typicode.com';

@Injectable({
    providedIn: 'root'
})
export class PostService {

    selectedItem: BehaviorSubject<DetailedPost | null> = new BehaviorSubject<DetailedPost | null>(null);

    constructor(private http: HttpClient) { }

    setSelectedItem(newSelectedItem: DetailedPost) {
        this.selectedItem.next(newSelectedItem);
    }

    getSelectedItem(): Observable<DetailedPost | null> {
        return this.selectedItem.asObservable();
    }

    fetchCommentsByPostId(postId: number): Promise<Comment[]> {
        return firstValueFrom(this.http.get(JSONPHURL + '/posts/' + postId + '/comments').pipe(map(item => item as Comment[])));
    }

    fetchPosts(): Observable<Post[]> {
        return this.http.get(JSONPHURL + '/posts').pipe(map(item => item as Post[]));
    }

    fetchComments(): Observable<Comment[]> {
        return this.http.get(JSONPHURL + '/comments').pipe(map(item => item as Comment[]));
    }

    fetchUsers(): Observable<User[]> {
        return this.http.get(JSONPHURL + '/users').pipe(map(item => item as User[]));
    }
}
