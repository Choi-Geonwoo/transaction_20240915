package com.bank.transaction.service.stckInfo;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.bank.transaction.mapper.stckInfo.StckInfoMapper;

import lombok.extern.slf4j.Slf4j;

/**
* @packageName    : com.bank.transaction.service.stckInfo(주식정보)
* @fileName       : StckInfoServiceImpl.java
* @author         : Jihun Park
* @date           : 2024.09.15
* @description    :
* ===========================================================
* DATE              AUTHOR             NOTE
* -----------------------------------------------------------
* 2024.09.15        Jihun Park       최초 생성
*/
@Slf4j
@Service
public class StckInfoServiceImpl implements StckInfoService {


    @Autowired
    private StckInfoMapper stckInfoMapper;

    /**
         * @packageName    : com.bank.transaction.service.stckInfo(주식정보)
         * @fileName       : stckInfoSelect.java(주식정보 조회)
         * @author         : Jihun Park
         * @date           : 2024.09.15
         * @description    :
         * ===========================================================
         * DATE              AUTHOR             NOTE
         * -----------------------------------------------------------
         * 2024.09.15        Jihun Park       최초 생성
     **/
    @Override
    public List<Map<String, Object>> stckInfoSelect(Map<String, Object> mapData) {
        log.info("========================= > stckInfoSelect");
        log.info("========================= > value " + (stckInfoMapper.stckInfoSelect(mapData)));
        // TODO Auto-generated method stub
        return stckInfoMapper.stckInfoSelect(mapData);
    }


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
    @Override
    public Map stckInfoInsert(Map<String, Object> mapData) {
        int cnt = 0;
        cnt = stckInfoMapper.stckInfoInsert(mapData);
        log.info("===> stckInfoInsert");
        log.info("===> value : : : " + cnt);
        Map<String, Object> retMap = new HashMap<String, Object>();
        if(cnt != 0 ) {
            retMap.put("msg", "성공했습니다");
        }else {
            retMap.put("msg", "실패했습니다");
        }
            return retMap;
    }

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
    @Override
    public Map stckInfoUpdate(Map<String, Object> mapData) {
        int cnt = 0;
        cnt = stckInfoMapper.stckInfoUpdate(mapData);
        log.info("===> stckInfoUpdate");
        log.info("===> value : : : " + cnt);
        Map<String, Object> retMap = new HashMap<String, Object>();
        if(cnt != 0 ) {
            retMap.put("msg", "성공했습니다");
        }else {
            retMap.put("msg", "실패했습니다");
        }
            return retMap;
    }




}
