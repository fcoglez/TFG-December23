import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ComponentsModule } from '../components/components.module';
import { AboutComponent } from './about/about.component';
import { HomeComponent } from './home/home.component';
import { UsersComponent } from './users/users.component';
import { UserDetailComponent } from './users/user-detail.component';
import { RoutineComponent } from './routine/routine.component';
import { ExerciseComponent } from './exercise/exercise.component';
import { ExerciseDetailComponent } from './exercise/exercise-detail.component';
import { RoutineDetailComponent } from './routine/routine-detail.component';
import { ActivityComponent } from './activity/activity.component';
import { TrainersComponent } from './trainers/trainers.component';
import { TrainerDetailComponent } from './trainers/trainer-detail.component';
import { RoutineAssignmentComponent } from './routine/routine-assignment.component';
import { TrainerProfileComponent } from './trainer-profile/trainer-profile.component';
import { NormalProfileComponent } from './normal-profile/normal-profile.component';
import { NormalProfileDetailComponent } from './normal-profile/normal-profile-detail.component';
import { TrainerRoutineComponent } from './trainer-profile/trainer-routine.component';
import { PagesComponent } from './pages.component';
import { PipesModule } from '../pipes/pipes.module';

@NgModule({
  declarations: [
    AboutComponent,
    HomeComponent,
    UsersComponent,
    UserDetailComponent,
    RoutineComponent,
    ExerciseComponent,
    ExerciseDetailComponent,
    RoutineDetailComponent,
    ActivityComponent,
    TrainersComponent,
    TrainerDetailComponent,
    RoutineAssignmentComponent,
    TrainerProfileComponent,
    NormalProfileComponent,
    NormalProfileDetailComponent,
    TrainerRoutineComponent,
    PagesComponent
  ],

  exports: [
    HomeComponent,
    AboutComponent,
    UsersComponent,
    UserDetailComponent,
    RoutineComponent,
    RoutineDetailComponent,
    ExerciseComponent,
    ExerciseDetailComponent,
    ActivityComponent,
    TrainersComponent,
    TrainerDetailComponent,
    RoutineAssignmentComponent,
    TrainerProfileComponent,
    TrainerRoutineComponent,
    NormalProfileComponent
  ],

  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    SharedModule,
    ComponentsModule,
    PipesModule
  ]
})

export class PagesModule { }
