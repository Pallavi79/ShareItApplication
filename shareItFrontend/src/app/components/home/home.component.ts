import { Component, OnInit  } from '@angular/core';
import { PostService } from 'src/app/services/post.service';
import { SearchService } from 'src/app/services/search.service';


import { Location } from '@angular/common';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit  {

  posts: any[]=[];
  displayedPosts: any[]=[];

  constructor(private postService: PostService,private location: Location,private searchService: SearchService) {}
  currentPage = 0; // Current page number
  pageSize = 5; // Number of items per page
  totalItems = 0; // Total number of items
  totalPages = 0; // Total number of pages

  ngOnInit(): void {

    this.disableBackNavigation();
  this.searchService.getSearchTerm().subscribe((searchTerm: string) => {
    if (searchTerm) {
      this.performSearch(searchTerm);
    } else {
      this.loadPosts(this.currentPage);
    }
  });
    // this.disableBackNavigation();
    // this.loadPosts(this.currentPage);
    // this.searchService.getSearchTerm().subscribe((searchTerm: string) => {
    //   this.performSearch(searchTerm);
    // });
    // this.postService.getAllPosts(this.currentPage, this.pageSize).subscribe((resultData:any)=>{
    //   this.posts = resultData.content;
    // })
  }
  loadPosts(page: number): void {
    this.postService.getAllPosts(page, this.pageSize).subscribe((resultData: any) => {
      this.posts = resultData.content;
      this.totalItems = resultData.totalElements;
      this.totalPages = resultData.totalPages;
    });
  }
  private disableBackNavigation(): void {
    const stateObj = { page: 'home' };
    const title = 'Home';
  
    window.history.replaceState(stateObj, title, this.location.path());
  
    // Listen for the beforeunload event
    window.onbeforeunload = () => {
      // Push a new state again to prevent going back
      window.history.pushState(stateObj, title, this.location.path());
    };
  }

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

  performSearch(searchTerm: string): void {
    // Implement the logic to perform the search using the received search term
    // Update the posts in the HomeComponent based on the search result
    // this.postService.searchPost(this.currentPage, this.pageSize,searchTerm).subscribe(
    //     (resultData: any) => {
    //       this.displayedPosts = resultData;
    //       console.log(this,this.displayedPosts)
    //     }
    //   );
    if (searchTerm) {
      this.postService.searchPost(this.currentPage, this.pageSize,searchTerm).subscribe((resultData: any) => {
        this.posts = resultData;
      });
    } else {
      this.loadPosts(this.currentPage);
    }
  }


  // private disableBackNavigation(): void {
  //   // Modify the browser history by pushing a new state
  //   const stateObj = { page: 'home' };
  //   const title = 'Home';
  //   window.history.pushState(stateObj, title, null);
  
  //   // Listen for the popstate event
  //   window.addEventListener('popstate', (event) => {
  //     // Push a new state again to prevent going back
  //     window.history.pushState(stateObj, title, null);
  //   });
  // }
  // posts: any[] = [];
  // private baseURL='http://localhost:8080';
  // imageUrl: SafeUrl | undefined;
  // constructor(private postService: PostService,private http: HttpClient,private loginService:LoginService,private sanitizer: DomSanitizer) { }
  // ngOnInit(): void {
  //   const pageNumber = 0; 
  //   const pageSize = 10; 
  //   this.postService.getAllPosts(pageNumber, pageSize).subscribe((resultData:any)=>{
  //     this.posts = resultData.content;
  //     console.log(this.posts);
  //     console.log(this.posts[1].id); 
  //     console.log(this.posts[1].title); 
  //     console.log(this.posts[1].content); 
  //     console.log(this.posts[1].fileName); 
  //     console.log(this.posts[1].createdDate);
  //     this.fetchImage(this.posts[1].fileName);
  //   })
  // }

  // fetchImage(imageName: string): void {
  //   const headers = new HttpHeaders().set('Authorization', `Bearer ${this.loginService.getToken()}`);
  //   const imageUrl = `http://example.com/images/${imageName}`; 
  
  //   this.http.get(`${this.baseURL}/home/files/${imageName}`, { headers,responseType: 'blob'}).subscribe((resultData:any)=>{
  //     console.log("fetched image");
  //     const objectUrl = URL.createObjectURL(resultData);
  //     this.imageUrl = this.sanitizer.bypassSecurityTrustUrl(objectUrl);
  //   })
  // }
}
