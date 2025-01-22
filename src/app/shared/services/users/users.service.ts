import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, throwError } from 'rxjs';
import { BASE_URL_API } from '../../constants/constants';
import { IUser } from '../../interfaces/user.interface';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  
  constructor (private http: HttpClient) {}
  
  getUsers(): Observable<IUser[]> {
    return this.http.get<IUser[]>(`${BASE_URL_API}/users`).pipe(
      map(users => users),
      catchError(err => {
        console.error('Error fetching users:', err);
        return throwError(() => new Error('Failed to fetch users'));
      })
    );
  }

  getUserbyId(id: number): Observable<IUser> {
    return this.http.get<IUser>(`${BASE_URL_API}/users/${id}`).pipe(
      map(user => user),
      catchError(err => {
        console.error(`Error fetching user with ID ${id}:`, err);
        return throwError(() => new Error('Failed to fetch user by ID'));
      })
    );
  }
}
