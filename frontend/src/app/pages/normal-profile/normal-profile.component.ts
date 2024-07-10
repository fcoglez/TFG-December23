import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-normal-profile',
  templateUrl: './normal-profile.component.html',
  styleUrls: ['./normal-profile.component.css']
})

export class NormalProfileComponent implements OnInit {

  userSelected: any;
  normalUser: any = {};
  assignedTrainerName: string = '';
  routine: any = [];
  trainerLoading: boolean = false;

  constructor(private userService: UserService){}

  ngOnInit(): void {
    this.userSelected = Number(localStorage.getItem("idUser"));
    this.userService.normalUserHasTrainer(this.userSelected).subscribe(
      (data) => {
        this.assignedTrainerName = data.trainerName;
        this.normalUser = localStorage.getItem("userName");
        this.trainerLoading = true;
      },
      (error) => {
        console.error(error);
      }
    );
    this.userService.routineForNormalUser(this.userSelected).subscribe(
      (data) => {
        this.routine = data;
      },
      (error) => {
        console.error(error);
      }
    );
  }
}
