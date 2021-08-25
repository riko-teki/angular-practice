import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AuthService } from './services/auth.service';
import { AccountComponent } from './views/parts/account/account.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  /**
   * サイドナビのメニューを表示するかどうか
   * ログイン済みかどうかで判定する
   *
   * @readonly
   * @type {boolean}
   * @memberof AppComponent
   */
  public get isMenuVisibled(): boolean {
    return this.authService.isAuthenticated();
  }

  /**
   * サインイン先の工場
   *
   * @readonly
   * @type {string}
   * @memberof AppComponent
   */
  public get signInFactory(): string {
    return this.authService.signInFactory;
  }

  /**
   * Creates an instance of AppComponent.
   * @param {AuthService} authService
   * @memberof AppComponent
   */
  constructor(private authService: AuthService, private dialog: MatDialog) {}

  showAccount(): void {
    this.dialog.open(AccountComponent, {
      data: { account: this.authService.loginedUser },
    });
  }

  /**
   * ログアウト処理
   *
   * @memberof AppComponent
   */
  onLogoutClicked(): void {
    this.authService.signOut();
  }
}
