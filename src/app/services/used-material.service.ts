import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IUsedMaterial } from '../interfaces/used-material';
import { AuthService } from './auth.service';
import { HttpClientService } from './http-client.service';

@Injectable({
  providedIn: 'root'
})
export class UsedMaterialService {

  constructor(private httpClientService: HttpClientService,
    private authService: AuthService) { }

  getUsedMaterial(planGroupID: string, planID: string): Observable<IUsedMaterial[]>{
    return this.httpClientService.getUsedMaterial(this.authService.signInFactory,planGroupID,planID)
  }

  getUsedMaterialByDateAndFacility(date: string, facility: string): Observable<IUsedMaterial[]>{
    return this.httpClientService.getUsedMaterialByDateAndFacility(this.authService.signInFactory,date,facility)
  }
}
