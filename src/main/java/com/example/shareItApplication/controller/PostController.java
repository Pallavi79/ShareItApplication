package com.example.shareItApplication.controller;

import com.example.shareItApplication.config.AppConstants;
import com.example.shareItApplication.dto.PostRequest;
import com.example.shareItApplication.dto.PostResponse;
import com.example.shareItApplication.model.Post;
import com.example.shareItApplication.model.User;
import com.example.shareItApplication.service.AuthService;
import com.example.shareItApplication.service.FileService;
import com.example.shareItApplication.service.PostService;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.util.StreamUtils;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.FileNotFoundException;
import java.io.IOException;
import java.io.InputStream;
import java.security.Principal;
import java.sql.SQLException;
import java.util.Date;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/home")
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class PostController {

    @Autowired
    private AuthService authService;
    @Autowired
    private PostService postService;

    @Autowired
    private FileService fileService;
    @GetMapping("/users")
    public List<User> getUsers(){
        return this.authService.getUsers();
    }
//    @Value("${uploadDir}")
//    private String path;

    @Value("${uploadDir}")
    private String path;

    @GetMapping("/post")
    public ResponseEntity<PostResponse> getPosts(
            @RequestParam(value="pageNumber",defaultValue = AppConstants.PAGE_NUMBER,required = false) Integer pageNumber,
            @RequestParam(value="pageSize",defaultValue = AppConstants.PAGE_SIZE,required = false) Integer pageSize,
            @RequestParam(value="sortBy",defaultValue=AppConstants.SORT_BY,required=false) String sortBy
    ){

        return this.postService.getPosts(pageNumber,pageSize,sortBy);
    }

    @GetMapping("/currentUser")
    public String getLoggedInUser(Principal principal){
        return principal.getName();
    }
    @PostMapping("/user/{userId}/post")
    public ResponseEntity<Post> createPost(
            @RequestParam(value = "file", required = false) MultipartFile file,
            @RequestParam("title") String title,
            @RequestParam("content") String content,
            @PathVariable String userId
    ) {
        try {
            Post post = postService.createPost(file, title, content,userId);
            return ResponseEntity.ok(post);
        } catch (IOException e) {
            // Handle the exception
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

//    @PostMapping("/user/{userId}/post")
//    public ResponseEntity<?> createPost(@RequestBody PostRequest postRequest, @PathVariable String userId){
//        //return new ResponseEntity<>("Post controller", HttpStatus.CREATED);
//        return postService.createPost(postRequest,userId);
//
//    }

    @GetMapping("/user/{userId}/post")
    public ResponseEntity<PostResponse> getPostByUser(
            @PathVariable String userId,
            @RequestParam(value="pageNumber",defaultValue =AppConstants.PAGE_NUMBER,required = false) Integer pageNumber,
            @RequestParam(value="pageSize",defaultValue =AppConstants.PAGE_SIZE,required = false) Integer pageSize,
            @RequestParam(value="sortBy",defaultValue=AppConstants.SORT_BY,required=false) String sortBy){
        //return new ResponseEntity<>("Post controller", HttpStatus.CREATED);
        return postService.findPostByUser(userId,pageNumber,pageSize,sortBy);
    }

    @GetMapping("/post/{postId}")
    public ResponseEntity<Optional<Post>> getPostById(@PathVariable Long postId){
        return postService.getPostById(postId);
    }

    @DeleteMapping("/post/{postId}")
    public ResponseEntity<String> deletePost(@PathVariable Long postId){
        return postService.deletePost(postId);
    }

    @PutMapping("/post/{postId}")
    public ResponseEntity<Post> updatePost(
            @RequestParam(value = "file", required = false) MultipartFile file,
            @RequestParam(value = "title", required = false) String title,
            @RequestParam(value="content",required = false) String content,
            @PathVariable Long postId
    ) {
        try {
            Post post = postService.updatePost(file, title, content,postId);
            return ResponseEntity.ok(post);
        } catch (IOException e) {
            // Handle the exception
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

//    @GetMapping("/post/search/{keyWords}")
//    public ResponseEntity<PostResponse> searchPostByTitle(
//            @PathVariable("keyWords") String keyWords,
//            @RequestParam(value="pageNumber",defaultValue =AppConstants.PAGE_NUMBER,required = false) Integer pageNumber,
//            @RequestParam(value="pageSize",defaultValue =AppConstants.PAGE_SIZE,required = false) Integer pageSize,
//            @RequestParam(value="sortBy",defaultValue=AppConstants.SORT_BY,required=false) String sortBy){
//        return postService.searchPosts(keyWords,pageNumber,pageSize,sortBy);
//    }
    @GetMapping("post/search")
    public ResponseEntity<List<Post>> search(
            @RequestParam(value="pageNumber",defaultValue =AppConstants.PAGE_NUMBER,required = false) Integer pageNumber,
            @RequestParam(value="pageSize",defaultValue =AppConstants.PAGE_SIZE,required = false) Integer pageSize,
            @RequestParam("searchTerm") String searchTerm) {
        List<Post> searchResults = postService.findByTitle(searchTerm);
        return ResponseEntity.ok(searchResults);
    }

//    @PostMapping("post/upload/{postId}")
//    public ResponseEntity<String> uploadPostFile(
//            @RequestParam MultipartFile file,
//            @PathVariable Long postId
//    ) throws IOException {
//        String fileName = fileService.uploadFile(path,file);
//    }


    @GetMapping("/files/{filename}")
    public void downloadImage(
            @PathVariable String filename,
            HttpServletResponse response
    ) throws IOException {

        InputStream resource = this.fileService.getResource(path,filename);
//        MediaType mediaType = determineMediaType(filename);
        response.setContentType(MediaType.ALL_VALUE);
        StreamUtils.copy(resource,response.getOutputStream());
    }
}
