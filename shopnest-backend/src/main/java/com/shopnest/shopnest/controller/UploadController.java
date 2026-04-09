package com.shopnest.shopnest.controller;

import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.util.UUID;

@RestController
@RequestMapping("/admin")
@CrossOrigin("*")
public class UploadController {

    // Absolute path to uploads folder
    private final String uploadDir = System.getProperty("user.dir") + "/uploads/";

    @PostMapping("/upload")
    public String uploadImage(@RequestParam("file") MultipartFile file) throws IOException {

        // Create uploads folder if not exists
        File folder = new File(uploadDir);
        if (!folder.exists()) {
            folder.mkdirs();
        }

        // Generate unique filename
        String fileName = UUID.randomUUID() + "_" + file.getOriginalFilename();

        // Full path
        String filePath = uploadDir + fileName;

        File dest = new File(filePath);

        // Save file
        file.transferTo(dest);

        // Return URL for frontend
        return "/images/" + fileName;
    }
}