import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IExercise } from '../models/exercise.model';
import { Observable } from 'rxjs/internal/Observable';
import { map} from 'rxjs';
import { environment } from '../../environments/environment';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class ExerciseService {

  constructor(private http: HttpClient) { }

  public getExercises(): Observable<IExercise[]> {
    return this.http.get<IExercise[]>(`${base_url}/exercises`);
  }

  public getExerciseById(id: number): Observable<IExercise>{
    return this.http.get(`${base_url}/exercises/${id}`).pipe(
      map( (resp: any) => resp.exercise)
    );
  }

  public create(values: IExercise) {
    const exercise = {
      name: values.name,
      description: values.description,
    };
    return this.http.post<IExercise>(`${base_url}/exercises`, exercise);
  }

  public update(exercise: IExercise) {
    return this.http.put<IExercise>(`${base_url}/exercise/${exercise.id}`, exercise);
  }

  public remove(exercise: IExercise): Observable<any> {
    return this.http.delete<any>(`${base_url}/exercises/${exercise.id}`);
  }
}
