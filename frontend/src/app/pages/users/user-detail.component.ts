import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute} from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { UploadService } from 'src/app/services/upload.service';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
import { delay } from 'rxjs';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.css']
})
export class UserDetailComponent implements OnInit {

  userSelected: any;
  formUser: FormGroup = new FormGroup({});
  roles: String[] = ['admin', 'trainer','normal'];
  public imageLoaded: any = null;
  public imgTemp: any = null;

  constructor(private router: Router,
              private activatedRoute: ActivatedRoute,
              private userService: UserService,
              private uploadService: UploadService,
              private formBuilder: FormBuilder){}

  ngOnInit() {
    this.activatedRoute.params.subscribe(( {id} ) => this.load(id));
    this.formUser = this.formBuilder.group({
      name: ['', Validators.required],
      surname: ['',Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      role: ['', Validators.required]
    });
  }

  private load(id: string) {
    if (id === 'new') {
      return;
    }

    this.userService.getUserById(Number(id))
      .pipe(delay(100))
      .subscribe(user => {
        if (!user) {
          this.router.navigateByUrl('/user');
          return;
        }

        this.userSelected = user;
        const { email, password, name, surname, role } = user;
        this.formUser.setValue({ email, password, name, surname, role });
      });
  }

  public save() {
    if (this.formUser.valid) {
      if (this.userSelected) {
       const data = {
         ...this.formUser.value,
         id: this.userSelected.id
       }
       this.userService.update(data).subscribe(() => {
         Swal.fire({
           icon: 'success',
           title: 'Usuario actualizado correctamente'
         }).then(() => {
          if (localStorage.getItem('role') === 'normal') {
            this.router.navigate(['normal-profile']);
          }else{
            this.router.navigate(['user']);
          }
         });
       });
      } else {
       this.userService.create(this.formUser.value).subscribe(() => {
         Swal.fire({
           icon: 'success',
           title: 'Usuario insertado correctamente'
         }).then(() => {
           this.router.navigate(['user']);
         });
       });
      }
    } else {
     this.formUser.markAllAsTouched();
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
    this.uploadService.uploadImage( this.imageLoaded, 'user', this.userSelected.id).then(() => {
        Swal.fire('Guardado', 'Imagen de usuario actualizada', 'success');
    }).catch(err => {
      Swal.fire('Error', 'No se pudo subir la imagen', 'error');
    })
  }

  public back(){
    if (localStorage.getItem('role') === 'normal') {
      this.router.navigate(['normal-profile/detail']);
    } else if (localStorage.getItem('role') === 'trainer') {
      this.router.navigate(['trainer-profile']);
    }else{
      this.router.navigate(['user']);
    }
  }
}
