package com.bank.transaction.service.alctnClnd;

import java.util.List;
import java.util.Map;

import com.bank.transaction.uitle.MultiDatasetResponse;

/**
* @packageName    : com.bank.transaction.service.alctnClnd(배당달력내역)
* @fileName       : AlctnClndService.java(배당달력내역 조회)
* @author         : Jihun Park
* @date           : 2024.09.17
* @description    :
* ===========================================================
* DATE              AUTHOR             NOTE
* -----------------------------------------------------------
* 2024.11.12        Jihun Park       최초 생성
**/
public interface AlctnClndService {
    /**
    * @packageName    : com.bank.transaction.service.alctnClnd(배당달력내역)
    * @fileName       : alctnClndSelect.java(배당내역 목록 조회)
    * @author         : Jihun Park
    * @date           : 2024.09.17
    * @description    :
    * ===========================================================
    * DATE              AUTHOR             NOTE
    * -----------------------------------------------------------
    * 2024.09.17        Jihun Park       최초 생성
    **/
    public List<Map<String, Object>> alctnClndSelect(Map<String, Object> map);
    
    /**
    * @packageName    : com.bank.transaction.service.stckClndSelect(배당달력내역)
    * @fileName       : alctnClndSelect.java(배당내역 목록 조회)
    * @author         : Jihun Park
    * @date           : 2024.09.17
    * @description    :
    * ===========================================================
    * DATE              AUTHOR             NOTE
    * -----------------------------------------------------------
    * 2024.09.17        Jihun Park       최초 생성
    **/
    public MultiDatasetResponse stckClndSelect(Map<String, Object> map);
 
}
