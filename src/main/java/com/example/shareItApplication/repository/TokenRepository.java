package com.example.shareItApplication.repository;

import com.example.shareItApplication.model.Token;
import com.example.shareItApplication.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface TokenRepository extends JpaRepository<Token,Integer> {

    List<Token> findValidTokenByUser(User user);

    Optional<Token> findByToken(String token);
}
