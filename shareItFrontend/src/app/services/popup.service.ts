import { Injectable,EventEmitter , Output } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { LoginService } from 'src/app/services/login.service';

@Injectable({
  providedIn: 'root'
})
export class PopupService {

  constructor(private http: HttpClient,private loginService:LoginService) {}
  

  submitPost(title:any,content:any,file:any){
    if (title==null || title=='') {
          alert("Please fill the missing details")
        }
        else{
      const formData = new FormData();
      formData.append('title', title);
      formData.append('content', content);
      if(file)formData.append('file',file);
    const headers = new HttpHeaders()
   .set('Authorization', `Bearer ${this.loginService.getToken()}`)
  //.set('Content-Type', 'multipart/form-data');

      const userId = this.loginService.getUserId(); // Implement a function to extract the user ID from the JWT token

      const postUrl = `http://localhost:8080/home/user/${userId}/post`; // Dynamic URL based on the user ID

      // this.http.post(postUrl, formData, { headers }).subscribe((resultData:any)=>{
      //   console.log(resultData);
      //   //alert("post successful");
      //   this.close.emit();
      // })

      this.http.post(postUrl, formData, { headers }).subscribe({
        next: (resultData: any) => {
          console.log(resultData);
          
          // alert("post successful");
        },
        error: (error: any) => {
          console.error(error);
          alert("An error occurred. Please try again.");
        }
      });
      //window.location.reload();

        }
    
    }
  
  }

