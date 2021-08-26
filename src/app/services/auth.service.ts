import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AuthUser } from '../classes/authuser';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  authUser: AuthUser = new AuthUser();

  constructor(
    private router: Router  ) {}

  //ユーザーが認証済みかどうか
  isAuthenticated(): boolean {
    return sessionStorage.getItem('userID') != null;
  }

    //サインイン先の部署を取得する
    public get signInDept(): string {
      const dept = sessionStorage.getItem('department');
      if (dept) {
        return dept;
      } else {
        return '';
      }
    }

  //サインイン先のユーザーIDを取得する
  public get userID(): string {
    const userID = sessionStorage.getItem('userID');
    if (userID) {
      return userID;
    } else {
      return '';
    }
  }

  /**
   * httpClientを使用してAPIサーバーにサインイン要求
   * 
   *
   * @memberof AuthService
   */
  signIn(user: AuthUser, returnUrl: string): void {
        sessionStorage.setItem('userID', user.ID);
        this.router.navigateByUrl(returnUrl || '/maintenances');
  }

  /**
   * localStrageからトークンを消去して、loginページへ遷移
   *
   * @memberof AuthService
   */
  signOut(): void {
    sessionStorage.clear();
    this.router.navigate(['login']);
  }
}
