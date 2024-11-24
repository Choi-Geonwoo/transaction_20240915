package com.bank.transaction.controller.hldStckCls;

import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;

import com.bank.transaction.service.hldStckCls.HldStckClsService;

import lombok.extern.slf4j.Slf4j;

/**
* @packageName    : com.bank.transaction.controller.hldStckCls(보유주식종목)
* @fileName       : MnthAllocationController.java
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
public class HldStckClsController {
    @Autowired
    private HldStckClsService hldStckClsService;
    /**
    * @methodName    : HldStckClsView(주식보유 종목)
    * @author        : Jihun Park
    * @date          : 2024.09.15
    * @return
    */
    @GetMapping("/hldStckCls/hldStckClsView")
    public String HldStckClsView(Model model) {
    	model.addAttribute("list", hldStckClsService.selectHldStckClsList(null));
        //return "index";
        return "view/hldStckCls/HldStckClsView";
    }

    /**
    * @methodName    : hldStckClsDetail(보유 주식 상세)
    * @author        : Jihun Park
    * @date          : 2024.09.15
    * @return
    */
    // 주식 상세 조회
    @GetMapping("/hldStckCls/hldStckClsDetail")
    public ResponseEntity<Map<String, Object>> hldStckClsDetail(@RequestParam Map<String, Object> map, Model model){
        Map<String, Object> mapList = new HashMap();
        mapList = hldStckClsService.hldStckClsDetail(map);
        return ResponseEntity.ok(mapList);
    }   
}
