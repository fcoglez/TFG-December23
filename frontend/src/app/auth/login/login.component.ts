import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit{

  myFormRegister: FormGroup = new FormGroup({});
  myFormLogin: FormGroup = new FormGroup({});
  role: string = '';

  constructor(private formBuilder: FormBuilder,
              private userService: UserService,
              private router: Router){}

  ngOnInit() {
    const signUpButton = document.getElementById('signUp');
    const signInButton = document.getElementById('signIn');
    const container = document.getElementById('container');

    signUpButton!.addEventListener('click', () => {
      container!.classList.add("right-panel-active");
    });

    signInButton!.addEventListener('click', () => {
      container!.classList.remove("right-panel-active");
    });

    this.myFormRegister = this.formBuilder.group({
      name: ['', Validators.required],
      surname: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });

    this.myFormLogin = this.formBuilder.group({
        email: ['', [Validators.required, Validators.email]],
        password: ['', Validators.required]
      }
    );
  }

  public sendFormRegister(values: any) {
    if (!values.name || !values.surname || !values.email || !values.password) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Por favor, completa todos los campos '
      });
      return;
    }
    this.userService.register(values).subscribe(() => {
      Swal.fire({
        icon: 'success',
        title: 'Usuario registrado correctamente'
      }).then(() => {
        this.router.navigate(['/']);
      });
    });
  }

  public sendFormLogin(): void {
    if (this.myFormLogin.valid) {
      const values = this.myFormLogin.value;
      this.userService.login(values).subscribe(
        (resp) => {
          this.role = resp.user.role;
          localStorage.setItem("login", "true");
          localStorage.setItem("role", this.role);
          localStorage.setItem("idUser", resp.user.id);
          localStorage.setItem("userName", resp.user.name);
          switch (this.role) {
            case 'trainer':
              this.router.navigate(['trainer-profile']);
              break;
            case 'admin':
              this.router.navigate(['user']);
              break;
            default:
              this.router.navigate(['normal-profile']);
          }
        },
        (error) => {
          Swal.fire({
            icon: 'error',
            title: 'Error al iniciar sesión',
            text: 'Verifica tus credenciales e intenta nuevamente.',
          });
        }
      );
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Por favor, completa todos los campos '
      });
    }
  }
}
