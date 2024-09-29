package com.bank.transaction;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.builder.SpringApplicationBuilder;
import org.springframework.boot.web.servlet.support.SpringBootServletInitializer;
import org.springframework.context.annotation.EnableAspectJAutoProxy;

@SpringBootApplication
@EnableAspectJAutoProxy // 추가
public class TransactionApplication {
	public static void main(String[] args) {
		SpringApplication.run(TransactionApplication.class, args);
		// 토큰 : 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
	}

}
