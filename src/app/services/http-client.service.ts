import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { MaintenancePlanResult } from '../classes/maintenance-plan-result';
import { IMaintenancePlanResult } from '../interfaces/maintenance-plan-result';

@Injectable({
  providedIn: 'root',
})
export class HttpClientService {
  constructor(private httpClient: HttpClient, private snackBar: MatSnackBar) {}

  getMaintenancePlanResult(): Observable<IMaintenancePlanResult[]> {
    return this.httpClient
      .get<IMaintenancePlanResult[]>(environment.APIMockURL + 'maintenances')
      .pipe(catchError(this.handleError('メンテナンス予実取得処理', [])));
  }
  getMaintenancePlanResultByID(id: string): Observable<IMaintenancePlanResult> {
    return this.httpClient
      .get<IMaintenancePlanResult>(environment.APIMockURL + `maintenances/${id}`)
      .pipe(catchError(this.handleError('メンテナンス予実取得処理', new MaintenancePlanResult)));
  }

  get<T>(path: string, resType: T): Observable<T>{
    return this.httpClient.get<T>(environment.APIMockURL + path)
    .pipe(catchError(this.handleError(path,resType)));
  }

  /**
   * httpリクエストのcatchError時のエラーハンドル
   *
   * @private
   * @template T
   * @param {string} [operation='operation']
   * @param {T} [result]
   * @return {*}
   * @memberof HttpclientService
   */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: HttpErrorResponse): Observable<T> => {
      console.error(error);
      this.snackBar.open(
        `${operation} message:${error.error.Message}`,
        '閉じる',
        { duration: 5000 }
      );
      return of(result as T);
    };
  }
}
