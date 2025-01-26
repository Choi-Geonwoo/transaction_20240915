package com.bank.transaction.mapper.dshb;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Mapper;

/**
* @packageName    : com.bank.transaction.mapper.dshb(대시보드)
* @fileName       : DshbMapper.java(배당달력내역 조회)
* @author         : Jihun Park
* @date           : 2024.09.17
* @description    :
* ===========================================================
* DATE              AUTHOR             NOTE
* -----------------------------------------------------------
* 2024.11.12        Jihun Park       최초 생성
**/
@Mapper
public interface DshbMapper {
    /**
    * @packageName    : com.bank.transaction.mapper.dshb(대시보드)
    * @fileName       : selectSum01.java(대시보드 - 총 자산, 누적 배당금)
    * @author         : Jihun Park
    * @date           : 2024.09.18
    * @description    :
    * ===========================================================
    * DATE              AUTHOR             NOTE
    * -----------------------------------------------------------
    * 2024.09.18        Jihun Park       최초 생성
    **/
    public List<Map<String, Object>> selectSum01(Map<String, Object> map);

    /**
    * @packageName    : com.bank.transaction.mapper.dshb(대시보드)
    * @fileName       : selectSum02.java(대시보드 - 투자종목)
    * @author         : Jihun Park
    * @date           : 2024.09.18
    * @description    :
    * ===========================================================
    * DATE              AUTHOR             NOTE
    * -----------------------------------------------------------
    * 2024.09.18        Jihun Park       최초 생성
    **/
    public List<Map<String, Object>> selectSum02(Map<String, Object> map);


    /**
    * @packageName    : com.bank.transaction.mapper.dshb(대시보드)
    * @fileName       : selectSum04.java(대시보드 - 배당금 추세)
    * @author         : Jihun Park
    * @date           : 2024.09.18
    * @description    :
    * ===========================================================
    * DATE              AUTHOR             NOTE
    * -----------------------------------------------------------
    * 2024.09.18        Jihun Park       최초 생성
    **/
    public List<Map<String, Object>> selectSum04(Map<String, Object> map);
}
