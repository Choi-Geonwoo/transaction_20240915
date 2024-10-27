package com.bank.transaction.service.allocation;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.bank.transaction.mapper.allocation.AllocationMapper;
import com.bank.transaction.mapper.mnthAllocation.MnthAllocationMapper;

import lombok.extern.slf4j.Slf4j;

/**
* @packageName    : com.bank.transaction.service.allocation(배당내역)
* @fileName       : AllocationServiceImpl.java(배당내역)
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
public class AllocationServiceImpl implements AllocationService {

    @Autowired
    private AllocationMapper allocationMapper;
	/**
	* @packageName    : com.bank.transaction.service.allocation(배당내역)
	* @fileName       : mnthAllocationSelect.java(배당내역 목록 조회)
	* @author         : Jihun Park
	* @date           : 2024.09.17
	* @description    :
	* ===========================================================
	* DATE              AUTHOR             NOTE
	* -----------------------------------------------------------
	* 2024.09.17        Jihun Park       최초 생성
    **/
	@Override
	public List<Map<String, Object>> allocationMapperSelect(Map<String, Object> map) {
		return allocationMapper.allocationMapperSelect(map);
	}

}
