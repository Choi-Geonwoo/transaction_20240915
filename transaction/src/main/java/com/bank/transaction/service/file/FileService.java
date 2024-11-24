package com.bank.transaction.service.file;

import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.util.List;
import java.util.Map;

import com.bank.transaction.file.dto.FileDTO;

public interface FileService {

	/**
	* @methodName    : fileInsert(파일 등록)
	* @author        : Jihun Park
	* @date          : 2024.09.15
	* @return
	*/
    public int  fileInsert(FileDTO fDto);

	/**
	* @methodName    : fileUpdate(파일 수정)
	* @author        : Jihun Park
	* @date          : 2024.09.15
	* @return
	*/
    public int  fileUpdate(FileDTO fDto);

	/**
	* @methodName    : fileSelect(파일 조회)
	* @author        : Jihun Park
	* @date          : 2024.09.15
	* @return
	*/
    public FileDTO  fileSelect(String tNo);
    
	/**
	* @methodName    : excelDownload(엑셀 다운로드)
	* @author        : Jihun Park
	* @date          : 2024.09.15
	* @param01       : DB 정보(List)
	* @param02       : 엑셀 헤더
	*/
    public ByteArrayOutputStream excelDownload(List<Map<String, Object>> data, String[] headers) throws IOException;
}
