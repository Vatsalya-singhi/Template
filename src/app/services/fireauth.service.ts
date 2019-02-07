import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { auth } from 'firebase/app';
import { AngularFireAuth } from '@angular/fire/auth';

import {AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import {Observable , of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { User } from './user.model'; 
import { ReturnStatement } from '@angular/compiler';

@Injectable({
  providedIn: 'root'
})
export class FireauthService {
  user$ : Observable<User>;
  constructor(
    private afAuth : AngularFireAuth,
    private afs : AngularFirestore,
    private router :  Router
  ) {
    this.user$ = this.afAuth.authState.pipe(
      switchMap(user => {
        if(user){
          return this.afs.doc<User>(`users/${user.uid}`).valueChanges();
        }else{
          return of(null);
        }
      })
    );
   }

   async googleSignin(url){
     const provider = new auth.GoogleAuthProvider();
     const credentials = await this.afAuth.auth.signInWithPopup(provider);
     return this.updateUserData(credentials.user).then(()=>{
       debugger;
       this.router.navigateByUrl(url);
     });
   }

   async signOut(){
     await this.afAuth.auth.signOut();
     return this.router.navigate(['/']);
   }

   private updateUserData(user){
     //Sets user data to firestore on login
     const userRef : AngularFirestoreDocument<User> = this.afs.doc(`users/${user.uid}`);
     const data = {
       uid :  user.uid,
       email : user.email,
       displayName : user.displayName,
       photoURL : user.photoURL
     };
     localStorage.setItem("userdata",JSON.stringify(data));
     return userRef.set(data,{ merge :true });
   }
}
