package com.example.shareItApplication.repository;

import com.example.shareItApplication.model.Post;
import com.example.shareItApplication.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface PostRepository extends JpaRepository<Post,Integer> {
    List<Post> getAllByUser(User user);
}
