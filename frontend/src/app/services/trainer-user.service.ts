import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { ITrainerUser } from '../models/trainer-user.model';
import { IUser } from '../models/user.model';
import { environment } from '../../environments/environment';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})

export class TrainerUserService {

  constructor(private http: HttpClient) {}

  public getTrainerUsers(): Observable<ITrainerUser[]> {
    return this.http.get<ITrainerUser[]>(`${base_url}/trainer-users`);
  }

  public getTrainerUserById(id: number): Observable<ITrainerUser>{
    return this.http.get(`${base_url}/trainer-users/${id}`).pipe(
      map((resp: any) => resp)
    );
  }

  public getUsersWithoutTrainers(): Observable<IUser[]> {
    return this.http.get<IUser[]>(`${base_url}/users-withOutTrainer`);
  }

  public getAssignedUsersToTrainer(trainerId: number): Observable<any> {
    return this.http.get<IUser[]>(`${base_url}/assigned-users/${trainerId}`);
  }

  public assignUsersToTrainer(trainerId: number, userId: number): Observable<any> {
    return this.http.post<any>(`${base_url}/add-users-trainer/${trainerId}/${userId}`, {});
  }

  public removeUsersToTrainer(trainerId: number, userId: number): Observable<any> {
    return this.http.delete<any>(`${base_url}/remove-assignment/${trainerId}/${userId}`);
  }
}
