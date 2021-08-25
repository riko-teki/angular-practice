import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IUser } from '../interfaces/user';
import { AuthService } from './auth.service';
import { HttpClientService } from './http-client.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private httpClientService: HttpClientService,
    private authService: AuthService) { }

  getUsersByFactoryAndDept(): Observable<IUser[]> {
    return this.httpClientService.getUsersByFactoryAndDept(this.authService.signInFactory, this.authService.signInDept)
  }

}
