function sendCountyOffice(stockName,trnscdate, month){
	//alert("stockName :::" + stockName + "\ntrnscdate ::: " + trnscdate+"\nmonth ::: " + month);
	// 행 데이터를 저장할 JSON 객체 생성
	var rowData = {};
	rowData["stockName"]  = stockName;
	rowData["trnscdate"]  = trnscdate + month + "01";
	//rowData["month"]  = month;
	//console.log("Row Data: ", JSON.stringify(rowData));
    //fetch002();
 	//fetch API를 사용하여 POST 요청을 보냅니다
    fetch002('/stckDlng/allocationDetail.do', "post", rowData); //url, method, body
}

/**
 * 콜백함수
 * @param data     : 리턴값
 **/    
function fn_call(data){
   //console.log();
   //console.log("Row Data: ", JSON.stringify(data));
    var jsonData = JSON.stringify(data);
   //# JSON 데이터 파싱
    var parsedData = JSON.parse(jsonData);
    var fileName = "";
    if(!isEmpty(parsedData.fileList)){
        fileName = parsedData.fileList.fname;
    }
    //console.log("Row Data: " + parsedData.fileList.reContents);
  const modal = document.createElement('div');
  modal.classList.add('modal-background');
  modal.innerHTML = `
    <div class="modal-content01">
      <div class="container01"> 
        <div class="div_title01">주식명 : ${data.STOCK_NAME} </div>       
          <div class="div_body01">
              <table>
                <tr>
                  <td>
                      주식명 
                  </td>
                  <td>
                      <input type="text"  class="full-width-input" value="${data.STOCK_NAME}">
                  </td>
                </tr>
                <tr>
                  <td>
                      거래 일자
                  </td>
                  <td>
                      <input type="date"  class="full-width-input09_data" value="${data.TRNSCDATE}">
                  </td>
                </tr>
                <tr>
                  <td>
                      배당금
                  </td>
                  <td>
                      <input type="text"   class="full-width-input" value="${data.DIVIDEND}">
                  </td>
                </tr>
                <tr>
                  <td>
                      거래 금액
                  </td>
                  <td>
                      <input type="text"  class="full-width-input" value="${data.AMOUNT}">
                  </td>
                </tr>
                <tr>
                  <td>
                      파일명
                  </td>
                  <td>
                      <input type="text" class="full-width-input" value="${fileName}">
                  </td>
                </tr>
                <tr >
                  <td>
                      이미지
                  </td>
                  <td>
                      <img id="image1" style="height: 330px; width:90%;">
                  </td>
                </tr>
                <tr>
                  <td>
                  </td>
                  <td>
                    <button class="delete-button">취소</button>
                    <button class="update-button">저장</button>
                  </td>
                </tr>
              </table>
          </div>
      </div>
    </div>
  `;
  
  document.body.appendChild(modal);
  
  // Pass the callback to the handleButtonClick function
  modal.addEventListener('click', handleButtonClick01);
    
    if(!isEmpty(parsedData.fileList)){
    // 이미지 출력
    fu_img(parsedData.fileList.reContents);
    }
    
}

const handleButtonClick01 = (event) => {
  const { target } = event;
  if (target.classList.contains('delete-button')) {
    removeModal01();
  } else if (target.classList.contains('update-button')) {
    removeModal01();
  }
};

const removeModal01 = () => {
  const modal = document.querySelector('.modal-background');
  document.body.removeChild(modal);
};


// 이미지 출력
function fu_img(imgData){
        // 이미지를 표시할 <img> 요소 가져오기
        var imageElement1 = document.getElementById("image1");
        // 이미지
        let image1 = document.getElementById('image1');
        var byteData =  JSON.parse(imgData);
        // 바이트 데이터를 Blob으로 변환
        var blobData = new Blob([new Uint8Array(byteData)], { type: 'image/jpeg' });
        
        //console.log("byteData  \n " + byteData);
        // Blob 데이터를 Blob URL로 변환
        var blobUrl = URL.createObjectURL(blobData);
        imageElement1.src =  blobUrl;
}

// 바차트
function allocationBarChart(value){
  
  var months = ["JANUARY", "FEBRUARY", "MARCH", "APRIL", "MAY", "JUNE", "JULY", "AUGUST", "SEPTEMBER", "OCTOBER", "NOVEMBER", "DECEMBER"];
  var stockNames = value.map(stock => stock.STOCK_NAME);

  var datasets = stockNames.map((stockName, index) => {
      return {
          label: stockName,
          data: months.map(month => value[index][month]),
          backgroundColor: `rgba(${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, 0.2)`,
          borderColor: `rgba(${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, 1)`,
          borderWidth: 1
      }
  });
  var ctx = document.getElementById("bar_chart").getContext('2d');
  var myChart = new Chart(ctx, {
                      type: 'bar',
                      data: {
                          labels: ["1월", "2월", "3월", "4월", "5월", "6월", "7월", "8월", "9월", "10월", "11월", "12월"],//month != null ? Object.values(month) : Object.values(monthNumbers),
                          datasets: datasets
                      },
                      options: {
                          scales: {
                              y: {
                                  beginAtZero: true
                              }
                          }
                      }
     });
}
