package com.bank.transaction.controller.mnthAllocation;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

import com.bank.transaction.service.mnthAllocation.MnthAllocationService;

import lombok.extern.slf4j.Slf4j;

/**
* @packageName    : com.bank.transaction.controller.mnthAllocation(월간배당내역)
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
public class MnthAllocationController {

    @Autowired
    private MnthAllocationService mnthAllocationService;
    

	/**
	* @methodName    : stckDlngView(주식거래화면 페이징 추가)
	* @author        : Jihun Park
	* @date          : 2024.09.15
	* @return
	*/
	@GetMapping("/mnthAllocation/mnthAllocationView")
	public String MnthAllocationView(Model model) {
        
		model.addAttribute("mSelect", mnthAllocationService.mnthAllocationSelect(null));
		//return "index";
		return "view/mnthAllocation/MnthAllocationView";
	}
}
