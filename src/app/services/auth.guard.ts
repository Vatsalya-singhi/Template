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
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
      debugger;
      console.log("state.url=>",state.url) ; //console.log(this.router.url);
      return this.auth.user$.pipe(
        take(1),
        map(user =>{
          if (state.url.startsWith('/pages/auth/login')) {
            return true;
          }
          console.log('User=>',user);
          return !!user;
          //!!user
        } ),
        tap(loggedIn => {
          if(!loggedIn){
            console.log('Access denied');
            console.log('state.url=>',state.url);
            this.router.navigate(['/pages/auth/login'], { queryParams: { returnUrl: state.url }});
          }else{
            console.log('Access acquired!');
            //this.router.navigate(['/dashboard']);
          }
        })
      );//true;
  }
}
