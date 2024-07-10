import { RouterModule, Routes } from "@angular/router";
import { AboutComponent } from "./about/about.component";
import { ActivityComponent } from "./activity/activity.component";
import { ExerciseDetailComponent } from "./exercise/exercise-detail.component";
import { ExerciseComponent } from "./exercise/exercise.component";
import { HomeComponent } from "./home/home.component";
import { NormalProfileDetailComponent } from "./normal-profile/normal-profile-detail.component";
import { NormalProfileComponent } from "./normal-profile/normal-profile.component";
import { RoutineAssignmentComponent } from "./routine/routine-assignment.component";
import { RoutineDetailComponent } from "./routine/routine-detail.component";
import { RoutineComponent } from "./routine/routine.component";
import { TrainerProfileComponent } from "./trainer-profile/trainer-profile.component";
import { TrainerDetailComponent } from "./trainers/trainer-detail.component";
import { TrainersComponent } from "./trainers/trainers.component";
import { UserDetailComponent } from "./users/user-detail.component";
import { UsersComponent } from "./users/users.component";
import { TrainerRoutineComponent } from './trainer-profile/trainer-routine.component';
import { NgModule } from "@angular/core";
import { AuthGuard } from "../guards/auth.guard";

const childRoutes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'about', component: AboutComponent },
  { path: 'activity', component: ActivityComponent },
  { path: 'user', canActivate: [AuthGuard], component: UsersComponent },
  { path: 'user/:id', canActivate: [AuthGuard], component: UserDetailComponent },
  { path: 'trainer', canActivate: [AuthGuard], component: TrainersComponent },
  { path: 'trainer/:idTrainer', canActivate: [AuthGuard], component: TrainerDetailComponent },
  { path: 'exercise', canActivate: [AuthGuard], component: ExerciseComponent },
  { path: 'exercise/:id', canActivate: [AuthGuard], component: ExerciseDetailComponent },
  { path: 'routine', canActivate: [AuthGuard], component: RoutineComponent },
  { path: 'routine/:id', canActivate: [AuthGuard], component: RoutineDetailComponent },
  { path: 'routine-assignment', canActivate: [AuthGuard], component: RoutineAssignmentComponent },
  { path: 'trainer-profile', canActivate: [AuthGuard], component: TrainerProfileComponent},
  { path: 'trainer-routine', canActivate: [AuthGuard], component: TrainerRoutineComponent},
  { path: 'normal-profile', canActivate: [AuthGuard], component: NormalProfileComponent},
  { path: 'normal-profile/detail', canActivate: [AuthGuard], component: NormalProfileDetailComponent}
];

@NgModule({
  imports: [ RouterModule.forChild(childRoutes) ],
  exports: [ RouterModule ]
})

export class ChildRoutesModule { }
