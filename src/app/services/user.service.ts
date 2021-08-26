import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IUser } from '../interfaces/user';
import { AuthService } from './auth.service';
import { HttpClientService } from './http-client.service';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(
    private httpClientService: HttpClientService,
    private authService: AuthService
  ) {}

  getUsers(): Observable<IUser[]> {
    const users = [
      {
        id: '',
        Factory: '',
        Name: '',
        Department: '',
      },
    ];
    return this.httpClientService.get('users', users);
  }
}
