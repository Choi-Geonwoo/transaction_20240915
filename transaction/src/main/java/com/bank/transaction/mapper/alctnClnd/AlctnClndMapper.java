package com.bank.transaction.mapper.alctnClnd;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Mapper;

/**
* @packageName    : com.bank.transaction.mapper.alctnClnd(배당달력내역)
* @fileName       : AlctnClndMapper.java(배당달력내역 조회)
* @author         : Jihun Park
* @date           : 2024.09.17
* @description    :
* ===========================================================
* DATE              AUTHOR             NOTE
* -----------------------------------------------------------
* 2024.11.12        Jihun Park       최초 생성
**/
@Mapper
public interface AlctnClndMapper {
	/**
	* @packageName    : com.bank.transaction.service.alctnClnd(배당달력내역)
	* @fileName       : alctnClndSelect.java(배당내역 목록 조회)
	* @author         : Jihun Park
	* @date           : 2024.09.18
	* @description    :
	* ===========================================================
	* DATE              AUTHOR             NOTE
	* -----------------------------------------------------------
	* 2024.09.18        Jihun Park       최초 생성
	**/
	public List<Map<String, Object>> alctnClndSelect(Map<String, Object> map);

}
