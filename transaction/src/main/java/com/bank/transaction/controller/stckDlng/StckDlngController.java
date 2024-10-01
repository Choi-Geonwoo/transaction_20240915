package com.bank.transaction.controller.stckDlng;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;

import com.bank.transaction.controller.stckInfo.StckInfoController;
import com.bank.transaction.service.stckDlng.StckDlngService;

import lombok.extern.slf4j.Slf4j;

/**
* @packageName    : com.bank.transaction.controller.stckDlng(주식거래)
* @fileName       : StckDlngController.java
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
public class StckDlngController {
	
    @Autowired
    private StckDlngService stckDlngService;

	/**
	* @methodName    : stckDlngView(주식거래화면)
	* @author        : Jihun Park
	* @date          : 2024.09.15
	* @return
	*/
	@GetMapping("/stckDlngView")
	public String stckDlngView(Model model) {
		List<Map<String, Object>> stckInfoInq = stckDlngService.stckInfoInq();
		List<Map<String, Object>> stckDlngSelect = stckDlngService.stckDlngSelect(null);
        model.addAttribute("stckInfoInq", stckInfoInq);
        model.addAttribute("stckDlngSelect", stckDlngSelect);
		//return "index";
		return "view/stckDlng/stckDlngView";
	}
	

	/**
	* @methodName    : stckDlngInsert(주식거래정보등록)
	* @author        : Jihun Park
	* @date          : 2024.09.16
	* @return		 : 주식거래정보
	*/
    @PostMapping("/stckDlng/stckDlngInsert.do" )
    public String stckDlngInsert(@RequestParam Map<String, Object> stockData, Model model){
        //log.info("========================= > stckDlngInsert");
        //log.info("========================= > value " + stockData.toString());
        //log.debug("========================= > value " + stockData.toString());
        Map<String, Object> mapData = stckDlngService.stckDlngInsert(stockData);
        model.addAttribute("msg",mapData );
		return "redirect:/stckDlngView";
    }

    /**
    * @methodName    : stckDlngUpdate(주식거래정보수정)
    * @author        : Jihun Park
    * @date          : 2024.09.16
    * @return        : 주식거래정보
    */
    @PostMapping("/stckDlng/stckDlngUpdate.do" )
    public ResponseEntity<Map> stckDlngUpdate(@RequestBody Map<String, Object> map, Model model){
        Map<String, Object> mapData = stckDlngService.stckDlngUpdate(map);
        //Map<String, Object> mapData = null;
        //log.debug("========================= > stckDlngInsert");
        //log.debug("========================= > value " + map.toString());
        //log.debug("========================= > value " + mapData.toString());
        //model.addAttribute("msg",mapData );
        return ResponseEntity.ok().header("Content-Type", "application/json").body(mapData);
    }

	/**
	* @methodName    : stckDlngSelect(주식거래정보조회)
	* @author        : Jihun Park
	* @date          : 2024.09.16
	* @return		 : 주식거래정보
	*/
    @GetMapping("/stckDlng/stckDlngSelect.do")
    public String stckDlngSelect(@RequestParam Map<String, Object> parameter, Model model){
		//log.info("========================= > stckDlngSelect");
		//log.info("========================= > value " + parameter.toString());
        model.addAttribute("stckDlngSelect", stckDlngService.stckDlngSelect(parameter));
        model.addAttribute("stckInfoInq", stckDlngService.stckInfoInq());
        model.addAttribute("parameter", parameter);
		//return "index";
		return "view/stckDlng/stckDlngView";
    }
    
	/**
	* @methodName    : getDividendCycle(주식정보조회)
	* @author        : Jihun Park
	* @date          : 2024.09.18
	* @return		 : 주식정보
	*/
    @GetMapping("/getDividendCycle")
    public ResponseEntity<Map<String, String>> getDividendCycle(@RequestParam("STCNM") String STCNM) {
        // 주식명에 따른 배당주기 값을 DB에서 조회 (예시: 서비스 호출)
        Map<String, String> dividendCycle = stckDlngService.getDividendCycleByStockName(STCNM);
        
        return ResponseEntity.ok(dividendCycle);
    }
	
}
