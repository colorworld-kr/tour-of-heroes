import { Injectable, EventEmitter } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth'; // v.9 호환용
import firebase from 'firebase/compat/app'; // v.9 호환용
import { FirebaseUserModel } from '../classes/user.model';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UserService implements Resolve<FirebaseUserModel> {

  userInfoUpdated$: EventEmitter<FirebaseUserModel> = new EventEmitter();

  constructor(
    private afAuth: AngularFireAuth,
    private router: Router
  ) { }

  /**
   * implements Resolve<FirebaseUserModel> /
   * app-routing.module 에서 사용예시 :
   * { path: 'user', component: UserComponent,  resolve: { userData: UserService}}
   */
  resolve(route: ActivatedRouteSnapshot): Promise<FirebaseUserModel> {
    return new Promise((resolve, reject) => {
      this.getCurrentUserInfo().then(
        res => {
          return resolve(res);
        }, err => {
          this.router.navigate(['/login']); // 사용자 정보가 없을 경우 로그인 화면으로 강제 이동한다.
          return reject(err);
        });
    });
  }

  getCurrentUserInfo(): Promise<FirebaseUserModel> {
    const user = new FirebaseUserModel();
    return new Promise((resolve, reject) => {
      this.getCurrentUserRawInfo()
        .then(res => {
          if (res.providerData[0].providerId === 'password') {
            user.image = 'https://via.placeholder.com/400x300'; // TODO : 기본 프로필 이미지 변경
            user.name = res.displayName;
            user.provider = res.providerData[0].providerId;
            this.userInfoUpdated$.emit(user);
            return resolve(user);
          } else {
            user.image = res.photoURL;
            user.name = res.displayName;
            user.provider = res.providerData[0].providerId;
            this.userInfoUpdated$.emit(user);
            return resolve(user);
          }
        }, err => {
          return reject(err);
        });
    });
  }

  getCurrentUserRawInfo(): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      // const user = firebase.auth().onAuthStateChanged
      this.afAuth.onAuthStateChanged
        (rUser => {
          if (rUser) {
            resolve(rUser);
          } else {
            reject('No user logged in'); // TODO: 오류처리방법
          }
        });
    });
  }

  updateCurrentUser(value: { name: string; }): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      const user = firebase.auth().currentUser;
      if (!user) return;
      user.updateProfile({
        displayName: value.name,
        photoURL: user.photoURL
      }).then(res => {
        resolve(res);
      }, err => reject(err));
    });
  }
}
