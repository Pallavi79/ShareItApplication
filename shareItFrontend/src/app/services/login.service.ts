import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http:HttpClient) { }

  doLogin(loginData:any){
    return this.http.post("http://localhost:8080/auth/login",loginData);
  }

  doSignup(signupData:any){
    return this.http.post("http://localhost:8080/auth/signup",signupData);
  }

  logout(){
    const headers = new HttpHeaders().set('Authorization', `Bearer ${this.getToken()}`);
    this.http.post("http://localhost:8080/logout",{ headers })
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    localStorage.removeItem('userId')
  }

  getToken(){
    return localStorage.getItem('token');
  }

  getUser(){
    return localStorage.getItem('user');
  }

  getUserId(){
    return localStorage.getItem('userId');
  }
}
