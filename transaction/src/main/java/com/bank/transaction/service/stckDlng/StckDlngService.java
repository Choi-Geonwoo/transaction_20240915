package com.bank.transaction.service.stckDlng;

import java.util.List;
import java.util.Map;

/**
* @packageName    : com.bank.transaction.service.stckDlng(주식거래)
* @fileName       : StckDlngService.java
* @author         : Jihun Park
* @date           : 2024.09.15
* @description    :
* ===========================================================
* DATE              AUTHOR             NOTE
* -----------------------------------------------------------
* 2024.09.15        Jihun Park       최초 생성
*/
public interface StckDlngService {

    /**
        * @packageName    : com.bank.transaction.service.stckDlng(주식거래정보)
        * @fileName       : stckDlngSelect.java(주식거래정보 조회)
        * @author         : Jihun Park
        * @date           : 2024.09.15
        * @description    :
        * ===========================================================
        * DATE              AUTHOR             NOTE
        * -----------------------------------------------------------
        * 2024.09.15        Jihun Park       최초 생성
    **/
    public List<Map<String, Object>> stckDlngSelect(Map<String, Object> mapData);
    
    /**
         * @packageName    : com.bank.transaction.service.stckDlng(주식거래정보)
         * @fileName       : stckDlngInsert.java(주식거래정보 등록)
         * @author         : Jihun Park
         * @date           : 2024.09.16
         * @description    :
         * ===========================================================
         * DATE              AUTHOR             NOTE
         * -----------------------------------------------------------
         * 2024.09.15        Jihun Park       최초 생성
     **/
    public    Map stckDlngInsert(Map<String, Object> mapData);


    /**
         * @packageName    : com.bank.transaction.service.stckDlngUpdate(주식거래정보)
         * @fileName       : stckDlngInsert.java(주식거래정보 수정)
         * @author         : Jihun Park
         * @date           : 2024.09.16
         * @description    :
         * ===========================================================
         * DATE              AUTHOR             NOTE
         * -----------------------------------------------------------
         * 2024.09.15        Jihun Park       최초 생성
     **/
    public  Map stckDlngUpdate(Map<String, Object> mapData);

    /**
        * @packageName    : com.bank.transaction.service.stckDlng(주식거래정보)
        * @fileName       : stckInfoInq.java(주식 정보 조회)
        * @author         : Jihun Park
        * @date           : 2024.09.18
        * @description    :
        * ===========================================================
        * DATE              AUTHOR             NOTE
        * -----------------------------------------------------------
        * 2024.09.18        Jihun Park       최초 생성
    **/
    public List<Map<String, Object>> stckInfoInq();

    /**
        * @packageName    : com.bank.transaction.service.getDividendCycleByStockName(주식정보)
        * @fileName       : getDividendCycleByStockName.java(주식 정보 조회)
        * @author         : Jihun Park
        * @date           : 2024.09.18
        * @description    :
        * ===========================================================
        * DATE              AUTHOR             NOTE
        * -----------------------------------------------------------
        * 2024.09.18        Jihun Park       최초 생성
    **/
    public Map<String, String> getDividendCycleByStockName(String TIKER);
}
