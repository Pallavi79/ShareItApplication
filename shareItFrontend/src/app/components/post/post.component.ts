import { Component,Input,Output, EventEmitter  } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { HttpClient,HttpHeaders} from '@angular/common/http';
import { LoginService } from 'src/app/services/login.service';
@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent {
  @Input() post: any;
  @Input() showButtons: boolean = false; // New input property
  @Output() update: EventEmitter<any> = new EventEmitter();
  @Output() delete: EventEmitter<any> = new EventEmitter();
  mediaUrl: SafeUrl | undefined;
  private baseURL='http://localhost:8080';
  constructor(private http: HttpClient,private loginService:LoginService) {}
  ngOnInit(): void {
    this.fetchMedia();
  }

  fetchMedia(): void {
    if (this.post.fileName) {
      const headers = new HttpHeaders().set('Authorization', `Bearer ${this.loginService.getToken()}`);
      const mediaUrl = `${this.baseURL}/home/files/${this.post.fileName}`;
      this.http.get(mediaUrl, { headers,responseType: 'blob'}).subscribe((response: Blob) => {
        // Create a temporary URL for the downloaded media
        this.mediaUrl = URL.createObjectURL(response);
      });
    }
  }

  isImageFile(fileUrl: string): boolean {
    return fileUrl.endsWith('.jpg') || fileUrl.endsWith('.jpeg') || fileUrl.endsWith('.png');
  }

  isVideoFile(fileUrl: string): boolean {
    return fileUrl.endsWith('.mp4') || fileUrl.endsWith('.avi') || fileUrl.endsWith('.mov');
  }
  updatePost() {
    // Emit the update event to the parent component
    this.update.emit(this.post);
  }

  deletePost() {
    // Emit the delete event to the parent component
    this.delete.emit(this.post);
  }

}
