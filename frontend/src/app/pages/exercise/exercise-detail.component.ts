import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { delay } from 'rxjs';
import { ExerciseService } from 'src/app/services/exercise.service';
import { UploadService } from 'src/app/services/upload.service';
import Swal from 'sweetalert2';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-exercise-detail',
  templateUrl: './exercise-detail.component.html',
  styleUrls: ['./exercise-detail.component.css']
})
export class ExerciseDetailComponent implements OnInit{

  exerciseSelected: any;
  formExercise: FormGroup = new FormGroup({});
  public imageLoaded: any = null;
  public imgTemp: any = null;

  constructor(private router: Router,
              private activatedRoute: ActivatedRoute,
              private exerciseService: ExerciseService,
              private uploadService: UploadService,
              private _sanitizer: DomSanitizer,
              private formBuilder: FormBuilder){}

  ngOnInit() {
    this.activatedRoute.params.subscribe(({ id }) => this.load(id))
    this.formExercise = this.formBuilder.group({
      name: ['', Validators.required],
      description: ['',Validators.required],
    });
  }

  public load(id: any): void {
    if (id === 'new') {
      return;
    }

    this.exerciseService.getExerciseById(Number(id))
      .pipe(delay(100))
      .subscribe(exercise => {
        if (!exercise) {
          this.router.navigateByUrl('/exercise');
          return;
        }

        this.exerciseSelected = exercise;
        const { name, description } = exercise;
        this.formExercise.setValue({ name, description});
      });
  }

  public save() {
    if (this.formExercise.valid) {
      if (this.exerciseSelected) {
        const data = {
          ...this.formExercise.value,
          id: this.exerciseSelected.id,
        };
        this.exerciseService.update(data).subscribe(() => {
          Swal.fire({
            icon: 'success',
            title: 'Ejercicio actualizado correctamente',
          }).then(() => {
            this.router.navigate(['exercise']);
          });
        });
      } else {
          this.exerciseService.create(this.formExercise.value).subscribe(() => {
            Swal.fire({
              icon: 'success',
              title: 'Ejercicio insertado correctamente'
            }).then(() => {
              this.router.navigate(['exercise']);
            });
          });
      }
    } else {
      this.formExercise.markAllAsTouched();
    }
  }

  public changeImage(event : any) {
    const file = event.target.files[0];
    if ( !file) {
      this.imgTemp = null;
    }
    this.imageLoaded = file;

    const reader = new FileReader();
    reader.readAsDataURL( file );
    reader.onloadend = () => {
      this.imgTemp = reader.result;
    }
  }

  public loadImage() {
    this.uploadService
      .uploadImage( this.imageLoaded, 'exercises', this.exerciseSelected.id).then(() => {
        Swal.fire('Guardado', 'Imagen de usuario actualizada', 'success');
      }).catch(err => {
        console.log(err);
        Swal.fire('Error', 'No se pudo subir la imagen', 'error');
      })
  }
}
