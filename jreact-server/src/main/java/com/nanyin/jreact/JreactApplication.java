package com.nanyin.jreact;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.context.properties.EnableConfigurationProperties;
//import org.springframework.boot.autoconfigure.security.oauth2.client.EnableOAuth2Sso;

//@EnableOAuth2Sso

@EnableConfigurationProperties
@SpringBootApplication
public class JreactApplication {

    public static void main(String[] args) {
        SpringApplication.run(JreactApplication.class, args);
    }

}

