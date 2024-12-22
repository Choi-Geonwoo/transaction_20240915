package com.bank.transaction.service.alctnClnd;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.bank.transaction.file.dto.FileDTO;
import com.bank.transaction.mapper.alctnClnd.AlctnClndMapper;
import com.bank.transaction.mapper.allocation.AllocationMapper;
import com.bank.transaction.mapper.mnthAllocation.MnthAllocationMapper;
import com.bank.transaction.service.file.FileService;

import lombok.extern.slf4j.Slf4j;

/**
* @packageName    : com.bank.transaction.service.alctnClnd(배당달력내역)
* @fileName       : AlctnClndService.java(배당달력내역 조회)
* @author         : Jihun Park
* @date           : 2024.09.17
* @description    :
* ===========================================================
* DATE              AUTHOR             NOTE
* -----------------------------------------------------------
* 2024.11.12        Jihun Park       최초 생성
**/
@Slf4j
@Service
public class AlctnClndServiceImpl implements AlctnClndService {

    @Autowired
    private AlctnClndMapper alctnClndMapper;
    
	/**
	* @packageName    : com.bank.transaction.service.alctnClnd(배당달력내역)
	* @fileName       : alctnClndSelect.java(배당내역 목록 조회)
	* @author         : Jihun Park
	* @date           : 2024.09.17
	* @description    :
	* ===========================================================
	* DATE              AUTHOR             NOTE
	* -----------------------------------------------------------
	* 2024.09.17        Jihun Park       최초 생성
    **/
	@Override
	public List<Map<String, Object>> alctnClndSelect(Map<String, Object> map) {
		return alctnClndMapper.alctnClndSelect(map);
	}

	/**
	* @packageName    : com.bank.transaction.service.stckClndSelect(배당달력내역)
	* @fileName       : alctnClndSelect.java(배당내역 목록 조회)
	* @author         : Jihun Park
	* @date           : 2024.09.17
	* @description    :
	* ===========================================================
	* DATE              AUTHOR             NOTE
	* -----------------------------------------------------------
	* 2024.09.17        Jihun Park       최초 생성
    **/
	@Override
	public List<Map<String, Object>> stckClndSelect(Map<String, Object> map) {
		return alctnClndMapper.stckClndSelect(map);
	}

}
