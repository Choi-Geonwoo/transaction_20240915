/*************************************
 * 조회용 함수
 *************************************/
/**
 * 콜백함수
 * @param data     : 리턴값
 **/
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
    fetch003('/allocation/allocationDetail.do', "post", rowData, "allocationDetail"); //url, method, body
}


/**
 * 콜백함수
 * @param data     : 리턴값
 **/
function fn_inputModalCall(){
    // 행 데이터를 저장할 JSON 객체 생성
    var rowData = {};
    getFetch('/com/stckInfoInq.do', "stckInfoInq"); //url, method, body
}
/*************************************
 * 콜백 함수
 *************************************/

/**
 * 콜백함수
 * @param data     : 리턴값
 **/
function fn_call(data){
    if("allocationDetail" == data.id){
        fn_updateModal(data)
    }else if("stckInfoInq" == data.id){
        fn_insertModal(data);
    }
    
}

/*************************************
 * function 함수
 *************************************/
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


/**
 * 이미지 출력
 * @param imgData     : 이미지 Blob
 **/
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

/**
 * 바차트
 * @param value     : 주식 정보
 **/
function allocationBarChart(value, p_month){
  //console.log("1. " + p_month);
  let labels = [];
  var months = ["JANUARY", "FEBRUARY", "MARCH", "APRIL", "MAY", "JUNE", "JULY", "AUGUST", "SEPTEMBER", "OCTOBER", "NOVEMBER", "DECEMBER"];
  
  if(!isEmpty(p_month)){
    labels = [p_month + '월'];
  }else {
    labels = ["1월", "2월", "3월", "4월", "5월", "6월", "7월", "8월", "9월", "10월", "11월", "12월"]
  }
  var stockNames = value.map(stock => stock.STOCK_NAME);
  var dataValue = "";
    const datasets = stockNames.map((stockName, index) => {
        //console.log(months.map(month => value[index][month]));
        //console.log();
        if(!isEmpty(p_month)){
           dataValue = months.map(month => value[index][month]).filter(dataPoint => dataPoint !== 0 && dataPoint !== undefined)
        }else{
            dataValue =months.map(month => value[index][month]);
        }
        return {
            label: stockName,
            //data: months.map(month => value[index][month]) // 각 월의 값을 가져옴
            //    .filter(dataPoint => dataPoint !== 0 && dataPoint !== undefined), // 0 또는 undefined가 아닌 값만 포함
            data : dataValue,
            backgroundColor: `rgba(${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, 0.2)`,
            borderColor: `rgba(${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, 1)`,
            borderWidth: 1
        };
    });
  //console.log(datasets)
  var ctx = document.getElementById("bar_chart").getContext('2d');
  var myChart = new Chart(ctx, {
      type: 'bar',
      data: {
           labels: labels//["1월", "2월", "3월", "4월", "5월", "6월", "7월", "8월", "9월", "10월", "11월", "12월"],//month != null ? Object.values(month) : Object.values(monthNumbers),
          ,datasets: datasets
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
/*************************************
 * 모달 함수
 *************************************/
/**
 * 주식 수정 모달
 * @param data     : 주식 정보
 **/
function fn_updateModal(data){
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
        <div class="div_title01">주식명 : ${data.STOCK_NAME}   </div> 
          <div class="div_body01">
              <table>
                <tr>
                  <td class="minW70">
                      주식명 
                  </td>
                  <td>
                      <input type="text"  class="full-width-input10" value="${data.STOCK_NAME}" readonly>
                  </td>
                </tr>
                <tr>
                  <td  class="minW70">
                      거래 일자
                  </td>
                  <td>
                      <input type="date"  class="full-width-input02_data w90_" value="${data.TRNSCDATE}">
                  </td>
                </tr>
                <tr>
                  <td  class="minW70"> 
                      배당금
                  </td>
                  <td>
                      <input type="text"   class="full-width-input10" value="${data.DIVIDEND}">
                  </td>
                </tr>
                <tr>
                  <td  class="minW70">
                      거래 금액
                  </td>
                  <td>
                      <input type="text"  class="full-width-input10" value="${data.AMOUNT}">
                  </td>
                </tr>
                <tr>
                  <td  class="minW70">
                      파일명
                  </td>
                  <td>
                      <input type="text" class="full-width-input" value="${fileName}">
                  </td>
                </tr>
                <tr >
                  <td  class="minW70">
                      이미지
                  </td>
                  <td>
                      <img id="image1" style="min-height : 300px; max-height : 300px; width : 100%;">
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

/**
 * 주식 등록 모달
 * @param data     : 주식명 정보
 **/
function fn_insertModal(data){
   //console.log();
   //console.log("Row Data: ", JSON.stringify(data));
   var div = `<select name="CMPR" id="CMPR" class="full-width-input">`;
/*                                    <select name="CMPR" id="CMPR" class="full-width-input">
                                      <option value="1">연금저축</option>                            
                                      <option value="2">퇴직연금</option>                          
                                      <option value="3">일반계좌</option>
                                    </select>*/
    // JSON이나 멤버 변수를 갖는 객체에 대한 반복문
    for(let key in data) {
        console.log(key + ' | ' + data[key]);
        if("id" == key) continue;
        div += `<option value=${data[key].TIKER}>${data[key].STCNM}</option>`;
    }
    div += `</select>`;
    //console.log("Row Data: " + parsedData.fileList.reContents);
  const modal = document.createElement('div');
  modal.classList.add('modal-background');
  modal.innerHTML = `
    <div class="modal-content01">
      <div class="container01"> 
        <div class="div_title01">신규 등록 </div>       
          <div class="div_body01">
              <table>
                <tr>
                  <td  class="minW70">
                      주식명 
                  </td>
                  <td>
                      ${div}
                  </td>
                </tr>
                <tr>
                  <td  class="minW70"> 
                      거래 일자
                  </td>
                  <td>
                      <input type="date"  class="full-width-input02_data w90_" id="I_TRNSCDATE">
                  </td>
                </tr>
                <tr>
                  <td  class="minW70">
                      배당금
                  </td>
                  <td>
                      <input type="text"   class="full-width-input10" id="I_DIVIDEND">
                  </td>
                </tr>
                <tr>
                  <td  class="minW70">
                      거래 금액
                  </td>
                  <td>
                      <input type="text"  class="full-width-input10" id="I_AMOUNT" >
                  </td>
                </tr>
                <tr>
                  <td  class="minW70">
                      파일명
                  </td>
                  <td>
                      <input type="file" class="form-control" id="I_FILE" name="I_FILE"  accept="image/*" onchange="readURL(this, 'I_IMG');"  ><!--onchange="toBase64(event);"-->
                  </td>
                </tr>
                <tr >
                  <td  class="minW70">
                      이미지
                  </td>
                  <td>
                      <img id="I_IMG" style="min-height : 300px; max-height : 300px; width : 100%;">
                  </td>
                </tr>
                <tr>
                  <td>
                  </td>
                  <td>
                    <button class="delete-button">취소</button>
                    <button class="update-button" onclick="allocationInsert();">저장</button>
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
}


// 파일업로드 사용시 이미지 미리보기용
  function readURL(input, img) {
   //console.log("결과"+input.files[0].name)
  if (input.files && input.files[0]) {
    var reader = new FileReader();
    reader.onload = function(e) {
      document.getElementById(img).src = e.target.result;
    };
    reader.readAsDataURL(input.files[0]);
    document.getElementById(img).style.display = '';
    //document.getElementById("col-sm-11").style.display ='block';  
  } else {
  }
}

// 모달창 등록 이벤트
function allocationInsert(){
  const imageFileInput = document.getElementById('I_FILE');             //파일 이미지 전송
  var selectedFile = imageFileInput.files[0];  
  var fileName;
  const inputAmount = document.getElementById('I_AMOUNT').value;        //거래금액
  const inputDiviend = document.getElementById('I_DIVIDEND').value;     //배당금
  const inputTrnscdate = document.querySelector('input[type="date"]');  //거래일자
  var cmr = (CMPR.options[CMPR.selectedIndex].value);    //주식티커
  if(!isEmpty(imageFileInput.files[0])){
    fileName = imageFileInput.files[0].name;
  }
  
  let data = {
              CMPR      : cmr,                   // 주식티커
              TRNSCDATE : inputTrnscdate.value,  //거래일자
              AMOUNT    : inputAmount,           // 거래 금액
              FILENAME  : fileName,              // 파일명
              DIVIDEND  : inputDiviend           // 배당금
  }
  //fetch API를 사용하여 POST 요청을 보냅니다
  //postFetch('/allocation/allocationInsert.do', data, 'insert');
  //console.log("주식 티커, 거래일자, 배당금, 파일명 ", {cmr}, {inputTrnscdate}, {inputDiviend}, {fileName});
  imgFile(selectedFile, data, '/allocation/allocationInsert.do');
}

// 이미지 포함 전송
function imgFile(selectedFile, data, url){
    // 폼 데이터로 보내줘야 함
    let formData = new FormData();
    
var reader = new FileReader();

    reader.onload = function(event) {
              var fileData = new Uint8Array(event.target.result);
              formData.append("files", JSON.stringify(Array.from(fileData)));
              formData.append(
                "key",
                new Blob([JSON.stringify(data)], { type: "application/json" })
              );

                fetch(url,
                    {
                        method : "post",
                        body : formData,
                    })
                    .then((response) => {
                        console.log(response.status);
                        if(response.status != 200){
                          alert("오류 발생했습니다.");
                        }
                        return response.json(); // 응답 데이터를 파싱하고 반환
                    })
                    .then(data => {
                        console.log(">>>>>>>>>>>>>>>>>>>>>>>> "+JSON.stringify(data));
                            if(-1 != data.retNo){
                              alert(data.msg);
                              location.reload();
                            }else{
                              alert(data.msg);
                              location.reload();
                            }
                          })
                    .catch((error) => {
                        alert("error " + error)
                    }); 
                };

    reader.readAsArrayBuffer(selectedFile);    
    
    
}


