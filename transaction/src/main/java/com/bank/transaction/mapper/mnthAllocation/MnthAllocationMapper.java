package com.bank.transaction.mapper.mnthAllocation;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Mapper;

/**
* @packageName    : com.bank.transaction.mapper.mnthAllocation(월간배당내역)
* @fileName       : MnthAllocationMapper.java
* @author         : Jihun Park
* @date           : 2024.09.17
* @description    :
* ===========================================================
* DATE              AUTHOR             NOTE
* -----------------------------------------------------------
* 2024.09.15        Jihun Park       최초 생성
*/
@Mapper
public interface MnthAllocationMapper {

    /**
    * @packageName    : com.bank.transaction.mapper.mnthAllocation(월간배당내역)
    * @fileName       : mnthAllocationSelect.java(월간배당내역 조회)
    * @author         : Jihun Park
    * @date           : 2024.09.17
    * @description    :
    * ===========================================================
    * DATE              AUTHOR             NOTE
    * -----------------------------------------------------------
    * 2024.09.17        Jihun Park       최초 생성
    **/
    public List<Map<String, Object>> mnthAllocationSelect(Map<String, Object> map);
    
    /**
    * @packageName    : com.bank.transaction.mapper.mnthAllocation(월간배당내역)
    * @fileName       : mnthAllocationDetail.java(월간배당 상세 조회)
    * @author         : Jihun Park
    * @date           : 2024.09.17
    * @description    :
    * ===========================================================
    * DATE              AUTHOR             NOTE
    * -----------------------------------------------------------
    * 2024.09.17        Jihun Park       최초 생성
    **/
    public List<Map<String, Object>> mnthAllocationDetail(Map<String, Object> map);
}
