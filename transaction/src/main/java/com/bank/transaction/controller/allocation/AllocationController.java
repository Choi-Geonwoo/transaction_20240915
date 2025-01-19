package com.bank.transaction.controller.allocation;

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
    @PostMapping("/allocation/allocationDetail.do" )
    public ResponseEntity<Map> allocationDetail(@RequestBody Map<String, Object> map, Model model){
        Map<String, Object> mapData = allocationService.allocationDetail(map);
        return ResponseEntity.ok().header("Content-Type", "application/json").body(mapData);
    }
    
    /**
     * @methodName    : stckInfoInsert(주식거래 상세 등록)
     * @author        : Jihun Park
     * @date          : 2024.09.15
     * @return
    */
    @PostMapping("/allocation/allocationInsert.do")
    public ResponseEntity<Object> stckInfoInsert(@RequestPart(value = "key") HashMap map
    	    , @RequestPart(value = "files", required = false) String files) {
        try {
            // 서비스 호출 및 데이터 처리
            Map<String, Object> mapData = allocationService.allocationInsert(map, files);
            
            // JSON 객체 생성
            JSONObject jsonObject = new JSONObject();
            jsonObject.put("list", mapData);
            jsonObject.put("msg", mapData.get("msg"));

            // 성공 응답 반환
            return ResponseEntity.ok(jsonObject.toString());
        } catch (Exception e) {
            // 예외 처리
            JSONObject errorResponse = new JSONObject();
            errorResponse.put("error", "데이터를 처리하는 중 오류가 발생했습니다.");
            errorResponse.put("msg", e.getMessage());

            // 에러 응답 반환
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(errorResponse.toString());
        }
    }

}
