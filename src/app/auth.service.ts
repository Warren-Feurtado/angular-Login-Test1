import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, catchError, tap, of } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private Base_URL = "http://localhost:6060/login";
  private HTTP_HEADER = {
    headers: new HttpHeaders({'content-type': 'application/json'})
  };

  constructor(private http: HttpClient, private router: Router) { }

  onUserAuth(logForm: any): Observable<any>{
    return this.http.post<any>(`${this.Base_URL}/auth`, logForm, this.HTTP_HEADER).pipe(
      tap((data) => {
        console.log(`Login Successful. Welcome: ${data}`);
        catchError(error => of(data));
      })
    );
  }

  logOut(): void {
    localStorage.removeItem('token');
    this.router.navigate(['/home']);
  };
}
