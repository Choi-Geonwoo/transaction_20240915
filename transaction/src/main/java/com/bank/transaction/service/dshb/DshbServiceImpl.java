package com.bank.transaction.service.dshb;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.bank.transaction.mapper.dshb.DshbMapper;

import lombok.extern.slf4j.Slf4j;

/**
* @packageName    : com.bank.transaction.service.dshb(대시보드)
* @fileName       : DshbServiceImpl.java(대시보드 조회)
* @author         : Jihun Park
* @date           : 2024.09.17
* @description    :
* ===========================================================
* DATE              AUTHOR             NOTE
* -----------------------------------------------------------
* 2024.11.12        Jihun Park       최초 생성
**/
@Slf4j
@Service
public class DshbServiceImpl implements DshbService {
    
    @Autowired
    private DshbMapper dshbMapper;

    @Override
    public List<Map<String, Object>> selectSum(Map<String, Object> map) {
	List<Map<String, Object>> newList = new ArrayList<>();

	// 데이터를 조회하고 필요한 맵을 생성
	List<Map<String, Object>> sum01List = dshbMapper.selectSum01(map);
	List<Map<String, Object>> sum02List = dshbMapper.selectSum02(map);
	List<Map<String, Object>> sum04List = dshbMapper.selectSum04(map);

	// sum01List 데이터를 추가
	newList.addAll(sum01List);

	// SUM02 데이터 추가
	Map<String, Object> sum02Map = new HashMap<>();
	sum02Map.put("SUM02", sum02List);
	newList.add(sum02Map);

	// SUM03 조건 확인 및 추가
	if (sum02List.size() >= 5) {
	    Map<String, Object> sum03Map = new HashMap<>();
	    sum03Map.put("SUM03", sum02List.subList(0, 5));
	    newList.add(sum03Map);
	}

	// SUM04 데이터 추가
	Map<String, Object> sum04Map = new HashMap<>();
	sum04Map.put("SUM04", sum04List);
	newList.add(sum04Map);

	return newList;
    }

}
