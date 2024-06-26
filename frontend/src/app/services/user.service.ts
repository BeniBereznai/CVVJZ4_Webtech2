import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
import { User } from "../models/user";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private apiUrl = 'http://localhost:3000/users';

  constructor(private http: HttpClient) { }

  getAllUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.apiUrl);
  }

  getCurrentUser(): Observable<User> {
    const token = localStorage.getItem('jwt');
    if (!token) {
      throw new Error('No JWT token found');
    }
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get<User>(`${this.apiUrl}/me`, { headers });
  }
  updateUserPwd(pwd: string): Observable<any> {
    const token = localStorage.getItem('jwt');
    if (!token) {
      throw new Error('No JWT token found');
    }
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    return this.http.put<any>(`${this.apiUrl}`, { password: pwd }, {headers});
  }

  deleteUser(): Observable<void> {
    const token = localStorage.getItem('jwt');
    if (!token) {
      throw new Error('No JWT token found');
    }
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    localStorage.removeItem('jwt');

    return this.http.delete<void>(`${this.apiUrl}`,{headers});
  }
}
