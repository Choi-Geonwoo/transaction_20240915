/**
 * POST 방식으로 비동기 전송
 * @param url       : 호출 URL
 * @param method    : GET/POST
 * @param body      : 전송데이터
 * @param id        : 콜백용 ID
 **/
function fetch003(url, method, body, id) {
    fetch(url, {
        method: method,
        headers: {
            'Content-Type': 'application/json',
            'Cache-Control': 'no-cache', // 캐싱 방지
            'Pragma': 'no-cache'         // HTTP 1.0 호환
        },
        body: JSON.stringify(body),
        cache: 'no-store' // 브라우저 캐시 방지
    })
    .then(response => {
        //console.log(response.status);
        //console.log(response.ok);
        if (!response.ok) {
            throw new Error(`Network response was not ok: ${response.status}`);
        }

        return response.json();
    })
    .then(result => {
        result.id = id;
        if(!isEmpty(result.msg)){
             showModal(result.msg, () => fn_call(result));
        }else{
            fn_call(result);
        }
    })
    .catch(error => {
        console.log('Error:', error);
        alert('Failed to update row: ' + error.message);
    });
}

/**
 * get 방식으로 비동기 전송
 * @param url       : 호출 URL
 * @param method    : GET
 * @param body      : 전송데이터
 * @param id        : 콜백용 ID
 **/
function getFetch(url, id) {
    fetch(url)
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => {
        data.id = id;
        //console.log(data); // Spring Boot에서 온 JSON 데이터를 출력
        fn_call(data);
    })
    .catch(error => {
        console.error('There was a problem with the fetch operation:', error);
    });
}

/**
 * GET 방식으로 비동기 전송 Excel 다운로드
 * @param url   : 호출 URL
 * @param id    : 콜백용 ID
 **/
function getExcelFetch(url, fileName, id) {
    fetch(url, { method: 'GET' })
        .then(response => {
            if (!response.ok) {
                throw new Error(`Network error: ${response.statusText}`);
            }
            return response.blob(); // Excel 다운로드 시 Blob 데이터로 처리
        })
        .then(blob => {
            // Blob 데이터를 사용해 파일 다운로드
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = fileName; // 다운로드 파일 이름
            a.click();
            window.URL.revokeObjectURL(url);
            fn_call(id);
        })
        .catch(error => {
            console.error('Fetch 에러:', error);
        });
}


/**
 * POST 방식으로 비동기 전송
 * @param url       : 호출 URL
 * @param body      : 전송 데이터
 * @param id        : 콜백용 ID (옵션)
 **/
function postFetch(url, body, id) {
    fetch(url, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
            'Cache-Control': 'no-cache', // 캐싱 방지
            'Pragma': 'no-cache'         // HTTP 1.0 호환
        },
        body: JSON.stringify(body),
        cache: 'no-store' // 브라우저 캐시 방지
    })
    .then(response => {
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json(); // JSON 데이터 파싱
    })
    .then(data => {
        console.log();
        fn_call(data, id);
    })
    .catch(error => {
        console.error("요청 중 오류 발생:", error);
        alert(`오류 발생: ${error.message}`);
    });
}

/**
 * 문자열이 빈 문자열인지 체크하여 결과값을 리턴한다. 
 * @param str       : 체크할 문자열
 **/
function isEmpty(str){
  if(typeof str == "undefined" || str == null || str == "" || str == "null")
    return true;
  else
    return false ;
}

/* 차트 컬러 */
function fn_chartColor(index){
    const chartColor = [
         "rgba(18, 203, 87, 0.6)"
        ,"rgba(255, 97, 63, 0.2)"
        ,"rgba(74, 128, 255, 0.8)"
        ,"rgba(150, 50, 200, 0.4)"
        ,"rgba(10, 180, 130, 0.7)"
        ,"rgba(88, 40, 120, 0.5)"
        ,"rgba(200, 80, 40, 0.3)"
        ,"rgba(33, 150, 210, 0.9)"
        ,"rgba(255, 175, 0, 0.1)"
        ,"rgba(120, 60, 255, 0.6)"
        ,"rgba(48, 205, 112, 0.4)"
        ,"rgba(180, 20, 65, 0.8)"
        ,"rgba(100, 160, 240, 0.7)"
        ,"rgba(220, 90, 30, 0.5)"
        ,"rgba(5, 190, 175, 0.3)"
        ,"rgba(75, 130, 220, 0.9)"
        ,"rgba(255, 150, 20, 0.1)"
        ,"rgba(130, 80, 190, 0.6)"
        ,"rgba(55, 215, 100, 0.4)"
        ,"rgba(190, 10, 90, 0.8)"
        ,"rgba(80, 140, 250, 0.7)"
        ,"rgba(240, 100, 50, 0.5)"
        ,"rgba(15, 180, 160, 0.3)"
        ,"rgba(85, 125, 230, 0.9)"
        ,"rgba(255, 135, 10, 0.1)"
        ,"rgba(140, 70, 180, 0.6)"
        ,"rgba(35, 220, 125, 0.4)"
        ,"rgba(200, 30, 60, 0.8)"
        ,"rgba(120, 170, 230, 0.7)"
        ,"rgba(230, 110, 20, 0.5)"
        ,"rgba(25, 200, 145, 0.3)"
        ,"rgba(95, 120, 240, 0.9)"
        ,"rgba(255, 120, 0, 0.1)"
        ,"rgba(160, 90, 170, 0.6)"
        ,"rgba(45, 225, 80, 0.4)"
        ,"rgba(210, 40, 50, 0.8)"
        ,"rgba(110, 150, 220, 0.7)"
        ,"rgba(250, 120, 40, 0.5)"
        ,"rgba(35, 210, 150, 0.3)"
        ,"rgba(65, 110, 235, 0.9)"  
];
return chartColor[index];
}


// 랜덤 색상 생성 함수
function getRandomColor(opacity) {
    return `rgba(${Math.floor(Math.random() * 255)}, 
                  ${Math.floor(Math.random() * 255)}, 
                  ${Math.floor(Math.random() * 255)}, ${opacity})`;
}


function fn_exportExcel(fileName, table_id) {
  const wb = XLSX.utils.book_new();
  console.log("ret : " + table_id);
  const newWorksheet = excelHandler.getWorksheet(table_id);
  XLSX.utils.book_append_sheet(wb, newWorksheet, excelHandler.getSheetName());

  const wbout = XLSX.write(wb, { bookType: 'xlsx', type: 'binary' });
  saveAs(new Blob([s2ab(wbout)], { type: 'application/octet-stream' }), excelHandler.getExcelFileName(fileName));
}

function s2ab(s) {
  const buf = new ArrayBuffer(s.length); // s를 arrayBuffer로 변환
  const view = new Uint8Array(buf); // uint8array 생성
  for (let i = 0; i < s.length; i++) view[i] = s.charCodeAt(i) & 0xFF; // 옥텟으로 변환
  return buf;
}


/**
     * 엑셀 다운로드 
     * @param str       : 체크할 문자열
 **/
const excelHandler = {
  getExcelFileName: function (fileName) {
    return fileName + toDay() + '.xlsx'; // 파일명
  },
  getSheetName: function () {
    return '주식 거래 내역'; // 시트명
  },
  getExcelData: function (table_id) {
    const table = document.getElementById(table_id);
    const rows = table.querySelectorAll('tbody tr');
    const headerRow = table.querySelectorAll('thead th');
    // if 조건 추가: 헤더 텍스트가 빈 문자열이 아닐 경우만 데이터를 추가
    const data = [
        Array.from(headerRow)
            .filter(th => th.textContent.trim() !== '구분') // 조건 추가
            .map(th => th.textContent.trim())
    ];

    rows.forEach(row => {
      const rowData = [];
      const cells = row.querySelectorAll('td input');

      cells.forEach(cell => {
        rowData.push(cell.value);
      });

      data.push(rowData);
    });

    console.log("1. >>>>> " + JSON.stringify(data));
    return data;
  },
  getWorksheet: function (table_id) {
    console.log("ret : " + table_id);
    return XLSX.utils.aoa_to_sheet(this.getExcelData(table_id));
  }
};

//팝업 닫기
function fn_closePop() {
    document.getElementById("popup_layer").style.display = "none";
}

// 테이블 정렬
    function sortTable(th, columnIndex) {
      const table = th.closest("table");
      const tbody = table.querySelector("tbody");
      const rows = Array.from(tbody.querySelectorAll("tr"));
      const ths = table.querySelectorAll("th");

      const currentDirection = th.getAttribute("data-sort");
      const isAsc = currentDirection !== "asc";

      rows.sort((a, b) => {
        const valA = getCellValue(a, columnIndex);
        const valB = getCellValue(b, columnIndex);
        return valA.localeCompare(valB, undefined, { numeric: true, sensitivity: 'base' }) * (isAsc ? 1 : -1);
      });

      rows.forEach(row => tbody.appendChild(row));

      ths.forEach(header => {
        const baseText = header.textContent.replace(/[\u25B2\u25BC]/g, '').trim();
        header.textContent = baseText;
        header.setAttribute("data-sort", "");
      });

      const icon = isAsc ? "▲" : "▼";
      th.textContent = th.textContent.trim();
      th.innerHTML = `${th.textContent} <span class="sort-indicator">${icon}</span>`;
      th.setAttribute("data-sort", isAsc ? "asc" : "desc");
    }

    function getCellValue(row, index) {
      const td = row.children[index];
      const input = td.querySelector("input");
      console.log("input   " + JSON.stringify(input));
      return input ? input.value.trim() : td.textContent.trim();
    }