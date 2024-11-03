package com.bank.transaction.service.file;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.bank.transaction.file.dto.FileDTO;
import com.bank.transaction.mapper.file.FileMapper;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
public class FileServiceImpl implements FileService {
	
	

    @Autowired
    private FileMapper fileMapper;
	
	/**
	* @methodName    : fileSelect(파일 조회)
	* @author        : Jihun Park
	* @date          : 2024.09.15
	* @return
	*/	
	@Override
	public FileDTO fileSelect(String no) {
		return fileMapper.fileSelect(no);
	}

	/**
	* @methodName    : fileInsert(파일 등록)
	* @author        : Jihun Park
	* @date          : 2024.09.15
	* @return
	*/	
	@Override
	public int fileInsert(FileDTO fDto) {
		return fileMapper.fileInsert(fDto);
	}

	/**
	* @methodName    : fileUpdate(파일 수정)
	* @author        : Jihun Park
	* @date          : 2024.09.15
	* @return
	*/	
	@Override
	public int fileUpdate(FileDTO fDto) {
		return fileUpdate(fDto);
	}

}
