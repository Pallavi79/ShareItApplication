import { Component,EventEmitter , Output} from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { LoginService } from 'src/app/services/login.service';
import { catchError } from 'rxjs/operators';
import { PopupService } from 'src/app/services/popup.service';
@Component({
  selector: 'app-popup',
  templateUrl: './popup.component.html',
  styleUrls: ['./popup.component.css']
})
export class PopupComponent {
  @Output() close = new EventEmitter<void>();
  title: string = '';
  content: string = '';
  file: File | null = null;


  constructor(private http: HttpClient,private loginService:LoginService, private popupService : PopupService) {}
  // Handle file input as needed
  handleFileInput(event: any): void {
    this.file = event.target.files[0];
  }


  submitPost(): void {
    this.popupService.submitPost(this.title,this.content,this.file);
    this.close.emit();
    window.location.reload();
  //   if (this.title==null || this.title=='' || this.content==null || this.content=='') {
  //     alert("Please fill the missing details")
  //   }else{
  //     // const formData = new FormData();
  //     // formData.append('title', this.title);
  //     // formData.append('content', this.content);
  //     // if(this.file)formData.append('file', this.file);
      
  //     //const headers = new HttpHeaders().set('Authorization', `Bearer ${this.loginService.getToken()}`);

  // //     const headers = new HttpHeaders()
  // // .set('Authorization', `Bearer ${this.loginService.getToken()}`)
  // // //.set('Content-Type', 'multipart/form-data');

  // //     const userId = this.loginService.getUserId(); // Implement a function to extract the user ID from the JWT token

  // //     const postUrl = `http://localhost:8080/home/user/${userId}/post`; // Dynamic URL based on the user ID

  // //     // this.http.post(postUrl, formData, { headers }).subscribe((resultData:any)=>{
  // //     //   console.log(resultData);
  // //     //   //alert("post successful");
  // //     //   this.close.emit();
  // //     // })

  // //     this.http.post(postUrl, formData, { headers }).subscribe({
  // //       next: (resultData: any) => {
  // //         console.log(resultData);
          
  // //         // alert("post successful");
  // //         this.close.emit();
  // //       },
  // //       error: (error: any) => {
  // //         console.error(error);
  // //         alert("An error occurred. Please try again.");
  // //       }
  //  //   });
  //   }
  //   //window.location.reload();
  }
}
