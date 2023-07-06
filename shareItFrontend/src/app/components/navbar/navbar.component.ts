import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';
import { Location } from '@angular/common';
import { PostService } from 'src/app/services/post.service';
import { SearchService } from 'src/app/services/search.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  currentPage = 0; // Current page number
  pageSize = 5; // Number of items per page
  totalItems = 0; // Total number of items
  totalPages = 0; // Total number of pages
  //displayedPosts: any[]=[];
  constructor(private router: Router,private loginService:LoginService,private location: Location,private postService :PostService,private searchService: SearchService){}
  searchTerm='';
  performSearch() {
    // this.postService.searchPost(this.currentPage, this.pageSize, this.searchTerm).subscribe(
    //   (resultData: any) => {
    //     this.displayedPosts = resultData;
    //     console.log(this,this.displayedPosts)
    //   }
    // );
    this.searchService.setSearchTerm(this.searchTerm);
  }
  
  // performSearch(){
  //   this.postService.searchPost(this.currentPage,this.pageSize,this.searchTerm).subscribe((resultData: any) => {
  //     this.posts = resultData;
  //     console.log(this,this.posts)
  //   });
  //   //console.log('Performing search for:', this.searchTerm);
  // }
  redirectToHome() {
    this.router.navigate(['/home']); // Replace '/home' with the actual route path for your home page
  }
  
  logout(){
    this.loginService.logout();
    this.router.navigate(['/']);
    this.location.replaceState('/');
  }
  redirectToProfile(){
    //alert("redirected to profile page")
    this.router.navigate(['/profile']);
  }
  showPopup = false;

  //ADD POST POPUP

  // showPostPopup = false;
  // postTitle = '';
  // postContent = '';

  // openPostPopup(): void {
  //   this.showPostPopup = true;
  // }

  // closePostPopup(): void {
  //   this.showPostPopup = false;
  //   this.postTitle = '';
  //   this.postContent = '';
  // }

  // submitPost(): void {
  //   // Add your logic here to handle post submission
  //   console.log('Post submitted:', this.postTitle, this.postContent);
  //   this.closePostPopup();
  // }

  // onFileChange(event: any): void {
  //   // Add your logic here to handle file attachment
  //   const fileList: FileList = event.target.files;
  //   console.log('File attached:', fileList);
  // }


}
