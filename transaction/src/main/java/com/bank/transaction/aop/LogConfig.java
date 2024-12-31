package com.bank.transaction.aop;

import java.util.Map;
import java.util.Optional;
import java.util.stream.Collectors;

import org.aspectj.lang.ProceedingJoinPoint;
import org.aspectj.lang.annotation.Around;
import org.aspectj.lang.annotation.Aspect;
import org.springframework.stereotype.Component;
import org.springframework.web.context.request.RequestAttributes;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;

import jakarta.servlet.http.HttpServletRequest;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Component
@Aspect
public class LogConfig {
	
	@Around("within(com.bank.transaction..*))")
	public Object logging(ProceedingJoinPoint pjp) throws Throwable {

	    String params = getRequestParams();

	    long startAt = System.currentTimeMillis();

	    if(pjp.getSignature().getName().indexOf("file") == -1){
	    	log.info("1. -----------> \nREQUEST : {}\n({}) = {}", 
	    	        pjp.getSignature().getDeclaringTypeName(),
	    	        pjp.getSignature().getName(), 
	    	        params);
	    }

	    Object result = pjp.proceed();

	    long endAt = System.currentTimeMillis();

	    if(pjp.getSignature().getName().indexOf("file") == -1){
		    log.info("2. -----------> \nRESPONSE : {}\n({}) = {} ({}ms)", 
		        pjp.getSignature().getDeclaringTypeName(),
		        pjp.getSignature().getName(), 
		        result, 
		        endAt - startAt);
	    }
	    return result;
	}
	  
	private String paramMapToString(Map<String, String[]> paramMap) {
	    return paramMap.entrySet().stream()
	            .map(entry -> String.format("%s -> (%s)",
	                entry.getKey(), 
	                String.join(",", entry.getValue())))
	            .collect(Collectors.joining(", "));
	}
	  
	// Get request parameters
	private String getRequestParams() {
	    RequestAttributes requestAttributes = RequestContextHolder.getRequestAttributes();

	    return Optional.ofNullable(requestAttributes)
	            .map(attrs -> ((ServletRequestAttributes) attrs).getRequest())
	            .map(request -> request.getParameterMap())
	            .filter(paramMap -> !paramMap.isEmpty())
	            .map(paramMap -> " [" + paramMapToString(paramMap) + "]")
	            .orElse("없음");
	}
}
