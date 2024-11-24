package com.bank.transaction.service.weeklyAllocation;

import java.io.ByteArrayOutputStream;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.bank.transaction.mapper.weeklyAllocation.WeeklyAllocationMapper;
import com.bank.transaction.service.stckDlng.StckDlngServiceImpl;

import lombok.extern.slf4j.Slf4j;

/**
* @packageName    : com.bank.transaction.service.weeklyAllocation(주간 배당 내역)
* @fileName       : WeeklyAllocationService.java
* @author         : Jihun Park
* @date           : 2024.09.15
* @description    :
* ===========================================================
* DATE              AUTHOR             NOTE
* -----------------------------------------------------------
* 2024.09.15        Jihun Park       최초 생성
*/
@Slf4j
@Service
public class WeeklyAllocationServiceImpl implements WeeklyAllocationService {
	
    @Autowired
    private WeeklyAllocationMapper weeklyAllocationMapper;
	/**
	* @packageName    : com.bank.transaction.mapper.weeklyAllocation(주간 배당 정보)
	* @fileName       : weeklyAllocationList.java(주간 배당 정보)
	* @author         : Jihun Park
	* @date           : 2024.09.15
	* @description    :
	* ===========================================================
	* DATE              AUTHOR             NOTE
	* -----------------------------------------------------------
	* 2024.09.15        Jihun Park       최초 생성
	**/	
	@Override
	public List<Map<String, Object>> weeklyAllocationList(Map<String, Object> mapData) {
		// TODO Auto-generated method stub
		return weeklyAllocationMapper.weeklyAllocationList(mapData);
	}
	
	/**
	* @methodName    : WeeklyAllocationDownloadExcel(주간 배당 엑셀 다운로드 조회)
	* @author        : Jihun Park
	* @date          : 2024.09.15
	* @return		 : 주식정보
	*/
	@Override
	public List<Map<String, Object>> weeklyAllocationDownloadExcel(Map<String, Object> parameter) {
		return weeklyAllocationMapper.weeklyAllocationDownloadExcel(parameter);
	}

}
