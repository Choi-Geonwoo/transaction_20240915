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
	
	/**
	* @packageName    : com.bank.transaction.service.allocation(배당내역)
	* @fileName       : allocationInsert.java(배당내역 상세 등록)
	* @author         : Jihun Park
	* @date           : 2024.09.17
	* @description    :
	* ===========================================================
	* DATE              AUTHOR             NOTE
	* -----------------------------------------------------------
	* 2024.09.17        Jihun Park       최초 생성
    **/
	@Override
	public Map allocationInsert(Map<String, Object> map, String files) {
        String tNo = "";
		FileDTO fDto = new FileDTO();
		Map<String, Object> retMap = new HashMap<>();
		try {
			tNo = allocationMapper.tNoSelect(map);
		    fDto.setTNo(tNo);
		    fDto.setFName(String.valueOf(map.get("FILENAME")));
		    fDto.setContents(files.getBytes());
		    map.put("no", tNo);
		    allocationMapper.allocationInsert(map);
		    log.info("1.  : : : " + fDto.getFName() + " | " + fDto.getFNo() + " | " + fDto.getTNo() + " | " + files.length());
		    fDto.setContents(files.getBytes());
		        // ??´??¸??? ?????? ??????
		    fileService.fileInsert(fDto);
			// TODO Auto-generated method stub
		    retMap.put("msg", "성공했습니다.");
		} catch (Exception e) {
			log.error("error" + e.toString());
			// TODO: handle exception
		    retMap.put("msg", "오류가 발생하였습니다.");
		}
		return null;
	}

}
