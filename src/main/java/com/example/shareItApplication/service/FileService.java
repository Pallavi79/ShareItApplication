package com.example.shareItApplication.service;

import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.*;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.UUID;

@Service
public class FileService {
//    public String uploadFile(String path, MultipartFile file) throws IOException {
//
//        //GET FILE NAME
//        String name = file.getOriginalFilename();
//        String filePath = path+File.separator+name;
//
//        //CREATE FOLDER IF NOT EXISTS
//        File f = new File(path);
//        if(!f.exists()) f.mkdir();
//
//        //FILE COPY
//        Files.copy(file.getInputStream(), Paths.get(filePath));
//
//        return name;
//    }
//public String uploadFile(String path, MultipartFile file) throws IOException {
//    // Get the file name
//    String name = file.getOriginalFilename();
//    String filePath = path + File.separator + name;
//
//    // Create the folder if it doesn't exist
//    File folder = new File(path);
//    if (!folder.exists()) {
//        folder.mkdir();
//    }
//
//    // Save the file
////    try (InputStream inputStream = file.getInputStream();
////         OutputStream outputStream = new FileOutputStream(filePath)) {
////        byte[] buffer = new byte[1024];
////        int bytesRead;
////        while ((bytesRead = inputStream.read(buffer)) != -1) {
////            outputStream.write(buffer, 0, bytesRead);
////        }
////    }
//    Files.copy(file.getInputStream(), Paths.get(filePath),StandardCopyOption.REPLACE_EXISTING);
//
//    return name;
//}

    public String uploadFile(String path, MultipartFile file) throws IOException {
        // Get the file name
        String name = file.getOriginalFilename();
        String extension = getFileExtension(name);
        String uniqueFileName = generateUniqueFileName(extension);
        String filePath = path + File.separator + uniqueFileName;

        // Create the folder if it doesn't exist
        File folder = new File(path);
        if (!folder.exists()) {
            folder.mkdir();
        }

        // Save the file
        Files.copy(file.getInputStream(), Paths.get(filePath), StandardCopyOption.REPLACE_EXISTING);

        return uniqueFileName;
    }

    private String getFileExtension(String fileName) {
        int dotIndex = fileName.lastIndexOf(".");
        if (dotIndex > 0 && dotIndex < fileName.length() - 1) {
            return fileName.substring(dotIndex + 1);
        }
        return "";
    }

    private String generateUniqueFileName(String extension) {
        // Generate a unique file name using UUID or any other desired approach
        return UUID.randomUUID().toString() + "." + extension;
    }



    public InputStream getResource(String path,String fileName) throws FileNotFoundException {
        String fullPath = path+File.separator+fileName;
        InputStream is = new FileInputStream(fullPath);
        return is;
    }
}
