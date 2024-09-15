package com.bank.transaction.controller.stckDlng;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

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
}
