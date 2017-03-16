import { Component, OnInit } from '@angular/core';
import {GithubService} from '../../services/github/github.service';
import {FormControl} from '@angular/forms';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/throttleTime';


@Component({
  selector: 'app-github',
  templateUrl: './github.component.html',
  styleUrls: ['./github.component.css'],
  providers:[GithubService]
})

export class GithubComponent implements OnInit {
  
  user: any;
  repos: any;
  username: string;
  searchControl = new FormControl();

  constructor(private githubService: GithubService) { 
  }

  ngOnInit() {
      this.searchControl
          .valueChanges
          .debounceTime(700)
          .distinctUntilChanged()
          .subscribe(newValue => this.search());     
    }


  search(){
    if(this.username){
    
          this.githubService.updateUsername(this.username);
    
          this.githubService.getUser().subscribe(user =>{
              console.log(user);
              this.user = user;
          });
    
          //Get repos
          this.githubService.getRepos().subscribe(repos => {
            this.repos = repos;
          });
          }
  }

}
