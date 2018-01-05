import { Component, OnInit, Output, EventEmitter } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import { Subject }    from 'rxjs/Subject';
import { of }         from 'rxjs/observable/of';

import {
   debounceTime, distinctUntilChanged, switchMap
 } from 'rxjs/operators';

import { RedditService } from '../reddit.service';

@Component({
  selector: 'app-user-input',
  templateUrl: './user-input.component.html',
  styleUrls: [ './user-input.component.css' ]
})
export class UserInputComponent implements OnInit {
  public subreddit = '';
  public selectedItem;
  @Output() public updateSub = new EventEmitter<any>();
  @Output() public updateLim = new EventEmitter<any>();

  constructor(private postService: RedditService) {}

  updateSubreddit() {
    this.postService.updateSubreddit(this.subreddit);
    this.updateSub.emit(this.subreddit);
  }

  updateLimit() {
    this.postService.updateLimit(this.selectedItem);
    this.updateLim.emit(this.selectedItem);
  }

  ngOnInit(): void {
  }
}
