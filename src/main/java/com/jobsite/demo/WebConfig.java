package com.jobsite.demo;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
@EnableWebMvc
public class WebConfig implements WebMvcConfigurer {

    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**")
                .allowedOrigins("*")
                .allowedMethods("HEAD", "GET", "PUT", "POST", "DELETE", "PATCH")
                .allowedHeaders("Content-Type", "X-Requested-With", "accept", "Origin", "Access-Control-Allow-Origin", "Access-Control-Allow-Credentials", "Access-Control-Request-Method", "Access-Control-Request-Headers")

//                .exposedHeaders("Access-Control-Allow-Origin", "Access-Control-Allow-Credentials")
        ;
    }
}
