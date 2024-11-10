package com.bank.transaction.controller.allocation;

import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;

import com.bank.transaction.service.allocation.AllocationService;
import com.bank.transaction.uitle.Data;

/**
* @packageName    : com.bank.transaction.controller.allocation(거래정보)
* @fileName       : AllocationController.java
* @author         : Jihun Park
* @date           : 2024.09.15
* @description    :
* ============================================================
* DATE              AUTHOR             NOTE
* -----------------------------------------------------------
* 2024.09.15        Jihun Park       최초 생성
*/
@Controller
public class AllocationController {

    @Autowired
    private AllocationService allocationService;

	/**
	* @methodName    : allocationView(주식거래화면 추가)
	* @author        : Jihun Park
	* @date          : 2024.09.15
	* @return
	*/
	@GetMapping("/allocation/allocationView")
	public String allocationView(Model model) {
		Map<String, Object> data = new HashMap();
		data.put("year", String.valueOf(Data.todayDateFormat("year")));
		data.put("month", String.valueOf(Data.todayDateFormat("month")));
		model.addAttribute("aSelect", allocationService.allocationSelect(data));
        model.addAttribute("parameter", data);
		//return "index";
		return "view/allocation/allocationView";
	}

	/**
	* @methodName    : allocation(주식거래화면 검색 페이징 추가)
	* @author        : Jihun Park
	* @date          : 2024.09.15
	* @return
	*/
	@GetMapping("/allocation/allocationSearch.do")
	public String allocation(@RequestParam Map<String, Object> data, Model model) {
        model.addAttribute("parameter", data);
		model.addAttribute("aSelect", allocationService.allocationSelect(data));
		//return "index";
		return "view/allocation/allocationView";
	}
	
    /**
	* @methodName    : allocationView(주식거래 상세 조회)
	* @author        : Jihun Park
	* @date          : 2024.09.15
	* @return
    */
    @PostMapping("/stckDlng/allocationDetail.do" )
    public ResponseEntity<Map> allocationDetail(@RequestBody Map<String, Object> map, Model model){
        Map<String, Object> mapData = allocationService.allocationDetail(map);
        return ResponseEntity.ok().header("Content-Type", "application/json").body(mapData);
    }
    

}
