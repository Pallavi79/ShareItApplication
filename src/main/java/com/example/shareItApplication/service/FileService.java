package com.example.shareItApplication.service;

import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.*;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.UUID;

@Service
public class FileService {
    public String uploadFile(String path, MultipartFile file) throws IOException {

        //GET FILE NAME
        String name = file.getOriginalFilename();
        String filePath = path+File.separator+name;

        //CREATE FOLDER IF NOT EXISTS
        File f = new File(path);
        if(!f.exists()) f.mkdir();

        //FILE COPY
        Files.copy(file.getInputStream(), Paths.get(filePath));

        return name;
    }

    public InputStream getResource(String path,String fileName) throws FileNotFoundException {
        String fullPath = path+File.separator+fileName;
        InputStream is = new FileInputStream(fullPath);
        return is;
    }
}
