import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IUser } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-normal-profile-detail',
  templateUrl: './normal-profile-detail.component.html'
})
export class NormalProfileDetailComponent implements OnInit {

  userSelected: any;
  normalUser: any = {};

  constructor(private router: Router,
              private userService: UserService){}

  ngOnInit(): void {

    this.userSelected = Number(localStorage.getItem("idUser"));

    this.userService.getNormalUser(this.userSelected).subscribe(
      (data) => {
        this.normalUser = data.data;
      },
      (error) => {
        console.error(error);
      }
    );
  }

  public editUser(user: IUser) {
    this.router.navigate(['/user', user.id]);
  }
}
