import { Injectable } from '@angular/core';
import { IRoutine } from '../models/routine.model';
import { Observable } from 'rxjs/internal/Observable';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs';
import { environment } from '../../environments/environment';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class RoutineService {

  constructor(private http: HttpClient) { }

  public getRoutines(): Observable<IRoutine> {
    return this.http.get<IRoutine>(`${base_url}/routines-with-exercises`);
  }

  public getRoutineById(id: number): Observable<IRoutine> {
    return this.http.get(`${base_url}/routines/${id}`).pipe(
      map((resp: any) => resp.routine)
    );
  }

  public create(routineData: any) {
    return this.http.post<IRoutine>(`${base_url}/routines`, routineData);
  }

  public remove(routine: IRoutine): Observable<any> {
    return this.http.delete<any>(`${base_url}/routines/${routine.id}`);
  }

  public update(routineData: any): Observable<any> {
    const routine = {
      id: routineData.id,
      name: routineData.name,
      description: routineData.description,
      exercise_ids: routineData.exercises
    }
    return this.http.put<any>(`${base_url}/routine/${routine.id}`, routine);
  }
}
