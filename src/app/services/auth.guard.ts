import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot,Router } from '@angular/router';
import { Observable } from 'rxjs';
import {FireauthService} from '../services/fireauth.service';
import { take, map, tap } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private auth: FireauthService,private router:Router){

  }
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
      debugger;
      console.log(this.router.getCurrentNavigation() ) ;
      return this.auth.user$.pipe(
        take(1),
        map(user =>{
          console.log('User=>',user);
          return !!user;
          //!!user
        } ),
        tap(loggedIn => {
          if(!loggedIn){
            console.log('Access denied');
            this.router.navigate(['/getlogin']);
          }else{
            console.log('Access acquired!');
            this.router.navigate(['/dashboard']);
          }
        })
      );//true;
  }
}
