package com.example.shareItApplication.controller;

import com.example.shareItApplication.dto.PostRequest;
import com.example.shareItApplication.dto.PostResponse;
import com.example.shareItApplication.model.Post;
import com.example.shareItApplication.model.User;
import com.example.shareItApplication.service.AuthService;
import com.example.shareItApplication.service.PostService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/home")
public class PostController {

    @Autowired
    private AuthService authService;
    @Autowired
    private PostService postService;
    @GetMapping("/users")
    public List<User> getUsers(){
        return this.authService.getUsers();
    }

    @GetMapping("/posts")
    public ResponseEntity<PostResponse> getPosts(
            @RequestParam(value="pageNumber",defaultValue ="0",required = false) Integer pageNumber,
            @RequestParam(value="pageSize",defaultValue = "10",required = false) Integer pageSize
    ){

        return this.postService.getPosts(pageNumber,pageSize);
    }

    @GetMapping("/currentUser")
    public String getLoggedInUser(Principal principal){
        return principal.getName();
    }

    @PostMapping("/user/{userId}/post")
    public ResponseEntity<?> createPost(@RequestBody PostRequest postRequest, @PathVariable String userId){
        //return new ResponseEntity<>("Post controller", HttpStatus.CREATED);
        return postService.createPost(postRequest,userId);

    }
    @GetMapping("/user/{userId}/post")
    public ResponseEntity<PostResponse> getPostByUser(
            @PathVariable String userId,
            @RequestParam(value="pageNumber",defaultValue ="0",required = false) Integer pageNumber,
            @RequestParam(value="pageSize",defaultValue = "10",required = false) Integer pageSize){
        //return new ResponseEntity<>("Post controller", HttpStatus.CREATED);
        return postService.findPostByUser(userId,pageNumber,pageSize);
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
    public ResponseEntity<String> updatePost(@RequestBody PostRequest post, @PathVariable Long postId){
        return postService.updatePost(post,postId);
    }


}
