package com.bank.transaction.controller.stckDlng;

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

import com.bank.transaction.service.stckDlng.StckDlngService;

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
	public String stckDlngView() {
		//return "index";
		return "view/stckDlng/stckDlngView";
	}
	

	/**
	* @methodName    : stckDlngView(주식거래정보등록)
	* @author        : Jihun Park
	* @date          : 2024.09.16
	* @return		 : 주식거래정보
	*/
    @PostMapping("/stckDlng/stckDlngInsert.do" )
    public ResponseEntity<Map> stckDlngInsert(@RequestBody Map<String, Object> map, Model model){
        Map<String, Object> mapData = stckDlngService.stckDlngInsert(map);
        //log.debug("========================= > stckDlngInsert");
        //log.debug("========================= > value " + map.toString());
        //log.debug("========================= > value " + mapData.toString());
        //model.addAttribute("msg",mapData );
        return ResponseEntity.ok().header("Content-Type", "application/json").body(mapData);
    }

    /**
    * @methodName    : stckDlngView(주식거래정보수정)
    * @author        : Jihun Park
    * @date          : 2024.09.16
    * @return        : 주식거래정보
    */
    @PostMapping("/stckDlng/stckDlngUpdate.do" )
    public ResponseEntity<Map> stckDlngUpdate(@RequestBody Map<String, Object> map, Model model){
        Map<String, Object> mapData = stckDlngService.stckDlngUpdate(map);
        //log.debug("========================= > stckDlngInsert");
        //log.debug("========================= > value " + map.toString());
        //log.debug("========================= > value " + mapData.toString());
        //model.addAttribute("msg",mapData );
        return ResponseEntity.ok().header("Content-Type", "application/json").body(mapData);
    }

	/**
	* @methodName    : stckDlngView(주식거래정보조회)
	* @author        : Jihun Park
	* @date          : 2024.09.16
	* @return		 : 주식거래정보
	*/
    @GetMapping("/stckDlng/stckDlngSelect.do")
    public String stckDlngSelect(@RequestParam Map<String, Object> passwordForm, Model model){
		//log.info("========================= > stckDlngSelect");
		//log.info("========================= > value " + passwordForm.toString());
		List<Map<String, Object>> stckDlngSelect = stckDlngService.stckDlngSelect(passwordForm);
        model.addAttribute("stckDlngSelect", stckDlngSelect);
		//return "index";
		return "view/stckDlng/stckDlngView";
    }
	
}
