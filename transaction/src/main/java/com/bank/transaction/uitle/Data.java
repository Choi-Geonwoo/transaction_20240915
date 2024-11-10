package com.bank.transaction.uitle;

import java.time.LocalDate;
import java.time.LocalDateTime;

public class Data {
    
    //현재 날짜 포맷 변환 후 리턴
    public static int todayDateFormat(String format) {
        // 현재 날짜/시간        
        LocalDateTime now = LocalDateTime.now();
        int retInt = 0;
        // 년, 월(문자열, 숫자), 일(월 기준, 년 기준), 요일(문자열, 숫자), 시, 분, 초 구하기
        switch (format) {
		case "year": {
        	//int year = now.getYear();  // 연도
        	retInt = now.getYear();  // 연도
        	break;
		}
		case "month": {
        	//String month = now.getMonth().toString();  // 월(문자열) 
	        //int monthValue = now.getMonthValue();  // 월(숫자)    
        	retInt = now.getMonthValue();  // 월(숫자)  
        	break;
		}
		case "day": {
	        //int dayOfMonth = now.getDayOfMonth();  // 일(월 기준)        
	        //int dayOfYear = now.getDayOfYear();  // 일(년 기준)      
        	retInt = now.getDayOfYear();  // 일(년 기준)      
        	break;
		}
		default:
			throw new IllegalArgumentException("Unexpected value: " + format);
		}
        
        return retInt;
    }
}
