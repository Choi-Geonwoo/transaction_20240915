package com.bank.transaction.controller.allocation;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

import com.bank.transaction.service.allocation.AllocationService;

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
	* @methodName    : stckDlngView(주식거래화면 페이징 추가)
	* @author        : Jihun Park
	* @date          : 2024.09.15
	* @return
	*/
	@GetMapping("/allocation/allocationView")
	public String allocationView(Model model) {
        
		model.addAttribute("aSelect", allocationService.allocationMapperSelect(null));
		//return "index";
		return "view/allocation/allocationView";
	}
}
