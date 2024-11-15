package com.bank.transaction.controller.mnthAllocation;


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
    
    /**
     * @methodName    : allocationView(주식거래 상세 조회)
     * @author        : Jihun Park
     * @date          : 2024.09.15
     * @return
    */
    @PostMapping("/mnthAllocation/allocationDetail.do")
    public ResponseEntity<Object> mnthAllocationDetail(@RequestBody Map<String, Object> map, Model model) {
        try {
            // 서비스 호출 및 데이터 처리
            List<Map<String, Object>> mapData = mnthAllocationService.mnthAllocationDetail(map);
            
            // JSON 객체 생성
            JSONObject jsonObject = new JSONObject();
            jsonObject.put("list", mapData);

            // 성공 응답 반환
            return ResponseEntity.ok(jsonObject.toString());
        } catch (Exception e) {
            // 예외 처리
            JSONObject errorResponse = new JSONObject();
            errorResponse.put("error", "데이터를 처리하는 중 오류가 발생했습니다.");
            errorResponse.put("message", e.getMessage());

            // 에러 응답 반환
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(errorResponse.toString());
        }
    }
}
