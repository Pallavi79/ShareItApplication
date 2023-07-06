import { Component,EventEmitter , Output} from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { LoginService } from 'src/app/services/login.service';
import { UpdatePostServiceService } from 'src/app/services/update-post-service.service';
@Component({
  selector: 'app-update-post-popup',
  templateUrl: './update-post-popup.component.html',
  styleUrls: ['./update-post-popup.component.css']
})
export class UpdatePostPopupComponent {
  @Output() close = new EventEmitter<void>();
  title: string = '';
  content: string = '';
  file: File | null = null;


  constructor(private http: HttpClient,private updateService:UpdatePostServiceService) {}
  // Handle file input as needed
  handleFileInput(event: any): void {
    this.file = event.target.files[0];
  }


  submitPost(): void {
    //this.popupService.submitPost(this.title,this.content,this.file);
    this.updateService.submit(this.title,this.content,this.file);
    this.close.emit();
    window.location.reload();
  }
}
