package com.bank.transaction.mapper.allocation;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Mapper;

/**
* @packageName    : com.bank.transaction.mapper.allocation(배당내역)
* @fileName       : AllocationMapper.java
* @author         : Jihun Park
* @date           : 2024.09.17
* @description    :
* ===========================================================
* DATE              AUTHOR             NOTE
* -----------------------------------------------------------
* 2024.09.15        Jihun Park       최초 생성
*/
@Mapper
public interface AllocationMapper {
		/**
		* @packageName    : com.bank.transaction.mapper.allocation(배당내역)
		* @fileName       : allocationSelect.java(배당내역 목록 조회)
		* @author         : Jihun Park
		* @date           : 2024.09.17
		* @description    :
		* ===========================================================
		* DATE              AUTHOR             NOTE
		* -----------------------------------------------------------
		* 2024.09.17        Jihun Park       최초 생성
	    **/
	    public List<Map<String, Object>> allocationSelect(Map<String, Object> map);

		/**
		* @packageName    : com.bank.transaction.mapper.allocation(배당내역)
		* @fileName       : allocationDetail.java(배당내역 상세 조회)
		* @author         : Jihun Park
		* @date           : 2024.09.17
		* @description    :
		* ===========================================================
		* DATE              AUTHOR             NOTE
		* -----------------------------------------------------------
		* 2024.09.17        Jihun Park       최초 생성
	    **/
	    public Map<String, Object> allocationDetail(Map<String, Object> map);
}
