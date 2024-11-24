//팝업 띄우기
function fn_openPop(data) {
    // data-stockName 속성을 통해 Thymeleaf 변수를 가져옵니다
    var stockName = data.getAttribute('data-stockName');
    var parsedData;
    // 파라미터를 담을 객체 생성
    const params = {
       stockName: stockName // 주식명
    };
    // rowData를 URL 파라미터로 변환
    const queryParams = new URLSearchParams(params).toString();
    //alert(stockName);
    getFetch(`/hldStckCls/hldStckClsDetail?${queryParams}`, 'detail');
}

//팝업 닫기
function fn_closePop() {
    document.getElementById("popup_layer").style.display = "none";
}


/**
 * 콜백함수
 * @param data     : 리턴값
 **/
function fn_call(data){
    if("detail" == data.id){
        //alert(JSON.stringify(data));
        console.log(JSON.stringify(data));
        document.getElementById("stockName").innerText          = data.STOCK_NAME; // 종목명
        document.getElementById("stockQuantity").innerText      = data.STOCK_QUANTITY; // 주식수
        document.getElementById("purchasePrice").innerText      = data.PURCHASE_PRICE; // 매입금액
        document.getElementById("purchasePriceSum").innerText   = data.PURCHASE_PRICE_SUM; // 매입금(합계)
        document.getElementById("amount").innerText             = data.AMOUNT ; // 배당금(누적)
        /*
            amount:320.47
            purchase_price : "24.75"
            purchase_price_sum:9083.25
            stock_name : "schwabus dividend equity etf"
            stock_quantity:"367"
         */
        document.getElementById("popup_layer").style.display = "block";
    }
    
}