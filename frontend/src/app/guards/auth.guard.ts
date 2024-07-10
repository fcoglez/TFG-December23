import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router, CanLoad, Route, UrlSegment, UrlTree } from '@angular/router';
import { UserService } from '../services/user.service';

@Injectable({
    providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanLoad {

    constructor( private userService: UserService,
                 private router: Router ) {}

    canLoad(route: Route, segments: UrlSegment[]): boolean {
        if (!this.userService.isLoggedIn()) {
            this.router.navigateByUrl('/login')
            return false;
        }
        return true;
    }
    
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        if (!this.userService.isLoggedIn()) {
            this.router.navigateByUrl('/login')
            return false;
        }
        return true;
    }
}