import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { LoginService } from 'src/app/services/login.service';
@Injectable({
  providedIn: 'root'
})
export class UpdatePostServiceService {
  title: string = '';
  content: string = '';
  file: File | null = null;
  id: string='';

  constructor(private http: HttpClient,private loginService:LoginService) {}
  submit(title:any,content:any,file:any){
    console.log(title,content,file);
    const formData = new FormData();
      if(title!=null || title!='')formData.append('title', title);
      if(content!=null || content!='')formData.append('content', content);
      if(file)formData.append('file',file);
      const headers = new HttpHeaders().set('Authorization', `Bearer ${this.loginService.getToken()}`)

      //const userId = this.loginService.getUserId();
      return this.http.put(`http://localhost:8080/home/post/${this.id}`, formData, { headers }).subscribe({
        next: (resultData: any) => {
          console.log(resultData);
          
          //alert("post Updated");
        },
        error: (error: any) => {
          console.error(error);
          alert("An error occurred. Please try again.");
        }
      });
    
    //console.log("post updated");
  }

  updatePost(post:any){
    this.id=post.id;
    this.title=post.title;
    this.content=post.content;
    this.file=post.fileName;
    // console.log(this.id,this.title,this.content,this.file);
    // console.log("post updated");
  }

  deletePost(post:any){
    const postId=post.id;
    const headers = new HttpHeaders().set('Authorization', `Bearer ${this.loginService.getToken()}`)
    return this.http.delete(`http://localhost:8080/home/post/${postId}`, { headers, responseType: 'text' })
    .subscribe({
      next: (resultData: any) => {
        console.log(resultData);
        //alert("post Updated");
      },
      error: (error: any) => {
        console.error(error);
        //alert("An error occurred. Please try again.");
      }
    });
  }
}
