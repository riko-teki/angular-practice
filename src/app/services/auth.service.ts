import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AuthUser } from '../classes/authuser';
import { User } from '../classes/user';
import { IUser } from '../interfaces/user';
import { HttpClientService } from './http-client.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  authUser: AuthUser = new AuthUser();

  constructor(
    private router: Router,
    private httpClientService: HttpClientService
  ) {}

  //ユーザーが認証済みかどうか
  isAuthenticated(): boolean {
    return sessionStorage.getItem('userID') != null;
  }

  public get loginedUser(): IUser {
    return {
      Factory: sessionStorage.getItem('factory')?? '',
      ID: sessionStorage.getItem('userID')?? '',
	    Name: sessionStorage.getItem('userName')?? '',
	    ManageClass: sessionStorage.getItem('manageClass')?? '',
	    MailAddress: sessionStorage.getItem('mail')?? '',
	    Department: sessionStorage.getItem('department')?? '',
	    ValidFlag: true,
    }
  }

  //サインイン先の工場を取得する
  public get signInFactory(): string {
    const factory = sessionStorage.getItem('factory');
    if (factory) {
      return factory;
    } else {
      return '';
    }
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

  //サインインユーザーの権限が管理者かどうかを取得する
  public get isManager(): boolean {
    const manageClass = sessionStorage.getItem('manageClass');
    if (manageClass === '0002') {
      return true;
    } else {
      return false;
    }
  }

  /**
   * httpClientを使用してAPIサーバーにサインイン要求
   *
   * @memberof AuthService
   */
  signIn(user: AuthUser, returnUrl: string): void {
    //httpclient呼び出し処理
    this.httpClientService.authUser(user).subscribe((data) => {
      if (data.ID) {
        //ユーザーデータのレスポンスがあった場合はtokenを保存してhome画面へ遷移
        sessionStorage.setItem('factory', data.Factory);
        sessionStorage.setItem('userID', data.ID);
        sessionStorage.setItem('userName', data.Name);
        sessionStorage.setItem('department', data.Department);
        sessionStorage.setItem('mail', data.MailAddress);
        sessionStorage.setItem('manageClass', data.ManageClass);
        this.router.navigateByUrl(returnUrl || '/maintenances-group/' + user.Factory);
      }
    });
  }

  /**
   * localStrageからトークンを消去して、画面をリロード
   *
   * @memberof AuthService
   */
  signOut(): void {
    sessionStorage.clear();
    this.router.navigate(['login']);
  }
}
