package com.bank.transaction.service.com;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.bank.transaction.mapper.com.ComMapper;
import com.bank.transaction.service.stckDlng.StckDlngServiceImpl;

import lombok.extern.slf4j.Slf4j;

/**
* @packageName    : com.bank.transaction.service.com(공통조회)
* @fileName       : ComServiceImpl.java
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
public class ComServiceImpl implements ComService {
	
    @Autowired
    private ComMapper comMapper;

    @Override
    public List<Map<String, Object>> stckInfoInq() {
        return comMapper.stckInfoInq();
    }

}
