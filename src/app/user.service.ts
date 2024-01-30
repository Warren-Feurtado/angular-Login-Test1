import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, catchError, tap, of } from 'rxjs';
import { UserModel } from './models/user.model';
import { log } from 'console';

@Injectable({
  providedIn: 'root'
})
export class FormsService {

  private Base_URL = "http://localhost:6060/users";
  private HTTP_HEADER = {
    headers: new HttpHeaders({'content-type': 'application/json'})
  };

  constructor(private http: HttpClient) { }

  onGetUsers(): Observable<UserModel[]>{
    return this.http.get<UserModel[]>(this.Base_URL).pipe(
      tap((users) => {
        console.log(`Users retreived: ${users}`),
        catchError(error => of([]))
        
      })
    );
  };

  onGetUserById(id: string): Observable<UserModel>{
    return this.http.get<UserModel>(`${this.Base_URL}/${id}`).pipe(
      tap((user) => { 
        console.log(`User retreived: ${user}`),

        catchError(error => of([]))
        
      })
    );
  };
  
  onAddUser(userData: UserModel): Observable<UserModel | any> {
    return this.http.post<UserModel>(`${this.Base_URL}`, userData, this.HTTP_HEADER).pipe(
      tap((data) => {
        console.log('User Added');
        
        catchError(error => of(data));
      })
    );
  }
  
  onEditUser(id: string, user: UserModel): Observable<UserModel> {
    return this.http.patch<UserModel>(`${this.Base_URL}/${id}`, user, this.HTTP_HEADER).pipe(
      tap((editedUser) => {
        console.log(`User updated: ${editedUser}`);
        catchError(error => of(editedUser))
        
      })
    );
  };

  onDeleteUser() {};
}
