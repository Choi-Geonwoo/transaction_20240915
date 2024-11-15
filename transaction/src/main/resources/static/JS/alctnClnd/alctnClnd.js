document.addEventListener('DOMContentLoaded', function() {
    // 행 데이터를 저장할 JSON 객체 생성
    var rowData = { YMD: toDay("YYYY-MM"), S_DVSN : "전체"};
    
    // rowData를 URL 파라미터로 변환
    const queryParams = new URLSearchParams(rowData).toString();
    getFetch(`/alctnClnd/alctnClndSelect?${queryParams}`, "alctnClndSelect");

})

function fn(){
    var sDvsn = document.getElementById('S_DVSN');
    var sDvnValue = sDvsn.options[sDvsn.selectedIndex].value;
    alert(sDvnValue);
}

/*************************************
 * 콜백 함수
 *************************************/

/**
 * 콜백함수
 * @param data     : 리턴값
 **/
function fn_call(data) {
    if ("alctnClndSelect" == data.id) {
        calendarFun(data)
    }

}

/**
 * 달력 기능을 초기화하고 이벤트를 표시하는 함수
 */
function calendarFun(data) {
    var calendarEl = document.getElementById('calendar');
    var calendar = new FullCalendar.Calendar(calendarEl, {
        initialView: 'dayGridMonth',
        selectable: true,
        selectMirror: true,
        locale: 'ko', // 한국어 설정
        events: data.map(mapDataToEvent),
        eventClick: function(info) {
            alert(`Event: ${info.event.title}\nDescription: ${info.event.extendedProps.description}`);
        },
        editable: true,
        selectable: true,
        datesSet: function(info) {
            // 사용자가 달을 변경할 때마다 호출됩니다.
            var startDate = info.startStr; // 현재 범위의 시작일
            var endDate = info.endStr;     // 현재 범위의 마지막 날
            //var sDvsn = document.getElementById('S_DVSN');
            //var sDvnValue = (sDvsn.option[sDvsn.selectedIndex].value)
            //fetchEvents(startDate, endDate, calendar); // 새로운 데이터를 가져와서 갱신
            // 행 데이터를 저장할 JSON 객체 생성
            var rowData = { startDate: startDate, endDate : endDate};
            
            // rowData를 URL 파라미터로 변환
            const queryParams = new URLSearchParams(rowData).toString();
            fetchEvents(`/alctnClnd/alctnClndSelect?${queryParams}`, calendar);// 새로운 데이터를 가져와서 갱신

        }
    });

    calendar.render();
}

// 데이터 항목을 FullCalendar 이벤트 형식으로 변환하는 함수
function mapDataToEvent(item) {
    return {
        title: item.STOCK_NAME,
        start: item.TRNSCDATE,
        description     : `Amount: ${item.AMOUNT} USD`,
        extendedProps   : { amount: item.AMOUNT },
        backgroundColor : (item.DVSN == "배당내역" ? "#FFEFD5" : "#DCEBFF") , 
        borderColor     : (item.DVSN == "배당내역" ? "#FFEFD5" : "#DCEBFF"),
        textColor       : "#000000"
    };
}

// 서버에서 이벤트 데이터를 가져와 캘린더 업데이트
function fetchEvents(url, calendar) {
    fetch(url, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(response => response.json())
    .then(data => {
        add_menu(data);
        // 기존 이벤트를 제거하고 새로운 이벤트로 업데이트
        calendar.removeAllEvents();
        calendar.addEventSource(data.map(mapDataToEvent));
    })
    .catch(error => {
        console.error('Error fetching events:', error);
        alert('Failed to fetch events from server.');
    });
}


function add_menu(json){
      // 테이블 이름 정의 
      const table = document.getElementById('tbody_00');
      var sum = 0;

      // 테이블의 기존 내용을 모두 지움
      while (table.firstChild) {
          table.removeChild(table.firstChild);
      }

      const parsedData = json;
      for (let i = 0; i < parsedData.length; i++) {
          const currentItem = parsedData[i];
          //console.log(`Item ${i + 1}:`);
          // 새 행(Row) 추가
          const newRow = table.insertRow();
          newRow.insertCell('AMOUNT').innerText = currentItem['AMOUNT'];
          newRow.insertCell('TRNSCDATE').innerText = currentItem['TRNSCDATE'];
          newRow.insertCell('STOCK_NAME').innerText = currentItem['STOCK_NAME'];
          newRow.insertCell('DVSN').innerText = currentItem['DVSN'];
          console.log('---');
      }
      
      //document.querySelector('#sumTotal').innerHTML = sum;
}
