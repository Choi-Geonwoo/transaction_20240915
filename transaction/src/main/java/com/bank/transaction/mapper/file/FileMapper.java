package com.bank.transaction.mapper.file;

import org.apache.ibatis.annotations.Mapper;

import com.bank.transaction.file.dto.FileDTO;

@Mapper
public interface FileMapper {

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
}
