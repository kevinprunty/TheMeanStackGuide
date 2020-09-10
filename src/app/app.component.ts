import { Component, OnInit } from '@angular/core';

import { Post } from './posts/posts.model';
import { AuthService } from './auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  storedPosts: Post[] = [];

  constructor(private authService: AuthService){}

  onPostAdded(post){
    this.storedPosts.push(post);
  }

  ngOnInit(){
    this.authService.autoAuthUser();
  }


}
