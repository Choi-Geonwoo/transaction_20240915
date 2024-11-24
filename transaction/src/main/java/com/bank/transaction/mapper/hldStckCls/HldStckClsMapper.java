package com.bank.transaction.mapper.hldStckCls;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Mapper;

/**
* @packageName    : com.bank.transaction.mapper.hldStckCls(보유 주식 종목)
* @fileName       : HldStckClsMapper.java(보유 주식 종목 관련)
* @author         : Jihun Park
* @date           : 2024.09.18
* @description    :
* ===========================================================
* DATE              AUTHOR             NOTE
* -----------------------------------------------------------
* 2024.09.18        Jihun Park       최초 생성
**/
@Mapper
public interface HldStckClsMapper {

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
	public Map<String, Object> hldStckClsDetail(String stockName);

}
