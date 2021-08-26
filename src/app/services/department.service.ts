import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IDepartment } from '../interfaces/department';
import { HttpClientService } from './http-client.service';

@Injectable({
  providedIn: 'root'
})
export class DepartmentService {

  constructor(private httpClientService: HttpClientService) { }

  getDepartments(): Observable<IDepartment[]>{
    const department = [{
      id: '',
      Factory: '',
      Name: '',
    }]
    return this.httpClientService.get('departments',department)
  }
}
