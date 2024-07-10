import { Component, OnInit } from '@angular/core';
import { ExerciseService } from '../../services/exercise.service';
import { Router } from '@angular/router';
import { IExercise } from 'src/app/models/exercise.model';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-exercise',
  templateUrl: './exercise.component.html'
})
export class ExerciseComponent implements OnInit {

  exercises: any = [];

  constructor(private exerciseService: ExerciseService, private router: Router) {}

  ngOnInit() {
    this.exerciseService.getExercises().subscribe(rep => {
        this.exercises = rep;
      });
  }

  public newExercise() {
    this.router.navigate(['/exercise/new']);
  }

  public editExercise(exercise: IExercise) {
    this.router.navigate(['/exercise', exercise.id]);
  }

  public removeExercise(exercise: IExercise) {
    Swal.fire({
      title: `¿Estás seguro que quieres eliminar el ejercicio ${exercise.name}?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.exerciseService.remove(exercise).subscribe(
          () => {
            this.exerciseService.getExercises().subscribe(rep => {
              this.exercises = rep;
            });
          },
          (error) => {
            console.error('Error al eliminar el ejercicio:', error);
            Swal.fire('Error', 'Ha ocurrido un error al eliminar el ejercicio', 'error');
          }
        );
      }
    });
  }
}
