package com.bank.transaction.service.allocation;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.bank.transaction.file.dto.FileDTO;
import com.bank.transaction.mapper.allocation.AllocationMapper;
import com.bank.transaction.mapper.com.ComMapper;
import com.bank.transaction.service.file.FileService;

import lombok.extern.slf4j.Slf4j;

/**
 * @packageName    : com.bank.transaction.service.allocation (배당내역)
 * @fileName       : AllocationServiceImpl.java (배당내역)
 * @author         : Jihun Park
 * @date           : 2024.09.17
 * @description    : 배당 내역 서비스 구현체
 */
@Slf4j
@Service
public class AllocationServiceImpl implements AllocationService {

    @Autowired
    private AllocationMapper allocationMapper;
    
    @Autowired
    private FileService fileService;
    
    @Autowired
    private ComMapper comMapper;
    
    /**
     * 배당내역 목록 조회
     */
    @Override
    public List<Map<String, Object>> allocationSelect(Map<String, Object> map) {
        return allocationMapper.allocationSelect(map);
    }

    /**
     * 배당내역 상세 조회
     */
    @Override
    public Map<String, Object> allocationDetail(Map<String, Object> map) {
        Map<String, Object> retMap = allocationMapper.allocationDetail(map);
        if (retMap == null) {
            retMap = new HashMap<>();
        }
        retMap.put("msg", "");
        retMap.put("selectBox", comMapper.stckInfoInq());

        try {
            FileDTO fDto = handleFileSelection(String.valueOf(retMap.get("NO")));
            retMap.put("fileList", fDto);
        } catch (Exception e) {
            log.error("allocationDetail 오류 발생: {}", e.getMessage(), e);
        }
        return retMap;
    }

    /**
     * 배당내역 상세 등록
     */
    @Override
    public Map<String, Object> allocationInsert(Map<String, Object> map, String files) {
        Map<String, Object> retMap = new HashMap<>();
        
        try {
            // 중복 등록 확인
			/*
			 * if (validateDuplicateEntry(map)) { return createResponse("F", "중복 등록되었습니다.");
			 * }
			 */

            // 거래 번호(TNo) 조회 및 설정
            String tNo = allocationMapper.tNoSelect(map);
            map.put("no", tNo);

            // 배당 내역 등록
            allocationMapper.allocationInsert(map);

            // 파일 DTO 생성 및 저장
            FileDTO fDto = createFileDTO(tNo, map, files);
            fileService.fileInsert(fDto);

            return createResponse("S", "성공했습니다.");
        } catch (Exception e) {
            log.error("allocationInsert 오류 발생: {}", e.getMessage(), e);
            return createResponse("F", "오류가 발생하였습니다.");
        }
    }

    /**
     * 중복 등록 여부 확인
     */
    private boolean validateDuplicateEntry(Map<String, Object> map) {
        return allocationMapper.allocationListcnt(map) > 0;
    }

    /**
     * 파일 DTO 생성
     */
    private FileDTO createFileDTO(String tNo, Map<String, Object> map, String files) {
        FileDTO fDto = new FileDTO();
        fDto.setTNo(tNo);
        fDto.setFName(String.valueOf(map.get("FILENAME")));
        fDto.setContents(files.getBytes());
        return fDto;
    }

    /**
     * 파일 조회 및 변환 처리
     */
    private FileDTO handleFileSelection(String fileNo) {
        FileDTO fDto = fileService.fileSelect(fileNo);
        if (fDto != null) {
            String base64ToString = new String(fDto.getContents());
            fDto.setReContents(base64ToString);
        }
        return fDto;
    }

    /**
     * 응답 생성
     */
    private Map<String, Object> createResponse(String status, String message) {
        Map<String, Object> response = new HashMap<>();
        response.put("sttCd", status);
        response.put("msg", message);
        return response;
    }
}
