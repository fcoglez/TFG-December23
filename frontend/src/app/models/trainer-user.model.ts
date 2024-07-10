import { IUser } from "./user.model";
import { IRoutine } from "./routine.model";

export interface ITrainerUser {
  id: number;
  trainer: IUser;
  user: IUser;
  routine: IRoutine;
}
