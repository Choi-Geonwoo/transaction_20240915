package com.bank.transaction.mapper.stckDlng;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Mapper;

/**
* @packageName    : com.bank.transaction.mapper.stckDlng(주식거래정보)
* @fileName       : StckDlngMapper.java
* @author         : Jihun Park
* @date           : 2024.09.17
* @description    :
* ===========================================================
* DATE              AUTHOR             NOTE
* -----------------------------------------------------------
* 2024.09.15        Jihun Park       최초 생성
*/
@Mapper
public interface StckDlngMapper {
	
	/**
			* @packageName    : com.bank.transaction.service.stckDlng(주식정보 조회)
			* @fileName       : stckInfoSelect.java(주식 거래 정보 조회)
			* @author         : Jihun Park
			* @date           : 2024.09.17
			* @description    :
			* ===========================================================
			* DATE              AUTHOR             NOTE
			* -----------------------------------------------------------
			* 2024.09.17        Jihun Park       최초 생성
	**/
	public	List<Map<String, Object>> stckDlngSelect(Map<String, Object> mapData);
	
	
	/**
		 * @packageName    : com.bank.transaction.service.stckDlng(주식정보)
		 * @fileName       : stckInfoInsert.java(주식 거래 정보 등록)
		 * @author         : Jihun Park
		 * @date           : 2024.09.17
		 * @description    :
		 * ===========================================================
		 * DATE              AUTHOR             NOTE
		 * -----------------------------------------------------------
		 * 2024.09.17        Jihun Park       최초 생성
	 **/
	public	int stckDlngInsert(Map<String, Object> mapData);
	
	/**
			 * @packageName    : com.bank.transaction.service.stckDlng(주식정보)
			 * @fileName       : stckInfoUpdate.java(주식 거래 정보 수정)
			 * @author         : Jihun Park
			 * @date           : 2024.09.17
			 * @description    :
			 * ===========================================================
			 * DATE              AUTHOR             NOTE
			 * -----------------------------------------------------------
			 * 2024.09.17        Jihun Park       최초 생성
	**/
	public int stckDlngUpdate(Map<String, Object> mapData);

	/**
			* @packageName    : com.bank.transaction.service.stckDlng(주식정보 조회)
			* @fileName       : stckInfoInq.java(주식 정보 조회)
			* @author         : Jihun Park
			* @date           : 2024.09.18
			* @description    :
			* ===========================================================
			* DATE              AUTHOR             NOTE
			* -----------------------------------------------------------
			* 2024.09.17        Jihun Park       최초 생성
	**/
	public	List<Map<String, Object>> stckInfoInq();


	/**
			* @packageName    : com.bank.transaction.service.getDividendCycleByStockName(주식정보 조회)
			* @fileName       : stckInfoInq.java(주식 정보 조회)
			* @author         : Jihun Park
			* @date           : 2024.09.18
			* @description    :
			* ===========================================================
			* DATE              AUTHOR             NOTE
			* -----------------------------------------------------------
			* 2024.09.17        Jihun Park       최초 생성
	**/
	public Map<String, String> getDividendCycleByStockName(String STCNM);
}
