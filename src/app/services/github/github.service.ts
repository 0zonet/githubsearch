import { Injectable } from '@angular/core';
import {Http, Headers} from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class GithubService {
  
  private username : string;
  private client_id : string;
  private client_secret : string;

  constructor(private http: Http) { 
    this.username = '0zonet';
    this.client_id = '23c1a077dd85db976f9b';
    this.client_secret = 'e9e05a145730145d41c04386224c0909d1e796c5';
    console.log('Github service init...');
  }

  getUser(){
    return this.http
              .get('https://api.github.com/users/'+this.username)
              .map(res => res.json());
  }

  getRepos(){
    return this.http
              .get('https://api.github.com/users/'+this.username+'/repos')
              .map(res => res.json());
  }

  updateUsername(username : string){
    this.username = username;
  }

}
