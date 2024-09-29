package com.bank.transaction.controller.stckInfo;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;

import com.bank.transaction.service.stckInfo.StckInfoService;

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
	@GetMapping("/stckInfo/stckInfoView")
	public String stckInfoView(Model model) {
		Map<String, Object> mapData = new HashMap<>();
		List<Map<String, Object>> stckInfoSelect = stckInfoService.stckInfoSelect(mapData);
		//log.info("========================= > stckInfoView");
		//log.info("========================= > value " + stckInfoSelect);
        model.addAttribute("stckInfoSelect", stckInfoSelect);
		//return "index";
		return "view/stckInfo/stckInfoView";
	}

	/**
	* @methodName    : stckInfoView(주식정보등록)
	* @author        : Jihun Park
	* @date          : 2024.09.16
	* @return		 : 주식정보
	*/
    @PostMapping("/stckInfo/stckInfoInsert.do" )
    public ResponseEntity<Map> stckInfoInsert(@RequestBody Map<String, Object> map, Model model){
        Map<String, Object> mapData = stckInfoService.stckInfoInsert(map);
        //log.debug("========================= > stckInfoInsert");
        //log.debug("========================= > value " + map.toString());
        //log.debug("========================= > value " + mapData.toString());
        //model.addAttribute("msg",mapData );
        return ResponseEntity.ok().header("Content-Type", "application/json").body(mapData);
    }

    /**
    * @methodName    : stckInfoView(주식정보수정)
    * @author        : Jihun Park
    * @date          : 2024.09.16
    * @return        : 주식정보
    */
    @PostMapping("/stckInfo/stckInfoUpdate.do" )
    public ResponseEntity<Map> stckInfoUpdate(@RequestBody Map<String, Object> map, Model model){
        Map<String, Object> mapData = stckInfoService.stckInfoUpdate(map);
        //log.debug("========================= > stckInfoInsert");
        //log.debug("========================= > value " + map.toString());
        //log.debug("========================= > value " + mapData.toString());
        //model.addAttribute("msg",mapData );
        return ResponseEntity.ok().header("Content-Type", "application/json").body(mapData);
    }

	/**
	* @methodName    : stckInfoView(주식정보조회)
	* @author        : Jihun Park
	* @date          : 2024.09.16
	* @return		 : 주식정보
	*/
    @GetMapping("/stckInfo/stckInfoSelect.do")
    public String stckInfoSelect(@RequestParam Map<String, Object> parameter, Model model){
		log.info("========================= > stckInfoSelect");
		log.info("========================= > value " + parameter.toString());
		List<Map<String, Object>> stckInfoSelect = stckInfoService.stckInfoSelect(parameter);
        model.addAttribute("stckInfoSelect", stckInfoSelect);
        model.addAttribute("parameter", parameter);
		//return "index";
		return "view/stckInfo/stckInfoView";
    }
}
