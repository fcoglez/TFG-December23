import { Component, OnInit } from '@angular/core';
import { RoutineService } from 'src/app/services/routine.service';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-routine-assignment',
  templateUrl: './routine-assignment.component.html',
  styleUrls: ['./routine-assignment.component.css']
})
export class RoutineAssignmentComponent implements OnInit{

  allUsersWithRoutines: any = [];
  allUsersWithoutRoutines: any = [];
  selectedRoutine: any;
  routines: any;

  constructor(private userService: UserService,
              private routineService: RoutineService){}

  ngOnInit(): void {
    this.userService.getUsersWithRoutines().subscribe(resp => {
      this.allUsersWithRoutines = resp;
    });
    this.userService.getUsersWithoutRoutines().subscribe(resp => {
      this.allUsersWithoutRoutines = resp;
    });
    this.routineService.getRoutines().subscribe(resp => {
      this.routines = resp;
    });
  }

  public assignRoutine(userId: any, routineId: any) {
    this.userService.addRoutineToUser(userId, routineId)
      .subscribe(() => {
        this.userService.getUsersWithRoutines().subscribe(resp => {
          this.allUsersWithRoutines = resp;
        });
        this.userService.getUsersWithoutRoutines().subscribe(resp => {
          this.allUsersWithoutRoutines = resp;
        });
      }, (error) => {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Asigna una rutina por favor.',
        });
      }
    );
  }

  public removeRoutineToUser(userId: any) {
    this.userService.removeRoutineUser(userId).subscribe(() => {
      this.userService.getUsersWithRoutines().subscribe(resp => {
        this.allUsersWithRoutines = resp;
      });
      this.userService.getUsersWithoutRoutines().subscribe(resp => {
        this.allUsersWithoutRoutines = resp;
      });
    }, () => {
    });
  }
}
