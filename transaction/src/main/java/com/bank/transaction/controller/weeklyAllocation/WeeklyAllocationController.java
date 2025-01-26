package com.bank.transaction.controller.weeklyAllocation;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;

import com.bank.transaction.page.PaginationService;
import com.bank.transaction.service.file.FileService;
import com.bank.transaction.service.weeklyAllocation.WeeklyAllocationService;
import com.bank.transaction.uitle.Data;
import com.bank.transaction.uitle.Encode;

import lombok.extern.java.Log;
import lombok.extern.slf4j.Slf4j;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;

import java.io.ByteArrayOutputStream;
import java.io.IOException;
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
@Slf4j
@Controller
public class WeeklyAllocationController {
    
    @Autowired
    private WeeklyAllocationService weeklyAllocationService;

    // 페이징 처리
    private PaginationService paginationService = new PaginationService();
    
    //엑셀 다운로드 용
    @Autowired
    private FileService fileService;

    
    /**
    * @methodName    : stckInfoView(주식정보화면)
    * @author        : Jihun Park
    * @date          : 2024.09.15
    * @return         : 주식정보
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
    * @return         : 주식정보
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
    
    
    
    @GetMapping("/weeklyAllocation/WeeklyAllocationDownloadExcel")
    public ResponseEntity<byte[]> weeklyAllocationDownloadExcel(@RequestParam Map<String, Object> params) {
        try {
            // 1. 데이터 생성
            List<Map<String, Object>> transactionData = weeklyAllocationService.weeklyAllocationDownloadExcel(params);

            // 2. 엑셀 헤더 정의
            String[] headers = {"NO_", "TRNSCDATE", "STOCK_NAME", "AMOUNT", "DIVIDEND"};
            //String[] headers = {"순번", "배당일자", "주식명", "거래금액", "배당금"};
            for (String string : headers) {
                log.debug("str " + string);
            }
            // 3. 엑셀 파일 생성
            ByteArrayOutputStream excelOutput = fileService.excelDownload(transactionData, headers);
            String fileName = Encode.encodeFileName("주간거래내역_"+Data.strTodayDateFormat("YYYY-MM-DD")+".xlsx");
            // 4. HTTP 응답 설정 및 반환
            HttpHeaders responseHeaders = new HttpHeaders();
            responseHeaders.setContentType(MediaType.APPLICATION_OCTET_STREAM);
            responseHeaders.setContentDispositionFormData("attachment", fileName);

            return ResponseEntity.ok()
                    .headers(responseHeaders)
                    .body(excelOutput.toByteArray());

        } catch (Exception e) {
            log.error("엑셀 생성 실패: " + e.toString());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

}
