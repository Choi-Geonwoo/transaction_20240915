package com.bank.transaction.mapper.weeklyAllocation;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Mapper;

/**
* @packageName    : com.bank.transaction.mapper.weeklyAllocation(주간 배당 정보)
* @fileName       : WeeklyAllocationMapper.java
* @author         : Jihun Park
* @date           : 2024.09.15
* @description    :
* ===========================================================
* DATE              AUTHOR             NOTE
* -----------------------------------------------------------
* 2024.09.15        Jihun Park       최초 생성
*/
@Mapper
public interface WeeklyAllocationMapper {
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
	public	List<Map<String, Object>> weeklyAllocationList(Map<String, Object> mapData);

	/**
	* @methodName    : WeeklyAllocationDownloadExcel(주간 배당 엑셀 다운로드 조회)
	* @author        : Jihun Park
	* @date          : 2024.09.15
	* @return		 : 주식정보
	*/
	public List<Map<String, Object>> weeklyAllocationDownloadExcel(Map<String, Object> parameter);

}
