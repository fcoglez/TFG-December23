import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IUser } from '../models/user.model';
import { Observable } from 'rxjs/internal/Observable';
import { map } from 'rxjs';
import { environment } from '../../environments/environment';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})

export class UserService {

  constructor(private http: HttpClient) { }

  public login(values: IUser) : Observable<any>{
    const credentials = { email: values.email, password: values.password };
    return this.http.post<IUser>(base_url + '/login', credentials);
  }

  public register(values: IUser) {
    const credentials = {
      email: values.email,
      password: values.password,
      name: values.name,
      surname: values.surname,
    };
    return this.http.post<IUser>(base_url + '/register', credentials);
  }

  public getUsers(): Observable<IUser> {
    return this.http.get<IUser>(`${base_url}/users`);
  }

  public getUserById(id: number): Observable<IUser>{
    return this.http.get(`${base_url}/users/${id}`).pipe(
      map( (resp: any) => resp.user)
    );
  }

  public getUsersWithRoutines(): Observable<any> {
    return this.http.get<any>(`${base_url}/routine-user`);
  }

  public getUsersWithoutRoutines(): Observable<any> {
    return this.http.get<any>(`${base_url}/no-routine-user`);
  }

  public create(values: IUser) {
    const user = {
      name: values.name,
      surname: values.surname,
      email: values.email,
      password: values.password,
      role: values.role
    };
    return this.http.post<IUser>(`${base_url}/users`, user);
  }

  public update(user: IUser): Observable<IUser> {
    return this.http.put<IUser>(`${base_url}/users/${user.id}`, user);
  }

  public remove(user: IUser): Observable<any> {
    return this.http.delete<any>(`${base_url}/users/${user.id}`);
  }

  public isLoggedIn() {
    return localStorage.getItem('login') === 'true'
  }

  public roleUser() : any {
    const role = localStorage.getItem('role');
    return role;
  }

  public getTrainer(id : number){
    return this.http.get<any>(`${base_url}/trainer/${id}`);
  }

  public getNormalUser(id : number){
    return this.http.get<any>(`${base_url}/normal-user/${id}`);
  }

  public normalUserHasTrainer(id : number){
    return this.http.get<any>(`${base_url}/user/${id}/trainer-name`);
  }

  public routineForNormalUser(id : number){
    return this.http.get<any>(`${base_url}/user/${id}/routine`).pipe(
      map( (resp: any) => resp.routine)
    );
  }

  public getUsersWithoutRoutineByTrainerId(trainerId: number) {
    return this.http.get<any>(`${base_url}/get-users-by-trainer/${trainerId}`).pipe(
      map((resp: any) => resp.usersWithoutRoutine)
    );
  }

  public getUsersWithRoutineByTrainerId(trainerId: number) {
    return this.http.get<any>(`${base_url}/get-users-with-routine-trainer/${trainerId}`).pipe(
      map((resp: any) => resp.usersWithRoutine)
    );
  }

  public addRoutineToUser(userId: any, routineId: any): Observable<IUser> {
    return this.http.post<IUser>(`${base_url}/add-routine-user/${userId}/${routineId}`, {});
  }

  public removeRoutineUser(userId: any): Observable<IUser> {
    return this.http.delete<IUser>(`${base_url}/remove-routine-user/${userId}`);
  }
}
