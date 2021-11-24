import { PostService } from './../../shared/post.service';

import { Component, OnDestroy, OnInit } from '@angular/core';
import { Post } from 'src/app/shared/interfaces';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-dashboard-page',
  templateUrl: './dashboard-page.component.html',
  styleUrls: ['./dashboard-page.component.scss'],
})
export class DashboardPageComponent implements OnInit, OnDestroy {
  posts: Post[] = [];
  postSub: Subscription;
  delSub: Subscription;
  searchStr = '';

  constructor(private postService: PostService) {}

  ngOnInit() {
    this.postSub = this.postService.getPosts().subscribe((posts) => {
      this.posts = posts;
    });
  }

  ngOnDestroy() {
    if (this.postSub) {
      this.postSub.unsubscribe();
    }
    if (this.delSub) {
      this.delSub.unsubscribe();
    }
  }

  remove(id: string) {
    this.postService.removePost(id).subscribe(() => {
      this.posts = this.posts.filter((post) => post.id !== id);
    });
  }
}
