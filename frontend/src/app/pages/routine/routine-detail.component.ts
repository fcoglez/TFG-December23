import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { delay, map } from 'rxjs';
import { ExerciseService } from 'src/app/services/exercise.service';
import { RoutineService } from 'src/app/services/routine.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-routine-detail',
  templateUrl: './routine-detail.component.html',
  styleUrls: ['./routine-detail.component.css']
})

export class RoutineDetailComponent implements OnInit{

  routineSelected: any;
  exercises: any;
  formRoutine: FormGroup = new FormGroup({});

  constructor(private router: Router,
              private activatedRoute: ActivatedRoute,
              private routineService: RoutineService,
              private formBuilder: FormBuilder,
              private exerciseService: ExerciseService){}

  ngOnInit() {
    this.exerciseService.getExercises().subscribe((rep) => {
      this.exercises = rep;
    });
    this.formRoutine = this.formBuilder.group({
       name: ['', Validators.required],
       description: ['',Validators.required],
       exercises: [[]],
    });
    this.activatedRoute.params.subscribe(({ id }) => this.load(id));
  }

  private load(id: string) {
    if (id === 'new') {
      return;
    }

    this.routineService.getRoutineById(Number(id))
      .pipe(delay(100))
      .subscribe(routine => {
        if (!routine) {
          this.router.navigateByUrl('/routine');
          return;
        }

        this.routineSelected = routine;
        const { name, description, exercises } = routine;
        this.formRoutine.setValue({
          name,
          description,
          exercises: exercises.map((exercise: any) => exercise.id)
        });
      });
  }

  public save() {
    if (this.formRoutine.valid) {
      if (this.routineSelected) {
        const updatedRoutineData = {
          ...this.formRoutine.value,
          id: this.routineSelected.id
        };

        this.routineService.update(updatedRoutineData).subscribe(() => {
          Swal.fire({
            icon: 'success',
            title: 'Rutina actualizada correctamente'
          }).then(() => {
            this.router.navigate(['routine']);
          });
        });
      } else {
        this.routineService.create(this.formRoutine.value).subscribe(() => {
          Swal.fire({
            icon: 'success',
            title: 'Rutina creada correctamente'
          }).then(() => {
            this.router.navigate(['routine']);
          });
        });
      }
    } else {
      this.formRoutine.markAllAsTouched();
    }
  }
}
