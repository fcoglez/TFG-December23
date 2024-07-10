import { Component, OnInit } from '@angular/core';
import { TrainerUserService } from '../../services/trainer-user.service';
import { IUser } from 'src/app/models/user.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-trainers',
  templateUrl: './trainers.component.html',
})

export class TrainersComponent implements OnInit {

  trainersUsers: any = [];

  constructor(private trainerUserService:TrainerUserService,
              private router: Router){}

  ngOnInit() {
    this.trainerUserService.getTrainerUsers().subscribe(rep => {
        this.trainersUsers = rep;
      });
  }

  public editTrainer(trainer: IUser) {
    this.router.navigate(['/trainer', trainer.id]);
  }
}
