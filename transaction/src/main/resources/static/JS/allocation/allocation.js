// 위의 옵션 추가 코드
function fn_selectBox(selectBox, options, STOCK_NAME){
    options.forEach(item => {
        if (item.USEYN === "Y") { // USEYN 값이 'Y'인 경우에만 추가
            const option = document.createElement('option');
            option.value = item.TIKER; // 값 설정
            option.textContent = item.STCNM; // 텍스트 설정
            
            // 옵션을 select 박스에 추가
            selectBox.appendChild(option);
            
            // 기본 선택 조건 확인
            if (item.STCNM === STOCK_NAME) {
                option.selected = true; // 조건에 맞는 경우 selected 추가
            }
        }
    });
}
    
/*************************************
 * 조회용 함수
 *************************************/
/**
 * 전송 함수
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
    if("stckInfoInq" == data.id){
        fn_insertModal(data);
    }else if("allocationDetail001" == data.id){
        //console.log("Row Data: ", JSON.stringify(data));
        // select 박스 참조 (동적으로 생성했거나 이미 존재하는 경우)
        const selectBox = document.getElementById('u_stockName');
        const options = data.selectBox; 
        fn_selectBox(selectBox, options, data.STOCK_NAME);
        //document.getElementById("u_stockName").value = data.STOCK_NAME;
        document.getElementById("u_trnscdate").value   = data.TRNSCDATE;
        document.getElementById("u_dividend").value    = data.DIVIDEND;
        document.getElementById("u_amont").value       = data.AMOUNT;
        document.getElementById("t_stockName").innerText = "상세 보기 : "+data.STOCK_NAME; // 종목명
        
        var jsonData = JSON.stringify(data);
        //# JSON 데이터 파싱
        var parsedData = JSON.parse(jsonData);
        var fileName = "";
        if(!isEmpty(parsedData.fileList)){
            fileName = parsedData.fileList.fname;
        }
        
        if(!isEmpty(parsedData.fileList)){
            // 이미지 출력
            fu_img(parsedData.fileList.reContents);
        }
        
        document.getElementById("I_FILE").innerText = fileName;
        
        document.getElementById("popup_layer").style.display = "block";
    }else if("allocationDetailInput" == data.id){
        //console.log("Row Data: ", JSON.stringify(data));
        // select 박스 참조 (동적으로 생성했거나 이미 존재하는 경우)
        const selectBox = document.getElementById('u_stockName');
        const options = data; 
        fn_selectBox(selectBox, options, data.STOCK_NAME);
        //document.getElementById("u_stockName").value = data.STOCK_NAME;
        document.getElementById("u_trnscdate").value   = null;
        document.getElementById("u_dividend").value    = null;
        document.getElementById("u_amont").value       = null;
        document.getElementById("t_stockName").innerText = "신규 등록"; // 종목명
        document.getElementById("I_FILE").innerText = null;
        document.getElementById("I_IMG").value = null;
        
        document.getElementById("popup_layer").style.display = "block";
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
        var imageElement1 = document.getElementById("I_IMG");
        // 이미지
        let image1 = document.getElementById('I_IMG');
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
// 파일업로드 사용시 이미지 미리보기용
function readURL(input, img) {
  if (input.files && input.files.length > 0) {
    var file = input.files[0];
    
    // 파일 확장자 체크 (예: 이미지 파일만 허용)
    var validImageTypes = ["image/jpeg", "image/png", "image/gif"];
    if (!validImageTypes.includes(file.type)) {
      alert("이미지 파일만 업로드 가능합니다.");
      input.value = "";  // 잘못된 파일 리셋
      return;
    }

    var reader = new FileReader();

    reader.onload = function (e) {
      var imgElement = document.getElementById(img);
      if (imgElement) {
        imgElement.src = e.target.result;
      } else {
        console.error("이미지 요소를 찾을 수 없습니다: " + img);
      }
    };

    reader.onerror = function () {
      console.error("파일을 읽는 도중 오류가 발생했습니다.");
    };

    reader.readAsDataURL(file);
  } else {
    console.warn("파일이 선택되지 않았거나 잘못된 입력입니다.");
  }
}


function imgFile(selectedFile, data, url) {
  if (!selectedFile) {
    alert("파일을 선택해주세요.");
    return; // 파일이 선택되지 않으면 함수 종료
  }

  const formData = new FormData();
  const reader = new FileReader();

  reader.onload = function(event) {
    const fileData = new Uint8Array(event.target.result);
    formData.append("files", JSON.stringify(Array.from(fileData)));
    formData.append("key", new Blob([JSON.stringify(data)], { type: "application/json" }));

    fetch(url, {
      method: "POST",
      body: formData,
    })
      .then(response => {
        console.log(response.status);
        if (response.status !== 200) {
          throw new Error("오류 발생했습니다.");
        }
        return response.json();
      })
      .then(data => {
        console.log("Response Data: ", JSON.stringify(data));
        if (data.retNo !== -1) {
          alert(data.msg);
          location.reload();
        } else {
          alert(data.msg);
          location.reload();
        }
      })
      .catch(error => {
        alert("Error: " + error.message);
      });
  };

  // selectedFile이 Blob 타입일 때만 readAsArrayBuffer를 호출
  if (selectedFile instanceof Blob) {
    reader.readAsArrayBuffer(selectedFile);
  } else {
    alert("유효한 파일을 선택해주세요.");
  }
}

/*************************************
 * 팝업 띄우기
 *************************************/
function fn_openPop(stockName,trnscdate, month){
    if(!isEmpty(stockName)){
        // 행 데이터를 저장할 JSON 객체 생성
        var rowData = {};
        rowData["stockName"]  = stockName;
        rowData["trnscdate"]  = trnscdate + month + "01";
        //fetch API를 사용하여 POST 요청을 보냅니다
        fetch003('/allocation/allocationDetail.do', "post", rowData, "allocationDetail001"); //url, method, body   
    }else{
        getFetch('/com/stckInfoInq.do', "allocationDetailInput"); //url, method, body
    }
}


// 모달창 등록 이벤트
function allocationInsert01() {
  const imageFileInput = document.getElementById('I_FILE'); // 파일 업로드 인풋
  const inputAmount = document.getElementById('u_amont').value; // 거래금액
  const inputDiviend = document.getElementById('u_dividend').value; // 배당금
  const inputTrnscdate = document.getElementById('u_trnscdate').value; // 거래일자
  const cmrElement = document.getElementById('u_stockName'); // 주식명 select 요소

  if (!cmrElement) {
    alert("주식명을 선택하세요.");
    return;
  }
  if(!inputTrnscdate){
    alert("거래일자 입력 해주세요.");
    return;
  }

  var cmr = cmrElement.value; // 주식티커 값 가져오기
  var fileName = '';

  // 파일 선택 여부 확인 및 파일명 할당
  if (imageFileInput.files.length > 0) {
    fileName = imageFileInput.files[0].name;
  }

  let data = {
    CMPR: cmr,            // 주식 티커
    TRNSCDATE: inputTrnscdate,  // 거래일자
    AMOUNT: inputAmount,  // 거래 금액
    FILENAME: fileName,   // 파일명
    DIVIDEND: inputDiviend // 배당금
  };

  console.log("주식 티커, 거래일자, 배당금, 파일명 ", cmr, inputTrnscdate, inputDiviend, fileName, imageFileInput.files.length);

  if (imageFileInput.files.length > 0) {
    const selectedFile = imageFileInput.files[0];
    imgFile(selectedFile, data, '/allocation/allocationInsert.do');
  } else {
    fetch('/allocation/allocationInsert.do', {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    })
    .then(response => response.json())
    .then(result => {
      alert(result.msg);
      if (result.retNo !== -1) location.reload();
    })
    .catch(error => {
      alert("오류 발생: " + error.message);
    });
  }
}


/* 라팩토링 */
// 이미지 포함 전송
function imgFile(selectedFile, data, url) {
  const formData = new FormData();
  const reader = new FileReader();

  reader.onload = function(event) {
    const fileData = new Uint8Array(event.target.result);
    formData.append("files", JSON.stringify(Array.from(fileData)));
    formData.append("key", new Blob([JSON.stringify(data)], { type: "application/json" }));

    fetch(url, {
      method: "POST",
      body: formData,
    })
      .then(response => {
        console.log(response.status);
        if (response.status !== 200) {
          throw new Error("오류 발생했습니다.");
        }
        return response.json();
      })
      .then(data => {
        console.log("Response Data: ", JSON.stringify(data));
        if (data.retNo !== -1) {
          alert(data.msg);
          location.reload();
        } else {
          alert(data.msg);
          location.reload();
        }
      })
      .catch(error => {
        alert("Error: " + error.message);
      });
  };

  reader.readAsArrayBuffer(selectedFile);
}

