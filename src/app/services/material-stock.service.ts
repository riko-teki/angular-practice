import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { IMaterialStock } from '../interfaces/material-stock';
import { AuthService } from './auth.service';
import { HttpClientService } from './http-client.service';

@Injectable({
  providedIn: 'root'
})
export class MaterialStockService {

  constructor(private httpClientService: HttpClientService,
    private authService:AuthService) { }

  getMaterialStockByFactoryAndFaclility(facilityCode: string): Observable<IMaterialStock[]> {
    return this.httpClientService.getMaterialStock(this.authService.signInFactory,facilityCode)
  }
}
