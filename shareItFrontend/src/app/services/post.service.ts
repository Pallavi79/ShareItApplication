import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders} from '@angular/common/http';
import { LoginService } from 'src/app/services/login.service';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class PostService {
  private apiUrl = 'http://localhost:8080/home';
  private baseURL='http://localhost:8080';

  constructor(private http: HttpClient,private loginService:LoginService) {}
  //private userId = this.loginService.getUserId;

  getPosts(pageNumber: number, pageSize: number) {
    // const headers = new HttpHeaders().set('Authorization', `Bearer ${this.loginService.getToken()}`);
    // const url = `${this.apiUrl}/post?page=${pageNumber}&size=${pageSize}`;
    // const params = {
    //   pageNumber: pageNumber.toString(),
    //   pageSize: pageSize.toString()
    // };
    //Observable<any[]>
    // return this.http.get<any[]>(url, { headers, params });
    console.log(pageNumber,pageSize);
    const headers = new HttpHeaders().set('Authorization', `Bearer ${this.loginService.getToken()}`);
    const params = {
      pageNumber: pageNumber.toString(),
      pageSize: pageSize.toString()
    };
    console.log(headers)
    console.log(params)
    this.http.get(`${this.baseURL}/home/post`, { headers, params }).subscribe((resultData:any)=>{
      console.log("data came");
    })
  }

  getAllPosts(pageNumber: number, pageSize: number) {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${this.loginService.getToken()}`);

    const params = {
      pageNumber: pageNumber.toString(),
      pageSize: pageSize.toString()
    };

    return this.http.get<any[]>(`${this.baseURL}/home/post`, { headers, params });
  }

  getPostByUser(pageNumber: number, pageSize: number): Observable<any> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${this.loginService.getToken()}`);
    const params = {
      pageNumber: pageNumber.toString(),
      pageSize: pageSize.toString()
    };

    return this.http.get<any[]>(`http://localhost:8080/home/user/${this.loginService.getUserId()}/post`, { headers, params });

  }

  searchPost(pageNumber: number, pageSize: number,searchTerm: string):Observable<any> {
    console.log(searchTerm)
    const headers = new HttpHeaders().set('Authorization', `Bearer ${this.loginService.getToken()}`);
    const params = {
      pageNumber: pageNumber.toString(),
      pageSize: pageSize.toString(),
      searchTerm:searchTerm
    };
    return this.http.get<any[]>(`http://localhost:8080/home/post/search`, { headers, params });

  }
}
