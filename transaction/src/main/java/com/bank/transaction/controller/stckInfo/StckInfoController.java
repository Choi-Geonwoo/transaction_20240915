package com.bank.transaction.controller.stckInfo;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

import com.bank.transaction.service.stckInfo.StckInfoService;
import com.bank.transaction.service.stckInfo.StckInfoServiceImpl;

import lombok.extern.java.Log;
import lombok.extern.slf4j.Slf4j;

// shift + alt + j
/**
* @packageName    : com.bank.transaction.controller.stckInfo(주식정보)
* @fileName       : StckInfoController.java
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
public class StckInfoController {

    @Autowired
    private StckInfoService stckInfoService;
	
	/**
	* @methodName    : stckInfoView(주식정보화면)
	* @author        : Jihun Park
	* @date          : 2024.09.15
	* @return		 : 주식정보
	*/
	@GetMapping("/stckInfoView")
	public String stckInfoView(Model model) {
		Map<String, Object> mapData = new HashMap<>();
		List<Map<String, Object>> stckInfoSelect = stckInfoService.stckInfoSelect(mapData);
		log.info("========================= > stckInfoView");
		log.info("========================= > value " + stckInfoSelect);
        model.addAttribute("stckInfoSelect", stckInfoSelect);
		//return "index";
		return "view/stckInfo/stckInfoView";
	}
}
