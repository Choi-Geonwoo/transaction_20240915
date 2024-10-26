package com.bank.transaction.controller.weeklyAllocation;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;

import com.bank.transaction.page.PaginationService;
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

    // 페이징 처리
    PaginationService paginationService = new PaginationService();

    
	/**
	* @methodName    : stckInfoView(주식정보화면)
	* @author        : Jihun Park
	* @date          : 2024.09.15
	* @return		 : 주식정보
	*/
	@GetMapping("/weeklyAllocation/weeklyAllocationView")
	public String WeeklyAllocationView(Model model
			,@RequestParam(value = "page", defaultValue = "1") final int page) {
		
		/*페이징 처리용 */
		Map<String, Object> mapData = new HashMap<>();
        mapData.put("page", page);
        mapData.put("rowCount", 10);
		/*페이징 처리용 */
        List<Map<String, Object>> weeklyAllocationSelect = weeklyAllocationService.weeklyAllocationList(mapData);

        /* ### 페이징 처리 ### */
        int currentPage = page; // 현재 페이지
        int totalCount = 0; // 총 게시물 개수
        if(!weeklyAllocationSelect.isEmpty()){
            totalCount = Integer.parseInt(String.valueOf(weeklyAllocationSelect.get(0).get("TOTALPAGES"))); // 총 게시물 개수
        }
        // Pagination 정보를 계산합니다.
        // PaginationService 객체를 생성합니다.
        Map<String, Object> paginationMap = paginationService.calculatePagination(totalCount, currentPage);
        /* ### 페이징 처리 ### */

        /* ### 페이징 처리 ### */
        model.addAttribute("page", page);
        model.addAttribute("pageVo", paginationMap);
        /* ### 페이징 처리 ### */
        model.addAttribute("byWeekList", weeklyAllocationSelect);
		return "view/weeklyAllocation/weeklyAllocationView";
	}
	
	/**
	* @methodName    : stckInfoView(주식정보 조회)
	* @author        : Jihun Park
	* @date          : 2024.09.15
	* @return		 : 주식정보
	*/
	@GetMapping("/weeklyAllocation/WeeklyAllocationSelectPage.do")
	public String WeeklyAllocationSelectPage(@RequestParam Map<String, Object> parameter
    		, @RequestParam(value = "page", defaultValue = "1") final int page
		    , Model model) {
		/*페이징 처리용 */
    	parameter.put("page", page);
        parameter.put("rowCount", 10);
        parameter.put("S_START_YMD",( "null".equals(parameter.get("S_START_YMD")) ? null :  parameter.get("S_START_YMD")));
        parameter.put("S_END_YMD"  ,( "null".equals(parameter.get("S_END_YMD"))   ? null :  parameter.get("S_END_YMD")));
        parameter.put("S_STCNM"    ,( "null".equals(parameter.get("S_STCNM"))     ? null :  parameter.get("S_STCNM")));
		/*페이징 처리용 */
		
        List<Map<String, Object>> weeklyAllocationSelect = weeklyAllocationService.weeklyAllocationList(parameter);
	
        /* ### 페이징 처리 ### */
        int currentPage = page; // 현재 페이지
        int totalCount = 0; // 총 게시물 개수
        if(!weeklyAllocationSelect.isEmpty()){
            totalCount = Integer.parseInt(String.valueOf(weeklyAllocationSelect.get(0).get("TOTALPAGES"))); // 총 게시물 개수
        }
        // Pagination 정보를 계산합니다.
        // PaginationService 객체를 생성합니다.
        Map<String, Object> paginationMap = paginationService.calculatePagination(totalCount, currentPage);
        
        
        /* ### 페이징 처리 ### */
        model.addAttribute("page", page);
        model.addAttribute("pageVo", paginationMap);
        model.addAttribute("parameter", parameter);
        /* ### 페이징 처리 ### */        
        
		model.addAttribute("byWeekList", weeklyAllocationSelect);
		return "view/weeklyAllocation/weeklyAllocationView";
	}
}
