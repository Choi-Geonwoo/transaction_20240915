package com.bank.transaction.service.stckDlng;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.bank.transaction.mapper.stckDlng.StckDlngMapper;

import lombok.extern.slf4j.Slf4j;

/**
* @packageName    : com.bank.transaction.service.stckDlng(주식거래)
* @fileName       : StckDlngServiceImpl.java
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
public class StckDlngServiceImpl implements StckDlngService {


    @Autowired
    private StckDlngMapper stckDlngMapper;

	/**
		 * @packageName    : com.bank.transaction.service.stckDlng(주식거래정보)
		 * @fileName       : stckDlngSelect.java(주식거래정보 조회)
		 * @author         : Jihun Park
		 * @date           : 2024.09.15
		 * @description    :
		 * ===========================================================
		 * DATE              AUTHOR             NOTE
		 * -----------------------------------------------------------
		 * 2024.09.15        Jihun Park       최초 생성
	 **/
	@Override
	public List<Map<String, Object>> stckDlngSelect(Map<String, Object> mapData) {
		log.info("========================= > stckDlngSelect");
		log.info("========================= > value " + (stckDlngMapper.stckDlngSelect(mapData)));
		// TODO Auto-generated method stub
		return stckDlngMapper.stckDlngSelect(mapData);
	}


	/**
		 * @packageName    : com.bank.transaction.service.stckDlng(주식거래정보)
		 * @fileName       : stckDlngInsert.java(주식거래정보 등록)
		 * @author         : Jihun Park
		 * @date           : 2024.09.16
		 * @description    :
		 * ===========================================================
		 * DATE              AUTHOR             NOTE
		 * -----------------------------------------------------------
		 * 2024.09.15        Jihun Park       최초 생성
	 **/
	@Override
	public Map stckDlngInsert(Map<String, Object> mapData) {
	    int cnt = 0;
	    cnt = stckDlngMapper.stckDlngInsert(mapData);
	    log.info("===> stckDlngInsert");
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
     * @packageName    : com.bank.transaction.service.stckDlng(주식거래정보)
     * @fileName       : stckDlngUpdate.java(주식거래정보 수정)
     * @author         : Jihun Park
     * @date           : 2024.09.16
     * @description    :
     * ===========================================================
     * DATE              AUTHOR             NOTE
     * -----------------------------------------------------------
     * 2024.09.15        Jihun Park       최초 생성
 **/
    @Override
    public Map stckDlngUpdate(Map<String, Object> mapData) {
        int cnt = 0;
        cnt = stckDlngMapper.stckDlngUpdate(mapData);
        log.info("===> stckDlngUpdate");
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
