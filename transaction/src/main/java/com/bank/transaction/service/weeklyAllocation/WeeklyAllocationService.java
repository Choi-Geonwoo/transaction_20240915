package com.bank.transaction.service.weeklyAllocation;

import java.util.List;
import java.util.Map;

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
public interface WeeklyAllocationService {
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
}