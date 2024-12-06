package com.bank.transaction.service.hldStckCls;

import java.util.List;
import java.util.Map;

/**
* @packageName    : com.bank.transaction.mapper.hldStckCls.HldStckClsMapper(보유 주식 종목)
* @fileName       : stckInfoInq.java(주식명 조회)
* @author         : Jihun Park
* @date           : 2024.09.18
* @description    :
* ===========================================================
* DATE              AUTHOR             NOTE
* -----------------------------------------------------------
* 2024.09.18        Jihun Park       최초 생성
**/
public interface HldStckClsService {
	/**
	* @packageName    : com.bank.transaction.mapper.hldStckCls(보유 주식 종목)
	* @fileName       : selectHldStckClsList.java(보유 주식 종목 조회)
	* @author         : Jihun Park
	* @date           : 2024.11.18
	* @description    :
	* ===========================================================
	* DATE              AUTHOR             NOTE
	* -----------------------------------------------------------
	* 2024.09.18        Jihun Park       최초 생성
	**/
	public List<Map<String, Object>> selectHldStckClsList(Map map);
	/**
	* @packageName    : com.bank.transaction.mapper.hldStckCls(보유 주식 종목)
	* @fileName       : hldStckClsDetail.java(보유 주식 상세 조회)
	* @author         : Jihun Park
	* @date           : 2024.11.18
	* @description    :
	* ===========================================================
	* DATE              AUTHOR             NOTE
	* -----------------------------------------------------------
	* 2024.09.18        Jihun Park       최초 생성
	**/
	public Map<String, Object> hldStckClsDetail(Map<String, Object>  map);
	/**
	 * 
	* @methodName    : hldStckClsUpdate(주식 정보 수정)
	* @author        : Jihun Park
	* @date          : 2024.09.15
	* @return
	*/
    public Map<String, Object>  hldStckClsUpdate(Map map);
}
