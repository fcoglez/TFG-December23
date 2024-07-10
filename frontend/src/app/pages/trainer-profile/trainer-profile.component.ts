import { Component, OnInit } from '@angular/core';
import { Router} from '@angular/router';
import { IUser } from 'src/app/models/user.model';
import { TrainerUserService } from 'src/app/services/trainer-user.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-trainer-profile',
  templateUrl: './trainer-profile.component.html',
})

export class TrainerProfileComponent implements OnInit {

  trainerSelected: any;
  trainer: any = {};
  assignedUsers: number = 0;

  constructor(private router: Router,
              private userService: UserService,
              private trainerUserService: TrainerUserService){}


  ngOnInit(): void {
    this.trainerSelected = Number(localStorage.getItem("idUser"));
    this.userService.getTrainer(this.trainerSelected).subscribe(
      (data) => {
        this.trainer = data.data;
      },
      (error) => {
        console.error(error);
      }
    );

    this.trainerUserService.getAssignedUsersToTrainer(this.trainerSelected).subscribe(
      (data) => {
        this.assignedUsers = data['assigned users'].length;
      },
      () => {
      }
    );
  }

  public editUser(user: IUser) {
    this.router.navigate(['/user', user.id]);
  }

}
