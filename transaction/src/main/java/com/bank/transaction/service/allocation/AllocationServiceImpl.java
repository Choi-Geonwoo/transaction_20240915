package com.bank.transaction.service.allocation;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.bank.transaction.file.dto.FileDTO;
import com.bank.transaction.mapper.allocation.AllocationMapper;
import com.bank.transaction.mapper.mnthAllocation.MnthAllocationMapper;
import com.bank.transaction.service.file.FileService;

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
    
    @Autowired
    private FileService fileService;
	/**
	* @packageName    : com.bank.transaction.service.allocation(배당내역)
	* @fileName       : allocationSelect.java(배당내역 목록 조회)
	* @author         : Jihun Park
	* @date           : 2024.09.17
	* @description    :
	* ===========================================================
	* DATE              AUTHOR             NOTE
	* -----------------------------------------------------------
	* 2024.09.17        Jihun Park       최초 생성
    **/
	@Override
	public List<Map<String, Object>> allocationSelect(Map<String, Object> map) {
		return allocationMapper.allocationSelect(map);
	}
	
	/**
	* @packageName    : com.bank.transaction.service.allocation(배당내역)
	* @fileName       : allocationSelect.java(배당내역 목록 조회)
	* @author         : Jihun Park
	* @date           : 2024.09.17
	* @description    :
	* ===========================================================
	* DATE              AUTHOR             NOTE
	* -----------------------------------------------------------
	* 2024.09.17        Jihun Park       최초 생성
    **/
	@Override
	public Map<String, Object> allocationDetail(Map<String, Object> map) {
		Map<String, Object> retMap = new HashMap<>();
		FileDTO fDto = new FileDTO();
		retMap.put("msg", "");
		retMap = allocationMapper.allocationDetail(map);
		try {
			fDto = fileService.fileSelect(String.valueOf(retMap.get("NO")));
            if(null != fDto){
                fDto.setReContents(fDto.getContents().toString());
                String base64ToString = new String(fDto.getContents());
                fDto.setReContents(base64ToString);
            }
            retMap.put("fileList", fDto);
		} catch (Exception e) {
			log.error("error " + e.toString());
		}
		return retMap;
	}

}
