package com.pear.api.common.config;

import com.siot.IamportRestClient.IamportClient;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class AppConfig {
    String apiKey = "Input REST API key.";
    String secretKey = "Input REST API secret key.";

    @Bean
    public IamportClient iamportClient(){
        return new IamportClient(apiKey, secretKey);
    }
}
