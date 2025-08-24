/**
 * select 박스에 옵션을 추가하고, 특정 값을 선택 상태로 만듭니다.
 * @param {HTMLElement} selectBox - 옵션을 추가할 select 박스 요소.
 * @param {Array} options - 옵션 데이터를 담고 있는 배열.
 * @param {string} STOCK_NAME - 기본 선택될 주식 이름.
 */
function fn_selectBox(selectBox, options, STOCK_NAME){
    // 1. 기존 옵션들을 모두 제거 (문제 해결의 핵심)
    selectBox.innerHTML = '';
    
    // 2. 새로운 옵션들 추가
    options.forEach(item => {
        // USEYN 값이 'Y'인 경우에만 옵션 추가
        if (item.USEYN === "Y") {
            const option = document.createElement('option');
            option.value = item.TIKER;
            option.textContent = item.STCNM;
            
            // 기본 선택 조건 확인 및 설정
            if (item.STCNM === STOCK_NAME) {
                option.selected = true;
            }
            
            selectBox.appendChild(option);
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
 * 공통 콜백 함수
 * @param data : 리턴값
 **/
function fn_call(data) {
    if (data.id === "stckInfoInq") {
        fn_insertModal(data);
    } else if (data.id === "allocationDetail001") {
        // 수정 팝업
        const selectBox = document.getElementById('u_stockName');
        const options = data.selectBox;
        fn_selectBox(selectBox, options, data.STOCK_NAME);

        document.getElementById("u_trnscdate").value = data.TRNSCDATE;
        document.getElementById("u_dividend").value = data.DIVIDEND;
        document.getElementById("u_amont").value = data.AMOUNT;
        document.getElementById("tNo").value = data.NO;
        document.getElementById("t_stockName").innerText = "상세 보기 : " + data.STOCK_NAME_N;

        const parsedData = JSON.parse(JSON.stringify(data));
        let fileName = "";

        if (!isEmpty(parsedData.fileList)) {
            const file = Array.isArray(parsedData.fileList) ? parsedData.fileList[0] : parsedData.fileList;

            if (file.fname) {
                fileName = file.fname;
                document.getElementById("I_FILENAME_TEXT").innerText = fileName;
            }

            if (file.reContents) {
                fu_img(file.reContents); // 이미지 출력
                document.getElementById("I_IMG").style.display = "block";
            }
        } else {
            document.getElementById("I_FILENAME_TEXT").innerText = "선택된 파일 없음";
            document.getElementById("I_IMG").style.display = "none";
        }

        document.getElementById("popup_layer").style.display = "block";
        document.getElementById('btn_insert').style.display = 'none';
        document.getElementById('btn_update').style.display = 'inline-block';
    } else if (data.id === "allocationDetailInput") {
        // 등록 팝업
        const selectBox = document.getElementById('u_stockName');
        const options = data;
        fn_selectBox(selectBox, options, data.STOCK_NAME);

        // 인덱스 1 고정 선택
        if (selectBox.options.length > 1) {
            selectBox.selectedIndex = 0;
        }

        // 입력값 초기화
        document.getElementById("u_trnscdate").value = null;
        document.getElementById("u_dividend").value = null;
        document.getElementById("u_amont").value = null;
        document.getElementById("t_stockName").innerText = "신규 등록";

        // 파일/이미지 초기화
        document.getElementById("I_FILENAME_TEXT").innerText = "선택된 파일 없음";
        document.getElementById("I_FILE").value = null;
        document.getElementById("I_IMG").src = "";
        document.getElementById("I_IMG").style.display = "none";

        document.getElementById("popup_layer").style.display = "block";
        document.getElementById('btn_insert').style.display = 'inline-block';
        document.getElementById('btn_update').style.display = 'none';
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

/**
 * 파일 선택 시 이미지 미리보기 및 파일명 표시
 * @param input
 * @param imgId
 */
function readURL(input, imgId) {
    const file = input.files[0];
    const fileNameText = document.getElementById("I_FILENAME_TEXT");
    const img = document.getElementById(imgId);

    if (file) {
        fileNameText.innerText = file.name;

        const reader = new FileReader();
        reader.onload = function (e) {
            img.src = e.target.result;
            img.style.display = "block";
        };
        reader.readAsDataURL(file);
    } else {
        fileNameText.innerText = "선택된 파일 없음";
        img.src = "";
        img.style.display = "none";
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
function fn_openPop(data, month){
    if(!isEmpty(data)){
        const stockName = data.STOCK_NAME;
        const trnscdate = data.TRNSCDATE;
        // 행 데이터를 저장할 JSON 객체 생성
        var rowData = {};
        rowData["stockName"]  = stockName;
        rowData["trnscdate"]  = trnscdate + month + "01";
        rowData["tiker"]  = data.TIKER;
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
    // 이미지 포함 전송
    imgFile(selectedFile, data, '/allocation/allocationInsert.do');
  } else {
    //  데이터만 전송
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


// 모달창 수정 이벤트
function allocationUpdate01() {
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
    // 이미지 포함 전송
    imgFile(selectedFile, data, '/allocation/allocationUpdate.do');
  } else {
    //  데이터만 전송
    fetch('/allocation/allocationUpdate.do', {
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


