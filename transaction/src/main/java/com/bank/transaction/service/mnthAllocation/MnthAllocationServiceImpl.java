package com.bank.transaction.service.mnthAllocation;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.bank.transaction.mapper.mnthAllocation.MnthAllocationMapper;

import lombok.extern.slf4j.Slf4j;

/**
* @packageName    : com.bank.transaction.service.MnthAllocationServiceImpl(월간배당내역)
* @fileName       : mnthAllocationSelect.java(월간배당내역 조회)
* @author         : Jihun Park
* @date           : 2024.09.17
* @description    :
* ===========================================================
* DATE              AUTHOR             NOTE
* -----------------------------------------------------------
* 2024.09.17        Jihun Park       최초 생성
**/
@Slf4j
@Service
public class MnthAllocationServiceImpl implements MnthAllocationService {

    @Autowired
    private MnthAllocationMapper mnthAllocationMapper;
    
    @Override
    public List<Map<String, Object>> mnthAllocationSelect(Map<String, Object> map) {
        return mnthAllocationMapper.mnthAllocationSelect(map);
    }

    @Override
    public List<Map<String, Object>> mnthAllocationDetail(Map<String, Object> map) {
        return mnthAllocationMapper.mnthAllocationDetail(map);
    }

}
