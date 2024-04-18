import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, tap, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  url = 'https://reqres.in/api/login';
  http = inject(HttpClient);
  options = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }

  login(data: any) {
    return this.http.post(this.url, data, this.options).pipe(
      tap(result => this.save_token(result)),
      catchError(error => throwError(() => `Wrong username or password - ${error.message}`))
    );
  }

  private save_token(authData: any) {
    console.log(authData.token)
    localStorage.setItem('token', authData.token)
  }

  router = inject(Router)

  logout() {
    localStorage.clear(); // removeItem
    this.router.navigate(['login']);
  }

}
