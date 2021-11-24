import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Post, DbCreateRespone } from './interfaces';

@Injectable({ providedIn: 'root' })
export class PostService {
  constructor(private http: HttpClient) {}

  create(post: Post): Observable<Post> {
    return this.http.post(`${environment.dbUrl}posts.json`, post).pipe(
      map((response: DbCreateRespone) => {
        return {
          ...post,
          id: response.name,
          date: new Date(post.date),
        };
      })
    );
  }

  getPosts(): Observable<Post[]> {
    return this.http.get(`${environment.dbUrl}posts.json`).pipe(
      map((response: { [key: string]: any }) => {
        return Object.keys(response).map((key) => ({
          ...response[key],
          id: key,
          date: new Date(response[key].date),
        }));
      })
    );
  }
  removePost(id: string): Observable<void> {
    return this.http.delete<void>(`${environment.dbUrl}posts/${id}.json`);
  }
}
