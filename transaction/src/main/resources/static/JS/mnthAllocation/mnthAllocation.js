function mnthAllocationBarChart(data) {
  const dataArray = [];
  var dataValues = [];
  
  for (const item of data) {
      
      var label = `${item.TRNSCDATE}` == "합계" ? "" : `${item.TRNSCDATE}`;
      if(label != ""){
        dataValues = [
            item.JANUARY, 
            item.FEBRUARY, 
            item.MARCH, 
            item.APRIL, 
            item.MAY,
            item.JUNE, 
            item.JULY, 
            item.AUGUST, 
            item.SEPTEMBER, 
            item.OCTOBER, 
            item.NOVEMBER, 
            item.DECEMBER
        ];
      }
      //console.log("1. " + JSON.stringify(dataValues));
      const backgroundColor = fn_chartColor[data.indexOf(item)]; // Assuming chartColorr is defined elsewhere.
      //console.log("2. " + JSON.stringify(backgroundColor));
      if(label != ""){
            dataArray.push({
                label: label,
                data: dataValues,
                backgroundColor: backgroundColor
            });
        }
  }
  //console.log(monthToNumber(monthSelect));
  const months = ["1월", "2월", "3월", "4월", "5월", "6월", "7월", "8월", "9월", "10월", "11월", "12월"] ;

  createBarChart(dataArray, months);
}



function createBarChart(dataArray, months) {
  const chBar = document.getElementById("bar_chart");
  const chartData = {
      labels: months,
      datasets: dataArray
  };

  const myChart = new Chart(chBar, {
      type: 'bar',
      data: chartData,
      options: {
          scales: {
              y: {
                  beginAtZero: true
              }
          },
          plugins: {
              legend: {
                  display: true,
                  position: 'top'
              },
              tooltip: {
                  mode: 'index',
                  intersect: false
              }
          }
      }
  });
}

/**
 * 상세 조회
 * @param trnscdate     : 년도
 * @param month         : 월
 **/    
function mnthDetail(trnscdate, month){
    //TRNSCDATE
    // 행 데이터를 저장할 JSON 객체 생성
    var rowData = {};
    rowData["trnscdate"]  = trnscdate + month + "";
    console.log("Row Data: ", JSON.stringify(rowData));
    //fetch API를 사용하여 POST 요청을 보냅니다
    fetch002('/mnthAllocation/allocationDetail.do', "post", rowData); //url, method, body
}


/**
 * 콜백함수
 * @param data     : 리턴값
 **/    
function fn_call(data){
    if (isEmpty(data)) {
        alert("조회 결과가 없습니다.");
        return;
    }
    
    var jsonData = JSON.stringify(data);
    var obj = JSON.parse(jsonData);
    
    // 테이블 행을 담을 변수를 초기화합니다.
    let tableRows = '';
    
    // `for` 루프를 사용하여 테이블 행을 생성합니다.
    for (var i in obj) {
        tableRows += `<tr>`
        tableRows += `<td>${obj[i].TRNSCDATE}</td>`;       //날짜
        if(!isEmpty(obj[i].STOCK_NAME)){
            tableRows += `<td>${obj[i].STOCK_NAME}</td>`;    //주식명
        }else{
            tableRows += `<td></td>`;        //배당금
        }       
        if(!isEmpty(obj[i].DIVIDEND)){
            tableRows += `<td>${obj[i].DIVIDEND}</td>`;        //배당금
        }else{
            tableRows += `<td></td>`;        //배당금
        }
        tableRows += `<td>${obj[i].AMOUNT}</td>`;          //거래금액
        tableRows += `</tr>`
    }
    
    // 모달을 생성하고 HTML 구조를 설정합니다.
    const modal = document.createElement('div');
    modal.classList.add('modal-background');
    modal.innerHTML = `
        <div class="modal-content02">
            <div class="container01"> 
                <div class="div_title01">년도 : ${obj[0].TRNSCDATE} </div>       
                <div class="div_body01">
                    <table>
                        <thead class="text-center">
                            <tr>
                                <th >년도</th>
                                <th >주식명</th>
                                <th >배당금</th>
                                <th >거래금액</th>
                            </tr>
                        </thead>
                        <tbody class="text-center" style="overflow-x:hidden; overflow-y:auto; height: 200px;">
                            ${tableRows}
                            <tr>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td>
                                    <button class="update-button">확인</button>
                                </td>
                            </tr>
                         </tbody>
                    </table>
                </div>
            </div>
        </div>
    `;
    
    // 모달을 문서에 추가합니다.
    document.body.appendChild(modal);
    
    // 모달에 클릭 이벤트를 추가합니다.
    modal.addEventListener('click', handleButtonClick01);

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
