import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthUser } from 'src/app/classes/authuser';
import { AuthService } from 'src/app/services/auth.service';
/**
 * ログイン画面　
 *
 * @export
 * @class LoginComponent
 * @implements {OnInit}
 */
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

export class LoginComponent implements OnInit {

  /**
   * ログイン先会社名
   *
   * @memberof LoginComponent
   */
  companies = ['SD','FSD','TSD','ISD','DSD','ASD']

  /**
   * ログインユーザー
   *
   * @type {AuthUser}
   * @memberof LoginComponent
   */
  user: AuthUser = new AuthUser();

  /**
   * ログイン後に遷移させるURL
   *
   * @type {string}
   * @memberof LoginComponent
   */
  returnUrl: string ='';

  /**
   * Creates an instance of LoginComponent.
   * @param {AuthService} authService
   * @memberof LoginComponent
   */
  constructor(private authService: AuthService,
    private activatedRoute: ActivatedRoute) {}

  /**
   * コンポーネント初期化時のライフサイクルメソッド
   *
   * @memberof LoginComponent
   */
  ngOnInit(): void {
    this.returnUrl = this.activatedRoute.snapshot.queryParams['returnurl'];
  }

  /**
   * ログインボタンのクリックイベントハンドラ
   * 認証処理を行い、結果によるページ遷移を行う
   *
   * @memberof LoginComponent
   */
  onLoginClicked(): void {
    this.authService.signIn(this.user,this.returnUrl);
  }
}
