package com.bank.transaction.service.dshb;

import java.util.List;
import java.util.Map;

/**
* @packageName    : com.bank.transaction.service.dshb(대시보드)
* @fileName       : DshbService.java(대시보드 조회)
* @author         : Jihun Park
* @date           : 2024.09.17
* @description    :
* ===========================================================
* DATE              AUTHOR             NOTE
* -----------------------------------------------------------
* 2024.11.12        Jihun Park       최초 생성
**/
public interface DshbService {
	/**
	* @packageName    : com.bank.transaction.service.dshb(대시보드)
	* @fileName       : selectSum.java(대시보드)
	* @author         : Jihun Park
	* @date           : 2024.09.18
	* @description    :
	* ===========================================================
	* DATE              AUTHOR             NOTE
	* -----------------------------------------------------------
	* 2024.09.18        Jihun Park       최초 생성
	**/
	public List<Map<String, Object>> selectSum(Map<String, Object> map);
}
