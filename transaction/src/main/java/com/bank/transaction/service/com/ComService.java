package com.bank.transaction.service.com;

import java.util.List;
import java.util.Map;

/**
* @packageName    : com.bank.transaction.service.com.ComService(공통조회)
* @fileName       : ComService.java
* @author         : Jihun Park
* @date           : 2024.09.15
* @description    :
* ===========================================================
* DATE              AUTHOR             NOTE
* -----------------------------------------------------------
* 2024.09.15        Jihun Park       최초 생성
*/
public interface ComService {

	/**
	* @packageName    : com.bank.transaction.mapper.com.ComMapper(공통조회)
	* @fileName       : stckInfoInq.java(주식명 조회)
	* @author         : Jihun Park
	* @date           : 2024.09.18
	* @description    :
	* ===========================================================
	* DATE              AUTHOR             NOTE
	* -----------------------------------------------------------
	* 2024.09.18        Jihun Park       최초 생성
	**/
	public List<Map<String, Object>> stckInfoInq();

}
