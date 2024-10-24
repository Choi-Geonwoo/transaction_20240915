package com.bank.transaction.controller.weeklyAllocation;

import org.springframework.web.bind.annotation.GetMapping;

import com.bank.transaction.service.weeklyAllocation.WeeklyAllocationService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
* @packageName    : com.bank.transaction.controller.stckInfo(주식정보)
* @fileName       : WeeklyAllocationController.java
* @author         : Jihun Park
* @date           : 2024.09.15
* @description    :
* ===========================================================
* DATE              AUTHOR             NOTE
* -----------------------------------------------------------
* 2024.09.15        Jihun Park       최초 생성
*/
@Controller
public class WeeklyAllocationController {
	
	@Autowired
	private WeeklyAllocationService weeklyAllocationService;

	/**
	* @methodName    : stckInfoView(주식정보화면)
	* @author        : Jihun Park
	* @date          : 2024.09.15
	* @return		 : 주식정보
	*/
	@GetMapping("/weeklyAllocation/weeklyAllocationView")
	public String WeeklyAllocationView(Model model) {
		model.addAttribute("byWeekList", weeklyAllocationService.weeklyAllocationList(null));
		return "view/weeklyAllocation/weeklyAllocationView";
	}
}
