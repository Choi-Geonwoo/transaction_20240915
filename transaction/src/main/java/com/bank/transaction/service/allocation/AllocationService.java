package com.bank.transaction.service.allocation;

import java.util.List;
import java.util.Map;

/**
* @packageName    : com.bank.transaction.service.allocation(배당내역)
* @fileName       : AllocationService.java(배당내역 조회)
* @author         : Jihun Park
* @date           : 2024.09.17
* @description    :
* ===========================================================
* DATE              AUTHOR             NOTE
* -----------------------------------------------------------
* 2024.09.17        Jihun Park       최초 생성
**/
public interface AllocationService {
	/**
	* @packageName    : com.bank.transaction.service.allocation(배당내역)
	* @fileName       : mnthAllocationSelect.java(배당내역 목록 조회)
	* @author         : Jihun Park
	* @date           : 2024.09.17
	* @description    :
	* ===========================================================
	* DATE              AUTHOR             NOTE
	* -----------------------------------------------------------
	* 2024.09.17        Jihun Park       최초 생성
    **/
    public List<Map<String, Object>> allocationMapperSelect(Map<String, Object> map);
}
