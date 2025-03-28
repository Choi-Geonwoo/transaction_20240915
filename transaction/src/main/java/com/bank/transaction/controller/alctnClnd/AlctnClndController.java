package com.bank.transaction.controller.alctnClnd;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.ResponseBody;

import com.bank.transaction.service.alctnClnd.AlctnClndService;
import com.bank.transaction.service.allocation.AllocationService;
import com.bank.transaction.uitle.Data;
import com.bank.transaction.uitle.MultiDatasetResponse;

/**
* @packageName    : com.bank.transaction.controller.alctnClnd(배당달력)
* @fileName       : AlctnClndController.java
* @author         : Jihun Park
* @date           : 2024.09.15
* @description    :
* ============================================================
* DATE              AUTHOR             NOTE
* -----------------------------------------------------------
* 2024.09.15        Jihun Park       최초 생성
*/
@Controller
public class AlctnClndController {

    @Autowired
    private AlctnClndService alctnClndService;    
    
    /**
    * @methodName    : alctnClndView(배당달력)
    * @author        : Jihun Park
    * @date          : 2024.09.15
    * @return
    */
    @GetMapping("/alctnClnd/alctnClndView")
    //@ResponseBody
    public String alctnClndView(Model model) {
        //model.addAttribute("list", alctnClndService.alctnClndSelect(map));
        return "view/alctnClnd/alctnClndView";
    }

    /**
    * @methodName    : alctnClndView(배당달력)
    * @author        : Jihun Park
    * @date          : 2024.09.15
    * @return
    */
    @GetMapping("/alctnClnd/alctnClndSelect")
    public ResponseEntity<List<Map<String, Object>>> alctnClndSelect(Model model, @RequestParam Map<String, Object> params) {
        //model.addAttribute("list", alctnClndService.alctnClndSelect(map));
        return ResponseEntity.ok().header("Content-Type", "application/json").body(alctnClndService.alctnClndSelect(params));
    }
    
    /**
    * @methodName    : stckClndView(주식달력)
    * @author        : Jihun Park
    * @date          : 2024.09.15
    * @return
    */
    @GetMapping("/alctnClnd/stckClndView")
    //@ResponseBody
    public String stckClndView(Model model) {
        //model.addAttribute("list", alctnClndService.alctnClndSelect(map));
        return "view/alctnClnd/stckClndView";
    }
    

    /**
    * @methodName    : stckClndSelect(배당달력)
    * @author        : Jihun Park
    * @date          : 2024.09.15
    * @return
    */
    @GetMapping("/alctnClnd/stckClndSelect")
    public ResponseEntity<MultiDatasetResponse> stckClndSelect(Model model, @RequestParam Map<String, Object> params) {
        //model.addAttribute("list", alctnClndService.alctnClndSelect(map));
        return ResponseEntity.ok().header("Content-Type", "application/json").body(alctnClndService.stckClndSelect(params));
    }
  

}
