import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { IGenericMaster } from '../interfaces/generic-master';
import { AuthService } from './auth.service';
import { HttpClientService } from './http-client.service';

@Injectable({
  providedIn: 'root',
})
export class GenericMasterService {
  public genericMasterSubject = new BehaviorSubject<IGenericMaster[]>([]);

  public onNotifyGenericMasterChanged(after: IGenericMaster[]) {
    console.log('onNotifyGenericMasterChanged!\n');
    this.genericMasterSubject.next(after);
  }

  constructor(
    private httpClientService: HttpClientService,
    private authService: AuthService
  ) {
    this.getGenericMaster('').subscribe((data) => {
      this.onNotifyGenericMasterChanged(data);
    });
  }

  /**
   * 作業状況一覧を取得
   *
   * @return {*}  {Observable<string[]>}
   * @memberof GenericMasterService
   */
  getWorkStatuses(): Observable<IGenericMaster[]> {
    return this.genericMasterSubject.pipe(
      map((datas) => datas.filter((data) => data.Part === '010'))
    );
  }

  /**
   * 判定合否条件一覧を取得
   *
   * @return {*}  {Observable<string[]>}
   * @memberof GenericMasterService
   */
  getResultOKNGConditions(): Observable<IGenericMaster[]> {
    return this.genericMasterSubject.pipe(
      map((datas) => datas.filter((data) => data.Part === '013'))
    );
  }

  /**
   * 優先度一覧を取得
   *
   * @return {*}  {Observable<string[]>}
   * @memberof GenericMasterService
   */
  getPriorities(): Observable<IGenericMaster[]> {
    return this.genericMasterSubject.pipe(
      map((datas) => datas.filter((data) => data.Part === '006'))
    );
  }

  /**
   * 部署一覧を取得
   *
   * @return {*}  {Observable<string[]>}
   * @memberof GenericMasterService
   */
  getDepartments(): Observable<IGenericMaster[]> {
    return this.genericMasterSubject.pipe(
      map((datas) => datas.filter((data) => data.Part === '003'))
    );
  }

  /**
   * 汎用マスタから工場、codeを元にデータを取得
   *
   * @private
   * @param {string} code
   * @return {*}  {Observable<string[]>}
   * @memberof GenericMasterService
   */
  private getGenericMaster(code: string): Observable<IGenericMaster[]> {
    return this.httpClientService.getGenericMaster(
      this.authService.signInFactory,
      code
    );
  }
}
