import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IResultMaterial } from '../interfaces/result-material';
import { IResultMaterialSummary } from '../interfaces/result-material-summary';
import { HttpClientService } from './http-client.service';

@Injectable({
  providedIn: 'root'
})
export class RegistResultService {

  
  constructor(private httpClientService: HttpClientService) { }

  postRegistResult(resultMaterial: IResultMaterial): Observable<any>{
    return this.httpClientService.postRegistResult(resultMaterial)
  }

  postRegistResultSummary(resultMaterials: IResultMaterialSummary): Observable<any>{
    return this.httpClientService.postRegistResultSummary(resultMaterials)
  }
}
