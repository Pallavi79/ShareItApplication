package com.example.shareItApplication;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;

@SpringBootApplication
@EnableWebMvc
public class ShareItApplication {

	public static void main(String[] args) {
		SpringApplication.run(ShareItApplication.class, args);
	}

}
