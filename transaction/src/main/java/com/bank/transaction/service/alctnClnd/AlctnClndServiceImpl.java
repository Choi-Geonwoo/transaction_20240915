package com.bank.transaction.service.alctnClnd;

import java.lang.reflect.Array;
import java.util.Arrays;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.bank.transaction.mapper.alctnClnd.AlctnClndMapper;
import com.bank.transaction.uitle.DatasetResponse;
import com.bank.transaction.uitle.MultiDatasetResponse;

import lombok.extern.slf4j.Slf4j;

/**
* @packageName    : com.bank.transaction.service.alctnClnd(배당달력내역)
* @fileName       : AlctnClndService.java(배당달력내역 조회)
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
public class AlctnClndServiceImpl implements AlctnClndService {

    @Autowired
    private AlctnClndMapper alctnClndMapper;
    
    /**
    * @packageName    : com.bank.transaction.service.alctnClnd(배당달력내역)
    * @fileName       : alctnClndSelect.java(배당내역 목록 조회)
    * @author         : Jihun Park
    * @date           : 2024.09.17
    * @description    :
    * ===========================================================
    * DATE              AUTHOR             NOTE
    * -----------------------------------------------------------
    * 2024.09.17        Jihun Park       최초 생성
    **/
    @Override
    public List<Map<String, Object>> alctnClndSelect(Map<String, Object> map) {
        return alctnClndMapper.alctnClndSelect(map);
    }

    /**
    * @packageName    : com.bank.transaction.service.stckClndSelect(배당달력내역)
    * @fileName       : alctnClndSelect.java(배당내역 목록 조회)
    * @author         : Jihun Park
    * @date           : 2024.09.17
    * @description    :
    * ===========================================================
    * DATE              AUTHOR             NOTE
    * -----------------------------------------------------------
    * 2024.09.17        Jihun Park       최초 생성
    **/
    @Override
    public MultiDatasetResponse stckClndSelect(Map<String, Object> map) {
    	//Map<String,List<Object>> mapList = new HashMap<>();
    	//mapList.put("stckClndSelect", alctnClndMapper.stckClndSelect(map));
    	DatasetResponse userDataset = new DatasetResponse("stckClndSelect", alctnClndMapper.stckClndSelect(map));
        return new MultiDatasetResponse(Arrays.asList(userDataset));
    }

}
