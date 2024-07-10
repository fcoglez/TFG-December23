import { Component, OnInit } from '@angular/core';
import { RoutineService } from 'src/app/services/routine.service';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-trainer-routine',
  templateUrl: './trainer-routine.component.html',
  styleUrls: ['./trainer-routine.component.css']
})
export class TrainerRoutineComponent implements OnInit {

  allUsersWithRoutines: any = [];
  allUsersWithoutRoutines: any = [];
  selectedRoutine: any;
  routines: any;
  trainerSelected: any;

  constructor(private userService: UserService,
              private routineService: RoutineService){}

  ngOnInit(): void {
    this.trainerSelected = Number(localStorage.getItem("idUser"));
    this.userService.getUsersWithRoutineByTrainerId(this.trainerSelected).subscribe(resp => {
      this.allUsersWithRoutines = resp;
    });
    this.userService.getUsersWithoutRoutineByTrainerId(this.trainerSelected).subscribe(resp => {
      this.allUsersWithoutRoutines = resp;
    });
    this.routineService.getRoutines().subscribe(resp => {
      this.routines = resp;
    });
  }

  public assignRoutine(userId: any, routineId: any) {
    this.userService.addRoutineToUser(userId, routineId).subscribe(() => {
      this.userService.getUsersWithRoutineByTrainerId(this.trainerSelected).subscribe(resp => {
        this.allUsersWithRoutines = resp;
      });
      this.userService.getUsersWithoutRoutineByTrainerId(this.trainerSelected).subscribe(resp => {
        this.allUsersWithoutRoutines = resp;
      });
    }, () => {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Asigna una rutina por favor.',
      });
    });
  }

  public removeRoutineToUser(userId: any) {
    this.userService.removeRoutineUser(userId).subscribe(() => {
      this.userService.getUsersWithRoutineByTrainerId(this.trainerSelected).subscribe(resp => {
        this.allUsersWithRoutines = resp;
      });
      this.userService.getUsersWithoutRoutineByTrainerId(this.trainerSelected).subscribe(resp => {
        this.allUsersWithoutRoutines = resp;
      });
    }, () => {

    });
  }
}



