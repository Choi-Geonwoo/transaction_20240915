package com.bank.transaction.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class MainHome {
	
	@GetMapping("/")
	public String mainView() {
		//return "index";
		//return "view/stckInfo/stckInfoView";
		return "redirect:/stckInfo/stckInfoView";
	}
}
