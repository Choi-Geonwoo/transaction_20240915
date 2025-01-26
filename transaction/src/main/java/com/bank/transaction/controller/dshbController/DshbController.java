package com.bank.transaction.controller.dshbController;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

import com.bank.transaction.service.dshb.DshbService;

import lombok.extern.slf4j.Slf4j;
/**
* @packageName    : com.bank.transaction.controller.dshbController(대시보드)
* @fileName       : DshbController.java
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
public class DshbController {
    
    @Autowired
    private DshbService dshbService;
    
    /**
    * @methodName    : dshbView(대시보드)
    * @author        : Jihun Park
    * @date          : 2024.09.15
    * @return
    */
    @GetMapping("/dshb/dshbView")
    public String dshbView(Model model) {
	model.addAttribute("sumList", dshbService.selectSum(null));
        return "view/dshb/dshbView";
    }
}
