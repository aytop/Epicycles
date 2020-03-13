package com.levi9.imgtocurve;

import com.levi9.imgtocurve.storage.StorageService;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.builder.SpringApplicationBuilder;
import org.springframework.context.ConfigurableApplicationContext;
import org.springframework.context.annotation.Bean;


@SpringBootApplication
public class ImgToCurveApplication
{
	public static void main(String[] args)
	{
		//SpringApplication.run(ImgToCurveApplication.class, args);
		SpringApplicationBuilder builder = new SpringApplicationBuilder(ImgToCurveApplication.class);
		
		builder.headless(false);
		ConfigurableApplicationContext context = builder.run(args);
	}
	@Bean
	CommandLineRunner init(StorageService storageService) {
		return (args) -> {
			storageService.deleteAll();
			storageService.init();
		};
	}
}
