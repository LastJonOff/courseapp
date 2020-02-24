import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { tokenNotExpired } from "angular2-jwt";

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json'
  })
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  token: any;
  user: any;

  constructor(
    private http: HttpClient,
  ) { }

  registerUser(user){
    console.log(user);
    return this.http.post('https://internettech.herokuapp.com/account/reg', user, httpOptions);
  }

  authUser(user){
    return this.http.post('https://internettech.herokuapp.com/account/auth', user, httpOptions);
  }

  storeUser(token, user){
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(user));
    this.token = token;
    this.user = user;
  }

  logout(){
    this.token = null;
    this.user = null;

    localStorage.clear();
  }

  isLoggedIn(){
    return tokenNotExpired();
  }

}
