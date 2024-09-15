package com.bank.transaction.service.stckInfo;

import java.util.List;
import java.util.Map;

/**
* @packageName    : com.bank.transaction.service.stckInfo(주식정보)
* @fileName       : StckInfoService.java
* @author         : Jihun Park
* @date           : 2024.09.15
* @description    :
* ===========================================================
* DATE              AUTHOR             NOTE
* -----------------------------------------------------------
* 2024.09.15        Jihun Park       최초 생성
*/

public interface StckInfoService {
	
	/**
		* @packageName    : com.bank.transaction.service.stckInfo(주식정보)
		* @fileName       : stckInfoSelect.java(주식정보 조회)
		* @author         : Jihun Park
		* @date           : 2024.09.15
		* @description    :
		* ===========================================================
		* DATE              AUTHOR             NOTE
		* -----------------------------------------------------------
		* 2024.09.15        Jihun Park       최초 생성
	**/
	public List<Map<String, Object>> stckInfoSelect(Map<String, Object> mapData);

}
