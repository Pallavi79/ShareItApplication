package com.example.shareItApplication.service;

import com.example.shareItApplication.dto.PostRequest;
import com.example.shareItApplication.dto.PostResponse;
import com.example.shareItApplication.model.Post;
import com.example.shareItApplication.model.User;
import com.example.shareItApplication.repository.PostRepository;
import com.example.shareItApplication.repository.UserRepository;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import jakarta.websocket.Session;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.stereotype.Service;

import java.io.File;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.io.InputStream;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.sql.Blob;
import java.sql.Connection;
import java.sql.SQLException;
import java.util.Date;
import java.util.List;
import java.util.Optional;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.multipart.MultipartFile;

@Service
public class PostService {

    @Autowired
    private PostRepository postRepository;

    @Autowired
    private UserRepository userRepository;
    @Autowired
    private UserDetailsService userDetailsService;
    @Autowired
    private FileService fileService;

    @Value("${uploadDir}")
    private String path;
    private Logger logger = LoggerFactory.getLogger(PostService.class);

    public ResponseEntity<PostResponse> getPosts(Integer pageNumber, Integer pageSize,String sortBy){
        Pageable p = PageRequest.of(pageNumber,pageSize,Sort.by(sortBy).descending());
        Page<Post> pagePost = postRepository.findAll(p);
        List<Post> allPost = pagePost.getContent();
        PostResponse postResponse = new PostResponse();
        postResponse.setContent(allPost);
        postResponse.setPageNumber(pagePost.getNumber());
        postResponse.setPageSize(pagePost.getSize());
        postResponse.setTotalElements(pagePost.getTotalElements());
        postResponse.setTotalPages(pagePost.getTotalPages());
        postResponse.setLastPage(pagePost.isLast());
        return new ResponseEntity<>(postResponse,HttpStatus.OK);
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

    public Post createPost(MultipartFile file, String title, String content,String userId) throws IOException {
        User user = findUserById(userId);
        Post post = new Post();
        post.setTitle(title);
        post.setContent(content);
        post.setUser(user);
        post.setCreatedDate(new Date());
        if (file != null && !file.isEmpty()) {
            String fileName = fileService.uploadFile(path,file);
            post.setFileName(fileName);
        }

        return postRepository.save(post);
    }

//    public ResponseEntity<String> createPost(PostRequest postRequest, String userId){
//        User user = findUserById(userId);
//        //savePost(postRequest,user);
//        var post = Post.builder()
//                .title(postRequest.getTitle())
//                .content(postRequest.getContent())
//                .user(user)
//                .fileName("default.jpg")
//                .createdDate(new Date())
//                .build();
//        postRepository.save(post);
//        return new ResponseEntity<>("Post is saved", HttpStatus.CREATED);
//    }
//    private void savePost(PostRequest postRequest,User user) {
//        var post = Post.builder()
//                .title(postRequest.getTitle())
//                .content(postRequest.getContent())
//                .user(user)
//                .fileName("default.png")
//                .createdDate(new Date())
//                .build();
//        postRepository.save(post);
//    }


    public ResponseEntity<PostResponse> findPostByUser(String userId,Integer pageNumber, Integer pageSize,String sortBy){
        //User user = findUserById(userId);
        //List<Post> posts = postRepository.getAllByUser(user);
        //return new ResponseEntity<>(postRepository.getAllByUser(user),HttpStatus.OK);
        User user=findUserById(userId);
        if(user==null){
            throw new RuntimeException("Please create an user profile");
        }
        Pageable p = PageRequest.of(pageNumber,pageSize,Sort.by(sortBy).descending());
        Page<Post> pagePost = postRepository.findByUserId(userId,p);
        List<Post> allPost = pagePost.getContent();
        PostResponse postResponse = new PostResponse();
        postResponse.setContent(allPost);
        postResponse.setPageNumber(pagePost.getNumber());
        postResponse.setPageSize(pagePost.getSize());
        postResponse.setTotalElements(pagePost.getTotalElements());
        postResponse.setTotalPages(pagePost.getTotalPages());
        postResponse.setLastPage(pagePost.isLast());
        return new ResponseEntity<>(postResponse,HttpStatus.OK);
    }

    public ResponseEntity<Optional<Post>> getPostById(Long postId){
        return new ResponseEntity<>(postRepository.findById(postId),HttpStatus.OK);
    }
    public ResponseEntity<String> deletePost(Long postId){
        postRepository.findById(postId).orElseThrow(()->new RuntimeException("Post not found"));
        postRepository.deleteById(postId);
        return new ResponseEntity<>("Post deleted Successfully",HttpStatus.OK);
    }

    public Post updatePost(MultipartFile file, String title, String content, Long postId) throws IOException {
        Post post = postRepository.findById(postId).orElseThrow(()->new RuntimeException("Post not found"));
        if(title!=null)post.setTitle(title);
        if(content!=null)post.setContent(content);
        post.setCreatedDate(new Date());
        if (file != null && !file.isEmpty()) {
            String fileName = fileService.uploadFile(path,file);
            post.setFileName(fileName);
        }
        return postRepository.save(post);
    }

    public ResponseEntity<PostResponse> searchPosts(String keyWord,Integer pageNumber, Integer pageSize,String sortBy){
        Pageable p = PageRequest.of(pageNumber,pageSize,Sort.by(sortBy).descending());
        Page<Post> pagePost = postRepository.findByTitleContaining(keyWord,p);
        List<Post> allPost = pagePost.getContent();
        PostResponse postResponse = new PostResponse();
        postResponse.setContent(allPost);
        postResponse.setPageNumber(pagePost.getNumber());
        postResponse.setPageSize(pagePost.getSize());
        postResponse.setTotalElements(pagePost.getTotalElements());
        postResponse.setTotalPages(pagePost.getTotalPages());
        postResponse.setLastPage(pagePost.isLast());
        return new ResponseEntity<>(postResponse,HttpStatus.OK);
        //return new ResponseEntity<>(postRepository.findByTitleContaining(keyWord),HttpStatus.OK);
    }

    public List<Post> findByTitle(String searchTerm){
        List<Post> searchResults=postRepository.findByTitleContainingIgnoreCase(searchTerm);
        return searchResults;
    }


}