import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { Observable } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class AuthGuard implements CanActivate {
    constructor(private router : Router){}
    canActivate(route : ActivatedRouteSnapshot, state : RouterStateSnapshot): boolean | UrlTree | Observable<boolean> {
        return new Observable((observer)=>{
            const token = localStorage.getItem('token');
            if (token) {
                observer.next(true);
            }
            else {
                this.router.navigate(['/login']);
                observer.error(false);
            }
        });
    }
}

