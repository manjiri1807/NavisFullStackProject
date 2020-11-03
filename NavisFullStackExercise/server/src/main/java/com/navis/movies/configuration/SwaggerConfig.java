package com.navis.movies.configuration;

import java.time.Year;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Info;
import io.swagger.v3.oas.models.info.License;

@Configuration
public class SwaggerConfig { 
    @Bean
    public OpenAPI springShopOpenAPI() {
        return new OpenAPI()
                .info(new Info().title("Movie Service API")
                        .description("Provides functionality to interact with movie system")
                        .version(this.getClass().getPackage().getImplementationVersion())
                        .license(new License().name("(C) Copyright " + Year.now().toString()).url("https://www.naviscrm.com/")));
    }
}
