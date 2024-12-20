/**
 * 엑셀 다운로드
 * @param data     : 리턴값
 **/    
function fn_ExcelDownload(){
    
    // 행 데이터를 저장할 JSON 객체 생성
    var rowData = { S_START_YMD : null};
    
    // rowData를 URL 파라미터로 변환
    const queryParams = new URLSearchParams(rowData).toString();
    
    getExcelFetch('/weeklyAllocation/WeeklyAllocationDownloadExcel','주간거래내역_'+toDay('YYYY-MM-DD')+'.xlsx','ExcelDownload');
}
/**
 * 콜백함수
 * @param data     : 리턴값
 **/    
function fn_call(data, id){
    if(id == 'ExcelDownload'){
        alert("성공 했습니다.");
    }
}