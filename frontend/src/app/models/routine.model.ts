import { IExercise } from "./exercise.model";

export interface IRoutine {
  id: number;
  name: string;
  description: string;
  exercises: IExercise[]; 
}
