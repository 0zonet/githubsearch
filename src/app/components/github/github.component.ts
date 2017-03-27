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
  status: boolean;
  searchControl = new FormControl();

  constructor(private githubService: GithubService) { 
  }

  ngOnInit() {
      this.status = false;
      this.searchControl
          .valueChanges
          .debounceTime(700)
          .distinctUntilChanged()
          .subscribe(newValue => this.search());     
    }


  search(){
    if(this.username){
          this.status = true;
          this.githubService.updateUsername(this.username);
    
          this.githubService.getUser().subscribe(user =>{
              //Guardar usuario en este componente
              this.user = user;
              //Get repos
              this.githubService.getRepos().subscribe(repos => {
                //Guardar repos en este componente
                this.repos = repos;
                this.status = false;
              });
          });
    
      }
  }

}
