import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import {Router} from '@angular/router';
import { IUser } from 'src/app/models/user.model';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html'
})
export class UsersComponent implements OnInit {

  users: any = [];

  constructor(private userService: UserService,
              private router: Router) {}

  ngOnInit() {
    this.userService.getUsers().subscribe(rep => {
        this.users = rep;
      });
  }

  public newUser(){
    this.router.navigate(['/user/new']);
  }

  public editUser(user: IUser) {
    this.router.navigate(['/user', user.id]);
  }

  public removeUser(user: IUser){
    Swal.fire({
      title: `¿Estás seguro que quieres eliminar a ${user.name}?`,
      icon: 'warning',
      showCancelButton: true,
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.userService.remove(user).subscribe(
          () => {
            Swal.fire('Exito', 'El usuario ha sido eliminado con éxito', 'success');
            this.userService.getUsers().subscribe(rep => {
              this.users = rep;
            });
          }, (error) => {
            Swal.fire('Error', 'tienes un usuario asignado', 'error');
          });
      }
    });
  }
}
