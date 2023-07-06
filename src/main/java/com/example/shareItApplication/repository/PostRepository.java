package com.example.shareItApplication.repository;

import com.example.shareItApplication.model.Post;
import com.example.shareItApplication.model.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface PostRepository extends JpaRepository<Post,Long> {
    List<Post> getAllByUser(User user);
    @Query("from Post as p where p.user.id=:userId")
    Page<Post> findByUserId(@Param("userId")String userId, Pageable pageable);
    Page<Post> findByTitleContaining(String title,Pageable pageable);
    List<Post> findByTitleContainingIgnoreCase(String searchTerm);
}
