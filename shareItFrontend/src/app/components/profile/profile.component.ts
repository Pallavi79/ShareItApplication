import { Component,OnInit,ViewChild } from '@angular/core';
import { PostService } from 'src/app/services/post.service';
import { PopupComponent } from 'src/app/components/popup/popup.component'
import { UpdatePostServiceService } from 'src/app/services/update-post-service.service';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit{
  @ViewChild(PopupComponent) popupComponent!: PopupComponent;
  posts: any[]=[];
  showPopup = false;
  currentPage = 0; // Current page number
  pageSize = 10; // Number of items per page
  totalItems = 0; // Total number of items
  totalPages = 0; // Total number of pages
  constructor(private postService: PostService,private updatePostService:UpdatePostServiceService) {}

  ngOnInit(): void {
    this.loadPosts(this.currentPage);
    // this.postService.getPostByUser(this.currentPage, this.pageSize).subscribe((resultData:any)=>{
    //   this.posts = resultData.content;
    // })
  }
  loadPosts(page: number): void {
    this.postService.getPostByUser(page, this.pageSize).subscribe((resultData: any) => {
      this.posts = resultData.content;
      this.totalItems = resultData.totalElements;
      this.totalPages = resultData.totalPages;
    });
  }

  handleUpdatePost(post: any) {
    // Handle the update logic for the post
    this.showPopup = true
    //this.popupService.updatePost(post);
    this.updatePostService.updatePost(post);
    console.log('Update post:', post);
  }

  handleDeletePost(post: any) {
    // Handle the delete logic for the post
    this.updatePostService.deletePost(post);
    window.location.reload();
  }

  //HANDLE PAGINATION
  goToPage(page: number): void {
    if (page >= 0 && page < this.totalPages) {
      this.currentPage = page;
      this.loadPosts(page);
    }
  }
  
  goToNextPage(): void {
    this.goToPage(this.currentPage + 1);
  }
  
  goToPreviousPage(): void {
    this.goToPage(this.currentPage - 1);
  }
  

}
