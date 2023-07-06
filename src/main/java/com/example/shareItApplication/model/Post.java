package com.example.shareItApplication.model;

import jakarta.persistence.*;
import lombok.*;

import java.util.Date;

@Builder
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Entity
@ToString
public class Post {
    @Id
    @GeneratedValue
    private Long id;

    @NonNull
    private String title;
    @Lob
    @Column(columnDefinition = "LONGTEXT")
    private String content;
    private String fileName;
    private Date createdDate;
    @ManyToOne
    @JoinColumn(name="userId")
    private User user;
}
