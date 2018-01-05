import { Component, OnInit } from '@angular/core';
import { Post } from '../post';
import { RedditService } from '../reddit.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: [ './dashboard.component.css' ]
})
export class DashboardComponent implements OnInit {
  posts: Post[];

  constructor(private heroService: RedditService) { }

  ngOnInit() {
    this.getPosts('sweden', '', '');
  }

  getPosts(subreddit: string, prev:string, next:string): void {
    this.heroService.getPosts('')
      .subscribe(posts => this.posts = posts);
  }

  getNextPosts(): void {
    let next = '&after=' + this.posts[this.posts.length - 1].name;
    this.heroService.getPosts(next)
      .subscribe(posts => {
        if (posts.length > 0) {
          this.posts = posts;
        }
      });
  }

  getPrevPosts(): void {
    let prev = '&before=' + this.posts[0].name;
    this.heroService.getPosts(prev)
      .subscribe(posts => {
        if (posts.length > 0) {
          this.posts = posts;
        }
      });
  }

  updateSubreddit(subreddit) {
    this.getPosts(subreddit, '', '');
  }

  updateLimit(limit) {
    this.getPosts('i', '', '');
  }

  errorHandler(event) {
    console.debug(event);
    event.target.src = "assets/img/text.png";
  }
}
