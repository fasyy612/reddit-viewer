import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Jsonp } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { catchError, map, tap } from 'rxjs/operators';
import 'rxjs/add/operator/map';

import { Post } from './post';
import { Comment } from './comment';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class RedditService {

  private subreddit = 'denmark';
  private postURL = 'https://www.reddit.com/r/denmark.json?limit=10';
  private commentURL = '';
  private param = '';
  private posts: Post[];

  constructor(
    private http: HttpClient,
    private jsonp: Jsonp) { }

  /** GET posts with parameter from reddit API */
  getPosts (param:string): Observable<Post[]> {
    this.param = param + '&jsonp=JSONP_CALLBACK';

    return this.jsonp.get(this.postURL + this.param) 
      .map(data => {
        this.posts = [];
        let children = data.json().data.children;
        if (children) {
          for (let i=0; i<children.length; i++) {
            let post:Post = new Post();
            post.id = i;
            post.name = children[i].data.name;
            post.thumbnail = children[i].data.thumbnail;
            // reddit created date in seconds, convert to milliseconds and then date format
            post.createdDate = new Date(children[i].data.created*1000);
            post.numComments = children[i].data.num_comments;
            post.author = children[i].data.author;
            post.score = children[i].data.score;
            post.permalink = children[i].data.permalink;
            post.title = children[i].data.title;
            post.subreddit = children[i].data.subreddit_name_prefixed;
            post.selftext = children[i].data.selftext;
            this.posts.push(post);
          }
        }
        return this.posts;
      });
  }

  /** GET post by id. Will 404 if id not found */
  getPost(id: number) {
    return this.posts.find(x => x.id === id);
  }

  /** GET new posts from input subreddit */
  updateSubreddit(subreddit: string) {
    this.postURL = 'https://www.reddit.com/r/' + subreddit + '.json?limit=10'
    this.subreddit = subreddit;
  }

  /** GET new number of posts for listing */
  updateLimit(limit: number) {
    this.postURL = 'https://www.reddit.com/r/' + this.subreddit + '.json' + '?limit=' + limit;
  }

  getComments (id: number): Observable<Comment[]> {
    let post = this.getPost(id);
    this.commentURL = 'https://www.reddit.com/' + post.permalink + '.json';
    return this.jsonp.get(this.commentURL + '?jsonp=JSONP_CALLBACK') 
      .map(data => {
        let comments: Comment[] = [];
        let children = data.json()[1].data.children;
        if (children) {
          for (let i=0; i<children.length; i++) {
            let comment:Comment = new Comment();
            comment.id = i;
            comment.body = children[i].data.body;
            comment.author = children[i].data.author;
            comments.push(comment);
          }
        }
        return comments;
      });
  }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}
