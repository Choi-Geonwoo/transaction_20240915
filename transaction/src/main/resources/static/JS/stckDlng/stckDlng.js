

function chageLangSelect(){
    var langSelect = document.getElementById("STCNM_SELECT_BOX");
     
    // select element에서 선택된 option의 value가 저장된다.
    var selectValue = langSelect.options[langSelect.selectedIndex].value;
 
    // select element에서 선택된 option의 text가 저장된다.
    var selectText = langSelect.options[langSelect.selectedIndex].text;
    alert("text : " + selectText + " value : " + selectValue);
};


// 주식명 선택 시 배당주기 업데이트 함수
async function updateDividendCycle() {
        const stockSelectBox = document.getElementById("STCNM_SELECT_BOX");
        const dividendCycleSelectBox = document.getElementById("DVDNCYC_SELECT_BOX");

        const selectedStock = stockSelectBox.value;

        // 배당주기 select box의 기존 옵션을 모두 제거
        dividendCycleSelectBox.innerHTML = '';

        // 선택된 주식명이 없을 경우 "선택" 옵션만 추가하고 종료
        if (selectedStock === '') {
            const option = document.createElement('option');
            option.value = '';
            option.text = '선택';
            dividendCycleSelectBox.appendChild(option);
            return;
        }

        try {
            // 서버로 비동기 요청을 보내 주식명에 해당하는 배당주기 가져오기
            const response = await fetch(`/getDividendCycle?STCNM=${selectedStock}`);
            
            if (response.ok) {
                const dividendCycle = await response.text();
                console.log(dividendCycle);
                // JSON 형식의 응답 파싱
                //const data = await response.json();
                //console.log(`Stock: ${data.DVDNCYC}, Dividend Cycle: ${data.DVDN}`);
                // 배당주기 select box에 새로운 옵션 추가
                const option = document.createElement('option');
                option.value = dividendCycle;
                option.text = dividendCycle;
                dividendCycleSelectBox.appendChild(option);
            } else {
                console.error('Error fetching dividend cycle:', response.status);
            }
        } catch (error) {
            console.error('Error:', error);
        }
};

    
// 주식명 선택 시 배당주기 업데이트 함수
async function updateDividendCycle01() {
        const stockSelectBox = document.getElementById("STCNM_SELECT_BOX"); //주식명
        const dividendCycleSelectBox = document.getElementById("DVDNCYC_SELECT_BOX"); //배당주기
        const dvdnSelectBox = document.getElementById("DVDN_SELECT_BOX"); //배당금
        const tikerSelectBox = document.getElementById("TIKER_SELECT_BOX"); //주식명

        const selectedStock = stockSelectBox.value;

        // 배당주기,배당금 select box의 기존 옵션을 모두 제거
        dividendCycleSelectBox.innerHTML = '';
        dvdnSelectBox.innerHTML = '';
        tikerSelectBox.innerHTML = '';

        // 선택된 주식명이 없을 경우 "선택" 옵션만 추가하고 종료
        if (selectedStock === '') {
            const option = document.createElement('option');
            option.value = '';
            option.text = '선택';
            dividendCycleSelectBox.appendChild(option);
            dvdnSelectBox.appendChild(option);
            tikerSelectBox.appendChild(option);
            return;
        }
		//console.log(selectedStock);
        try {
            // 서버로 비동기 요청을 보내 주식명에 해당하는 배당주기 가져오기 (JSON 응답)
            const response = await fetch(`/getDividendCycle?TIKER=${selectedStock}`);
            
            if (response.ok) {
                // JSON 형식의 응답 파싱
                const data = await response.json();
               //console.log(data);
                // 주식명과 배당주기 데이터 출력

                // 배당주기 select box에 새로운 옵션 추가
                const option = document.createElement('option');
                option.value = data.DVDNCYC;
                option.text = data.DVDNCYC;
                //console.log(`1. option.value : ${option.value}, option.text: ${option.text}`);
                dividendCycleSelectBox.appendChild(option);
                // 배당금
                const option01 = document.createElement('option');
                option01.value = data.DVDN;
                option01.text = data.DVDN;
                //console.log(`2. option01.value : ${option.value}, option.text: ${option01.text}`);
                dvdnSelectBox.appendChild(option01);
                //주식명
                const option02 = document.createElement('option');
                option02.value = data.TIKER;
                option02.text = data.TIKER;
                console.log(`3. option.value : ${option02.value}, option.text: ${option02.text}`);
                tikerSelectBox.appendChild(option02);
            } else {
                console.error('Error fetching dividend cycle:', response.status);
            }
        } catch (error) {
            console.error('Error:', error);
        }
};
    
    
   
// 주식명 선택 시 배당주기 업데이트 함수
async function updateDividendCycle02() {
        const stockSelectBox = document.getElementById("U_STCNM_SELECT_BOX"); //주식명
        const dvdncyc= document.getElementById("U_DVDNCYC"); //배당주기
        const dvdn = document.getElementById("U_DVDN"); //배당금
        const dlngamt = document.getElementById("U_DLNGAMT"); //1년치 배당
        const stckcnt = document.getElementById("U_STCKCNT"); //주식수

        const selectedStock = stockSelectBox.value;
        // 선택된 주식명이 없을 경우 "선택" 옵션만 추가하고 종료
        if (selectedStock === '') {
            return;
        }
		//console.log(selectedStock);
        try {
            // 서버로 비동기 요청을 보내 주식명에 해당하는 배당주기 가져오기 (JSON 응답)
            const response = await fetch(`/getDividendCycle?STCNM=${selectedStock}`);
            
            if (response.ok) {
                // JSON 형식의 응답 파싱
                const data = await response.json();
               console.log(data.DVDN);
               dvdncyc.value= data.DVDNCYC; //배당주기
               dvdn.value= data.DVDN; //배당금
               dlngamt.value= Number(stckcnt.value) * Number(data.DVDN); //1년치 배당금 (수량 * 배당금)
            } else {
                console.error('Error fetching dividend cycle:', response.status);
            }
        } catch (error) {
            console.error('Error:', error);
        }
};
    
// 주식명 선택 시 배당주기 업데이트 함수
async function updateDividendCycle03(event) {
    // 이벤트가 발생한 select 요소의 부모 행(table row)을 가져옵니다.
    const row = event.target.closest('tr');
    const stockSelectBox = row.querySelector("#U_STCNM_SELECT_BOX"); // 주식명
    const dvdncyc = row.querySelector("#U_DVDNCYC"); // 배당주기
    const dvdn = row.querySelector("#U_DVDN"); // 배당금
    const dlngamt = row.querySelector("#U_DLNGAMT"); // 1년치 배당
    const stckcnt = row.querySelector("#U_STCKCNT"); // 주식 수량

    const selectedStock = stockSelectBox.value;

    // 선택된 주식명이 없을 경우 "선택" 옵션만 추가하고 종료
    if (selectedStock === '') {
        dvdncyc.value = '';
        dvdn.value = '';
        dlngamt.value = '';
        return;
    }

    try {
        // 서버로 비동기 요청을 보내 주식명에 해당하는 배당주기 가져오기 (JSON 응답)
        const response = await fetch(`/getDividendCycle?STCNM=${selectedStock}`);
        
        if (response.ok) {
            // JSON 형식의 응답 파싱
            const data = await response.json();
            console.log(data);

            // 배당주기, 배당금, 1년치 배당 값 설정
            dvdncyc.value = data.DVDNCYC; // 배당주기
            dvdn.value = data.DVDN; // 배당금
            dlngamt.value = (Number(stckcnt.value) * Number(data.DVDN)) * Number(dvdncyc.value.split(',').length); // 수량 * 배당금 = 1년치 배당금 (소수점 2자리까지 표시)
        } else {
            console.error('Error fetching dividend cycle:', response.status);
        }
    } catch (error) {
        console.error('Error:', error);
    }
}


/**
 * 주식정보 데이터 수정
 * @param tb_id     : 테이블 ID
 * @param button    : 테이블정보(this)
 **/
 function rowUpdateClicked(tb_id, button) {
      // Get the row of the clicked button
      var row = button.parentElement.parentElement;
      var headerSelector = tb_id+' thead th';
      //alert(headerSelector);
      // Get the table headers to use as keys
      var headers = document.querySelectorAll(headerSelector);

      // Create a JSON object to store row data
      var rowData = {};
	  //console.log("1 " + row.cells.length);
      // Loop through each cell in the row, skipping the last column (button)
      for (var i = 0; i < row.cells.length - 1; i++) {
        var input = row.cells[i].querySelector('input');
        var headerName = headers[i].getAttribute('name'); // Get the 'name' attribute from <th>
        //console.log(i +" : "+ headerName+ " | " + input );
        // Check if input is a checkbox and store value accordingly
        if(!isEmpty(input)){
			console.log(i +"  " + input.type + " value : " + input.value);
           //if (input.type === 'checkbox') {
           //  rowData[headerName] = input.checked ? 'Y' : 'N';
           //} else {
             rowData[headerName] = input.value;
             //console.log(JSON.stringify(input));
           //}
        }
      }
      //alert(JSON.stringify(rowData));
      // document.querySelector('p').innerText = JSON.stringify(rowData, null, 2);
      //fetch API를 사용하여 POST 요청을 보냅니다
      //fetch002('/stckInfo/stckInfoUpdate.do', "post", rowData); //url, method, body
};
    
/**
 * 주식정보 데이터 수정
 * @param tb_id     : 테이블 ID
 * @param button    : 테이블정보(this)
 * @param cmpr  	: 수정/삭제 여부
 **/
function rowUpdateClicked01(tb_id, button, del_yn) {
		// 클릭된 버튼의 행 가져오기
		var row = button.parentElement.parentElement;
		var headerSelector = tb_id + ' thead th';
		
		// 테이블 헤더를 키로 사용하기 위해 가져오기
		var headers = document.querySelectorAll(headerSelector);
		
		// 행 데이터를 저장할 JSON 객체 생성
		var rowData = {};
		
		// 각 셀을 순회하며 데이터를 추출 (마지막 셀은 버튼이므로 제외)
		for (var i = 0; i < row.cells.length - 1; i++) {
		    var headerName = headers[i].getAttribute('name');
		    
		    // 셀 안에 있는 입력 요소(input, select 등) 가져오기
		    var input = row.cells[i].querySelector('input, select, textarea');
		
		    if (input) {
				console.log(headerName+ " | "+input.type + " | " + input.value);
		        // input type에 따른 데이터 처리
		        if (input.type === 'checkbox') {
		            rowData[headerName] = input.checked ? 'Y' : 'N';
		        } else if (input.type === 'date') {
		            rowData[headerName] = input.value;  // 날짜 포맷 그대로 전달
		        } else if (input.type === 'hidden') {
		            rowData[headerName] = input.value;  // hidden 값 추가
		        } else {
		            rowData[headerName] = input.value;  // 일반 텍스트 값
		        }
		        
		        // 'disabled' 속성이 있는 요소도 처리할 수 있도록 체크 (배당금, 배당주기 등)
		        if (input.hasAttribute('disabled')) {
		            rowData[headerName] = input.value;  // disabled 상태라도 값은 포함
		        }
		    }
		}
		
		rowData["DEL_YN"] = del_yn; // 삭제 여부 추가
		// 확인용 로그 출력 (추후에 Ajax 등을 이용해 서버로 전송 가능)
		//console.log("Row Data: ", JSON.stringify(rowData));
		//fetch API를 사용하여 POST 요청을 보냅니다
		fetch002('/stckDlng/stckDlngUpdate.do', "post", rowData); //url, method, body

};

/**
 * 콜백함수
 * @param data     : 리턴값
 **/    
function fn_call(data){
	//alert(data.msg);
	if(data.msg.indexOf('성공') != -1){
		history.go(0);
	}
	
}


