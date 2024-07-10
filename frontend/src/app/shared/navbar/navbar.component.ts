import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})

export class NavbarComponent {

  login: boolean = false
  userId: any;

  constructor(private router: Router,public auth: UserService) {
    const store = localStorage.getItem("login");
    if (store === 'true') {
      this.login = true
    }
    this.userId = localStorage.getItem("idUser");
  }

  public logout() {
    this.router.navigateByUrl('/');
    localStorage.removeItem("login");
    localStorage.removeItem("role");
    localStorage.removeItem("userId");
    localStorage.removeItem("userName");
  }
}
