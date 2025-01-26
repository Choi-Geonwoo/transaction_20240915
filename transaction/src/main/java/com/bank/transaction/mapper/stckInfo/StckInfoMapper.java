package com.bank.transaction.mapper.stckInfo;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Mapper;

/**
* @packageName    : com.bank.transaction.mapper.stckInfo(주식정보)
* @fileName       : StckInfoMapper.java
* @author         : Jihun Park
* @date           : 2024.09.15
* @description    :
* ===========================================================
* DATE              AUTHOR             NOTE
* -----------------------------------------------------------
* 2024.09.15        Jihun Park       최초 생성
*/
@Mapper
public interface StckInfoMapper {

    /**
        * @packageName    : com.bank.transaction.service.stckInfo(주식정보 조회)
        * @fileName       : stckInfoSelect.java(주식정보 조회)
        * @author         : Jihun Park
        * @date           : 2024.09.15
        * @description    :
        * ===========================================================
        * DATE              AUTHOR             NOTE
        * -----------------------------------------------------------
        * 2024.09.15        Jihun Park       최초 생성
    **/
    public    List<Map<String, Object>> stckInfoSelect(Map<String, Object> mapData);


    /**
         * @packageName    : com.bank.transaction.service.stckInfo(주식정보)
         * @fileName       : stckInfoInsert.java(주식정보 등록)
         * @author         : Jihun Park
         * @date           : 2024.09.16
         * @description    :
         * ===========================================================
         * DATE              AUTHOR             NOTE
         * -----------------------------------------------------------
         * 2024.09.15        Jihun Park       최초 생성
     **/
    public    int stckInfoInsert(Map<String, Object> mapData);

    /**
     * @packageName    : com.bank.transaction.service.stckInfo(주식정보)
     * @fileName       : stckInfoUpdate.java(주식정보 수정)
     * @author         : Jihun Park
     * @date           : 2024.09.16
     * @description    :
     * ===========================================================
     * DATE              AUTHOR             NOTE
     * -----------------------------------------------------------
     * 2024.09.15        Jihun Park       최초 생성
 **/
    public int stckInfoUpdate(Map<String, Object> mapData);

}
