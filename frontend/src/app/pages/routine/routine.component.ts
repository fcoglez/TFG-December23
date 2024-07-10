import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IRoutine } from 'src/app/models/routine.model';
import { RoutineService } from 'src/app/services/routine.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-routine',
  templateUrl: './routine.component.html'
})

export class RoutineComponent implements OnInit {

  routines: any;


  constructor(private routineService: RoutineService,
              private router: Router) {}

  ngOnInit(): void {
    this.routineService.getRoutines().subscribe(resp => {
      this.routines = resp;
    });
  }


  public newRoutine() {
    this.router.navigate(['/routine/new']);
  }

  public editRoutine(routine: IRoutine){
    this.router.navigate(['/routine', routine.id]);
  }



  public removeRoutine(routine: IRoutine) {
    Swal.fire({
      title: `¿Estás seguro que quieres eliminar la rutina ${routine.name}?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.routineService.remove(routine).subscribe(
          () => {
            Swal.fire('Exito', 'La rutina ha sido eliminado con éxito', 'success');
            this.routineService.getRoutines().subscribe(resp => {
              this.routines = resp;
            });
          },
          () => {
            Swal.fire('Error', 'Ha ocurrido un error al eliminar la rutina', 'error');
          }
        );
      }
    });

  }


  public assignment() {

      if (localStorage.getItem("role") === 'trainer' ) {
        this.router.navigate(['/trainer-routine']);
    }
      else{
        this.router.navigate(['/routine-assignment']);
    }
  }
}
