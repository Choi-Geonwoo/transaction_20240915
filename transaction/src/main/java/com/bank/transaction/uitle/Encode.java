package com.bank.transaction.uitle;

import java.io.UnsupportedEncodingException;
import java.net.URLEncoder;

public class Encode {

	public static String encodeFileName(String fileName) {
	    try {
	        // UTF-8로 파일 이름을 URL 인코딩
	        return "attachment; filename=\"" + URLEncoder.encode(fileName, "UTF-8").replaceAll("\\+", "%20") + "\"";
	    } catch (UnsupportedEncodingException e) {
	        e.printStackTrace();
	        return fileName; // 인코딩 실패 시 원래 이름 사용
	    }
	}
}
