package com.bank.transaction.service.hldStckCls;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.bank.transaction.mapper.hldStckCls.HldStckClsMapper;
import com.bank.transaction.service.file.FileServiceImpl;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
public class HldStckClsServiceImpl implements HldStckClsService {
    @Autowired
    private HldStckClsMapper hldStckClsMapper;
    
    /**
    * @methodName    : selectHldStckClsList(보유 주식 종목 조회)
    * @author        : Jihun Park
    * @date          : 2024.09.15
    * @return
    */    
	@Override
	public List<Map<String, Object>> selectHldStckClsList(Map map) {
		return hldStckClsMapper.selectHldStckClsList(map);
	}
    
    /**
    * @methodName    : hldStckClsDetail(보유 주식 상세 조회)
    * @author        : Jihun Park
    * @date          : 2024.09.15
    * @return
    */    
	@Override
	public Map<String, Object> hldStckClsDetail(Map<String, Object>  map) {
		log.debug("#############################");
		log.debug("#############################");
		log.debug("#############################");
		String stockName = String.valueOf(map.get("stockName"));
		return hldStckClsMapper.hldStckClsDetail(stockName);
	}

    /**
    * @methodName    : hldStckClsUpdate(보유 주식 수정)
    * @author        : Jihun Park
    * @date          : 2024.09.15
    * @return
    */  
	@Override
	public Map<String, Object> hldStckClsUpdate(Map map) {
        int cnt = 0;
        cnt = hldStckClsMapper.hldStckClsUpdate(map);
        //log.info("===> stckDlngUpdate");
        //log.info("===> value : : : " + cnt);
        Map<String, Object> retMap = new HashMap<String, Object>();
        if(cnt != 0 ) {
            retMap.put("msg", "성공했습니다");
        }else {
            retMap.put("msg", "실패했습니다");
        }
            return retMap;
	}

}
