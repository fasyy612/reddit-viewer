import { NgModule }       from '@angular/core';
import { BrowserModule }  from '@angular/platform-browser';
import { FormsModule }    from '@angular/forms';
import { HttpClientModule }    from '@angular/common/http';
import { JsonpModule } from '@angular/http';

import { AppRoutingModule }     from './app-routing.module';

import { AppComponent }         from './app.component';
import { DashboardComponent }   from './dashboard/dashboard.component';
import { PostDetailComponent }  from './post-detail/post-detail.component';
import { UserInputComponent }  from './user-input/user-input.component';
import { RedditService }          from './reddit.service';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    JsonpModule,
    HttpClientModule,
  ],
  declarations: [
    AppComponent,
    DashboardComponent,
    PostDetailComponent,
    UserInputComponent,
  ],
  providers: [ RedditService ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
