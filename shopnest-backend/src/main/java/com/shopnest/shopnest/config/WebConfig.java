package com.shopnest.shopnest.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import java.nio.file.Files;
import java.nio.file.Path;

@Configuration
public class WebConfig implements WebMvcConfigurer {

    @Override
    public void addResourceHandlers(ResourceHandlerRegistry registry) {

        registry.addResourceHandler("/images/**")
                .addResourceLocations(getUploadLocation());
    }

    private String getUploadLocation() {
        Path workingDirectory = Path.of(System.getProperty("user.dir"));
        Path uploadDirectory = workingDirectory.resolve("uploads");

        if (!Files.exists(uploadDirectory)) {
            uploadDirectory = workingDirectory.resolve("shopnest-backend").resolve("uploads");
        }

        return uploadDirectory.toUri().toString();
    }
}
