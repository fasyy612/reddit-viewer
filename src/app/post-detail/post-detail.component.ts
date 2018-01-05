import { ViewChild, ElementRef, Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { Post } from '../post';
import { Comment } from '../comment';
import { RedditService }  from '../reddit.service';

@Component({
  selector: 'app-post-detail',
  templateUrl: './post-detail.component.html',
  styleUrls: [ './post-detail.component.css' ]
})

export class PostDetailComponent implements OnInit {
  @Input() post: Post;
  htmlContent: string;

  comments: Comment[];

  constructor(
    private route: ActivatedRoute,
    private heroService: RedditService,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.getPost();
    this.getComments();
  }

  getPost(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.post = this.heroService.getPost(id);
    this.htmlContent = this.post.selftext;
  }

  getComments(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.heroService.getComments(id)
    .subscribe(comments => this.comments = comments);
  }

  errorHandler(event) {
    console.debug(event);
    event.target.src = "assets/img/text.png";
  }

  goBack(): void {
    this.location.back();
  }
}