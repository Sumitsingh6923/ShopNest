package com.shopnest.shopnest.config;
import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Info;
import io.swagger.v3.oas.models.info.Contact;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class SwaggerConfig {

    @Bean
    public OpenAPI shopNestOpenAPI() {

        return new OpenAPI()
                .info(new Info()
                        .title("ShopNest E-Commerce API")
                        .description("REST API documentation for ShopNest E-Commerce Backend")
                        .version("1.0")
                        .contact(new Contact()
                                .name("ShopNest Developer")
                                .email("support@shopnest.com")));
    }
}
