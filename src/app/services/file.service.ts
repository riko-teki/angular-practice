import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IMaintenanceFile } from '../interfaces/maintenance-file';
import { AuthService } from './auth.service';
import { HttpClientService } from './http-client.service';

@Injectable({
  providedIn: 'root'
})
export class FileService {

  constructor(private httpClientService:HttpClientService,
    private authService: AuthService) { }

  getFiles(category: string,planGroupID: string, planID: string): Observable<IMaintenanceFile[]> {
    return this.httpClientService.getFiles(category,this.authService.signInFactory,planGroupID,planID)
  }

  postFiles(category: string,planGroupID: string, planID: string, files:IMaintenanceFile[]):Observable<any>{
    return this.httpClientService.postFiles(category,this.authService.signInFactory, planGroupID, planID, files)
  }

  getFilesSummary(category: string,date: string, facility: string): Observable<IMaintenanceFile[]> {
    return this.httpClientService.getFilesSummary(category,this.authService.signInFactory,date,facility)
  }

  postFilesSummary(category: string,date: string, facility: string, files:IMaintenanceFile[]):Observable<any>{
    return this.httpClientService.postFilesSummary(category,this.authService.signInFactory, date,facility, files)
  }
}
