import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TrainerUserService } from 'src/app/services/trainer-user.service';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-trainer-detail',
  templateUrl: './trainer-detail.component.html',
  styleUrls: ['./trainer-detail.component.css']
})
export class TrainerDetailComponent implements OnInit {

  usersWithOutTrainers: any = [];
  usersWithTrainer: any | string = [] ;
  selectedUserIds: any = [];
  trainerUsers: any = [];
  nameTrainer :string = "";
  idTrainer :number = 0;
  trainer: any = {};

  constructor(private activatedRoute: ActivatedRoute,
              private trainerUserService: TrainerUserService,
              private userService: UserService){}


  ngOnInit(): void {
    this.activatedRoute.params.subscribe(({ idTrainer }) => {
      this.userService.getTrainer(idTrainer).subscribe((data) => {
        this.trainer = data;
      },(error) => {
        console.error(error);
      });
      
      this.trainerUserService.getAssignedUsersToTrainer(idTrainer).subscribe((data) => {
        this.usersWithTrainer = data['assigned users'];
      }, (error) => {
        console.error(error);
      });

      this.trainerUserService.getUsersWithoutTrainers().subscribe((data) => {
        this.usersWithOutTrainers = data;
      }, (error) => {
        console.error(error);
      });
    });
  }

  public assignUsersToTrainer(userId: any, trainerId:any) {
    this.trainerUserService.assignUsersToTrainer(trainerId, userId).subscribe((response) => {
      
      this.loadAssignedUsers();

      this.trainerUserService.getUsersWithoutTrainers().subscribe((data) => {
        this.usersWithOutTrainers = data;
      },(error) => {
        console.error(error);
      });

      this.selectedUserIds = [];
      Swal.fire('Éxito', response.message, 'success');
    }, (error) => {
      Swal.fire('Error', 'Error al asignar usuarios', error);
    });
  }

  public removeUsersFromTrainer(user: any ) {
    this.trainerUserService.removeUsersToTrainer(this.trainer.data.id, user.id).subscribe( (response) => {
      this.loadAssignedUsers();

      this.trainerUserService.getUsersWithoutTrainers().subscribe((data) => {
        this.usersWithOutTrainers = data;
      }, (error) => {
        console.error(error);
      });

      Swal.fire('Éxito', response.message, 'success');

    }, (error) => {
          Swal.fire('Error', 'Error al eliminar usuarios', error);
    });
  }

  private loadAssignedUsers(){
    this.trainerUserService.getAssignedUsersToTrainer(this.trainer.data.id).subscribe((data) => {
      this.usersWithTrainer = data['assigned users'];

    }, (error) => {
      console.error(error);
    });
  }
}



