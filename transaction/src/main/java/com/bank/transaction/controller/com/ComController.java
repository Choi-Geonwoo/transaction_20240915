package com.bank.transaction.controller.com;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

import com.bank.transaction.controller.stckInfo.StckInfoController;
import com.bank.transaction.service.com.ComService;

import lombok.extern.slf4j.Slf4j;

//shift + alt + j
/**
* @packageName    : com.bank.transaction.controller.com.ComController(공통조회)
* @fileName       : ComController.java
* @author         : Jihun Park
* @date           : 2024.09.15
* @description    :
* ===========================================================
* DATE              AUTHOR             NOTE
* -----------------------------------------------------------
* 2024.09.15        Jihun Park       최초 생성
*/
@Slf4j
@Controller
public class ComController {
    @Autowired
    private ComService comService;
    /**
    * @methodName    : stckInfoView(주식정보등록)
    * @author        : Jihun Park
    * @date          : 2024.09.16
    * @return         : 주식정보
    */
    @GetMapping("/com/stckInfoInq.do" )
    public ResponseEntity<List<Map<String, Object>>> selectStckInfo(){
        List<Map<String, Object>> listMapData = comService.stckInfoInq();
        return ResponseEntity.ok().header("Content-Type", "application/json").body(listMapData);
    }
}
