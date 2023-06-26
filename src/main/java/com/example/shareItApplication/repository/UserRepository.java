package com.example.shareItApplication.repository;

import com.example.shareItApplication.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UserRepository extends JpaRepository<User,String> {
    public Optional<User> findByEmail(String email);
    public Optional<User> findById(String userId);

}
