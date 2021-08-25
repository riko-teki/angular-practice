import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable, of } from 'rxjs';
import { catchError, share, shareReplay, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { AuthUser } from '../classes/authuser';
import { User } from '../classes/user';
import { IFacility } from '../interfaces/facility';
import { IGenericMaster } from '../interfaces/generic-master';
import { ILocation } from '../interfaces/location';
import { IMaintenanceFile } from '../interfaces/maintenance-file';
import { IMaintenancePlanResult } from '../interfaces/maintenance-plan-result';
import { IMaintenanceResult } from '../interfaces/maintenance-result';
import { IMaterialStock } from '../interfaces/material-stock';
import { IResultMaterial } from '../interfaces/result-material';
import { IResultMaterialSummary } from '../interfaces/result-material-summary';
import { IUsedMaterial } from '../interfaces/used-material';
import { IUser } from '../interfaces/user';

@Injectable({
  providedIn: 'root',
})
export class HttpClientService {

  constructor(private httpClient: HttpClient, private snackBar: MatSnackBar) {}

  /**
   * APIにユーザーがいるか問い合わせる
   *
   * @return {*}  {(Observable<AuthUser> | Error)}
   * @memberof HttpClientService
   */
  authUser(user: AuthUser): Observable<User> {
    return this.httpClient
      .post<User>(environment.authAPI, user)
      .pipe(
        catchError(this.handleError('ログインができませんでした。', new User()))
      );
  }

  getUsersByFactoryAndDept(factory: string, dept: string): Observable<IUser[]> {
    return this.httpClient
      .get<IUser[]>(`${environment.userAPI}?factory=${factory}&dept=${dept}`)
      .pipe(
        catchError(this.handleError('担当者一覧を取得できませんでした。', []))
      );
  }

  getGenericMaster(
    factory: string,
    part: string
  ): Observable<IGenericMaster[]> {
    return this.httpClient
      .get<IGenericMaster[]>(
        `${environment.genericMasterAPI}?factory=${factory}&part=${part}`
      )
      .pipe(
        catchError(
          this.handleError('汎用マスタから値の取り出しができませんでした。', [])
        )
      );
  }

  getLocation(factory: string): Observable<ILocation[]> {
    return this.httpClient
      .get<ILocation[]>(`${environment.locationAPI}?factory=${factory}`)
      .pipe(
        catchError(
          this.handleError('場所マスタから値の取り出しができませんでした。', [])
        )
      );
  }

  getFacility(factory: string,department: string): Observable<IFacility[]> {
    return this.httpClient
      .get<IFacility[]>(`${environment.facilityAPI}?factory=${factory}&department=${department}`)
      .pipe(
        catchError(
          this.handleError('設備マスタから値の取り出しができませんでした。', [])
        )
      );
  }

  getMaterialStock(
    factory: string,
    facility: string
  ): Observable<IMaterialStock[]> {
    return this.httpClient
      .get<IMaterialStock[]>(
        `${environment.materialStockAPI}?factory=${factory}&facility=${facility}`
      )
      .pipe(
        catchError(
          this.handleError(
            '在庫テーブルから値の取り出しができませんでした。',
            []
          )
        )
      );
  }

  getMaintenancePlansResults(
    factory: string,
    date: string = '',
    facilitycode: string = ''
  ): Observable<IMaintenancePlanResult[]> {
    return this.httpClient
      .get<IMaintenancePlanResult[]>(
        `${environment.maintenancePlansResultsAPI}?factory=${factory}&date=${date}&facilitycode=${facilitycode}`
      )
      .pipe(
        catchError(
          this.handleError('メンテナンス計画の取り出しができませんでした。', [])
        )
      );
  }

  postMaintenancePlansResults(body:IMaintenanceResult[]): Observable<any>{
    return this.httpClient.post<any>(`${environment.bulkRegistResultAPI}`,body)
    .pipe(
      tap(data => this.snackBar.open('一括処理を行いました。','閉じる',{duration: 5000})),
      catchError(
        this.handleError('一括処理が失敗しました。',null)
      )
    )
  }

  getUsedMaterial(
    factory: string,
    planGroupID: string,
    planID: string
  ): Observable<IUsedMaterial[]> {
    return this.httpClient
      .get<IUsedMaterial[]>(
        `${environment.usedMaterialAPI}?factory=${factory}&plangroupid=${planGroupID}&planid=${planID}`
      )
      .pipe(
        catchError(
          this.handleError(
            'メンテナンス使用部材の取り出しができませんでした。',
            []
          )
        )
      );
  }

  getUsedMaterialByDateAndFacility(
    factory: string,
    date: string,
    facility: string
  ): Observable<IUsedMaterial[]> {
    return this.httpClient
      .get<IUsedMaterial[]>(
        `${environment.usedMaterialSummaryAPI}?factory=${factory}&date=${date}&facility=${facility}`
      )
      .pipe(
        catchError(
          this.handleError(
            'メンテナンス使用部材の取り出しができませんでした。',
            []
          )
        )
      );
  }

  postRegistResult(body: IResultMaterial): Observable<any> {
    return this.httpClient
      .post(environment.registResultAPI, body, { observe: 'response' })
      .pipe(
        tap((data) => {
          this.snackBar.open(
            `${data.status.toString()}　実績をアップロードしました。`,
            '閉じる',
            {
              duration: 5000,
            }
          );
        }),
        catchError(this.handleError('実績登録が失敗しました。', ''))
      );
  }

  postRegistResultSummary(body: IResultMaterialSummary): Observable<any> {
    return this.httpClient
      .post(environment.registResultSummaryAPI, body, { observe: 'response' })
      .pipe(
        tap((data) => {
          this.snackBar.open(
            `${data.status.toString()}　実績をアップロードしました。`,
            '閉じる',
            {
              duration: 5000,
            }
          );
        }),
        catchError(this.handleError('実績登録が失敗しました。', ''))
      );
  }

  getFiles(
    category: string,
    factory: string,
    planGroupID: string,
    planID: string
  ): Observable<IMaintenanceFile[]> {
    return this.httpClient.get<IMaintenanceFile[]>(
      `${environment.fileAPI}?category=${category}&factory=${factory}&plangroupid=${planGroupID}&planid=${planID}`
    );
  }

  postFiles(
    category: string,
    factory: string,
    planGroupID: string,
    planID: string,
    files: IMaintenanceFile[]
  ): Observable<any> {
    return this.httpClient
      .post<any>(
        `${environment.fileAPI}?category=${category}&factory=${factory}&plangroupid=${planGroupID}&planid=${planID}`,
        files,
        { observe: 'response' }
      )
      .pipe(
        tap((data) => {
          this.snackBar.open(
            `${data.status.toString()}　画像をアップロードしました。`,
            '閉じる',
            {
              duration: 5000,
            }
          );
        }),
        catchError(this.handleError('画像のアップロードが失敗しました。', []))
      );
  }

  getFilesSummary(
    category: string,
    factory: string,
    date: string,
    facility: string
  ): Observable<IMaintenanceFile[]> {
    return this.httpClient.get<IMaintenanceFile[]>(
      `${environment.fileSummaryAPI}?category=${category}&factory=${factory}&date=${date}&facility=${facility}`
    );
  }

  postFilesSummary(
    category: string,
    factory: string,
    date: string,
    facility: string,
    files: IMaintenanceFile[]
  ): Observable<any> {
    return this.httpClient
      .post<any>(
        `${environment.fileSummaryAPI}?category=${category}&factory=${factory}&date=${date}&facility=${facility}`,
        files,
        { observe: 'response' }
      )
      .pipe(
        tap((data) => {
          this.snackBar.open(
            `${data.status.toString()}　画像をアップロードしました。`,
            '閉じる',
            {
              duration: 5000,
            }
          );
        }),
        catchError(this.handleError('画像のアップロードが失敗しました。', []))
      );
  }

  getManualNames(factory: string, facilityCode: string): Observable<string[]> {
    return this.httpClient
      .get<string[]>(
        `${environment.manualNamesAPI}?factory=${factory}&facilitycode=${facilityCode}`
      )
      .pipe(
        catchError(
          this.handleError('手順書のファイル名が取得できませんでした。', [])
        )
      );
  }

  getManual(
    factory: string,
    facilityCode: string,
    fileName: string
  ): Observable<any> {
    return this.httpClient
      .get(
        `${environment.manualAPI}?factory=${factory}&facilitycode=${facilityCode}&filename=${fileName}`,
        { responseType: 'blob' }
      )
      .pipe(
        catchError(this.handleError('手順書が取得できませんでした。', null))
      );
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
