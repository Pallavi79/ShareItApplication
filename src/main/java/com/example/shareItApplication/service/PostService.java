package com.example.shareItApplication.service;

import com.example.shareItApplication.dto.PostRequest;
import com.example.shareItApplication.model.Post;
import com.example.shareItApplication.model.User;
import com.example.shareItApplication.repository.PostRepository;
import com.example.shareItApplication.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;
import java.util.Optional;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

@Service
public class PostService {

    @Autowired
    private PostRepository postRepository;

    @Autowired
    private UserRepository userRepository;
    @Autowired
    private UserDetailsService userDetailsService;
    private Logger logger = LoggerFactory.getLogger(PostService.class);

        public List<Post> getPosts(){
            return postRepository.findAll();
        }


    private User findUserById(String userId){
        Optional<User> user = this.userRepository.findById(userId);
        if(!user.isPresent()){
            throw new RuntimeException("Please create a profile to post");
        }
        UserDetails userDetails = userDetailsService.loadUserByUsername(user.get().getEmail());
        User foundUser = (User)userDetails;
        return foundUser;
    }

    public ResponseEntity<String> createPost(PostRequest postRequest, String userId){
        User user = findUserById(userId);
        //savePost(postRequest,user);
        var post = Post.builder()
                .title(postRequest.getTitle())
                .content(postRequest.getContent())
                .user(user)
                .fileName("default.jpg")
                .createdDate(new Date())
                .build();
        postRepository.save(post);
        return new ResponseEntity<>("Post is saved", HttpStatus.CREATED);
    }
    private void savePost(PostRequest postRequest,User user) {
        var post = Post.builder()
                .title(postRequest.getTitle())
                .content(postRequest.getContent())
                .user(user)
                .fileName("default.png")
                .createdDate(new Date())
                .build();
        postRepository.save(post);
    }


    public ResponseEntity<List<Post>> findPostByUser(String userId){
        User user = findUserById(userId);
        //List<Post> posts = postRepository.getAllByUser(user);
        return new ResponseEntity<>(postRepository.getAllByUser(user),HttpStatus.OK);
    }

    public ResponseEntity<Optional<Post>> getPostById(Integer postId){
            return new ResponseEntity<>(postRepository.findById(postId),HttpStatus.OK);
    }
    public ResponseEntity<String> deletePost(Integer postId){
            postRepository.findById(postId).orElseThrow(()->new RuntimeException("Post not found"));
            postRepository.deleteById(postId);
            return new ResponseEntity<>("Post deleted Successfully",HttpStatus.OK);
    }

    public ResponseEntity<String> updatePost(PostRequest postRequest, Integer postId){
        Post post = postRepository.findById(postId).orElseThrow(()->new RuntimeException("Post not found"));
        post.setTitle(postRequest.getTitle());
        post.setContent(postRequest.getContent());
        post.setFileName(postRequest.getFileName());
        postRepository.save(post);
        return new ResponseEntity<>("Post is saved", HttpStatus.CREATED);
    }




}
