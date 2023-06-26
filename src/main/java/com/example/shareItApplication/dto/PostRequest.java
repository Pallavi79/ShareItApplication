package com.example.shareItApplication.dto;

import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
@ToString
public class PostRequest {

    String title;
    String content;

    String fileName;
}
