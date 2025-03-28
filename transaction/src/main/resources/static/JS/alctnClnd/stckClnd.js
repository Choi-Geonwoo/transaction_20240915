document.addEventListener("DOMContentLoaded", function () {
    initCalendars();
});

let currentYear = new Date().getFullYear();
let currentMonth = new Date().getMonth(); // 0 = January, 11 = December

function initCalendars() {
    renderYearCalendar();
    renderMonthCalendar();
}

// Year calendar rendering (3x4 grid)
function renderYearCalendar() {
    document.getElementById("currentYear").textContent = `${currentYear}년`;
    const yearCalendar = document.getElementById("yearCalendar");
    yearCalendar.innerHTML = "";

    for (let month = 1; month <= 12; month++) {
        const monthDiv = document.createElement("div");
        monthDiv.classList.add("month");
        monthDiv.textContent = `${month}월`;
        monthDiv.onclick = () => { 
            currentMonth = month - 1; 
            renderMonthCalendar(); 
        };
        yearCalendar.appendChild(monthDiv);
    }
}

// Month calendar rendering (weekday in horizontal)
function renderMonthCalendar() {
    document.getElementById("currentMonth").textContent = `${currentYear}년 ${currentMonth + 1}월`;
    const monthCalendar = document.getElementById("monthCalendar");
    monthCalendar.innerHTML = "";

    const firstDay = new Date(currentYear, currentMonth, 1).getDay();
    const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();

    // Adding empty cells (to match the first weekday of the month)
    for (let i = 0; i < firstDay; i++) {
        const emptyCell = document.createElement("div");
        emptyCell.classList.add("empty");
        monthCalendar.appendChild(emptyCell);
    }

    // Adding the dates
    for (let day = 1; day <= daysInMonth; day++) {
        const dayCell = document.createElement("div");
        dayCell.classList.add("date");
        dayCell.textContent = day;

        // Add click event to fetch data when a day is clicked
        dayCell.onclick = () => {
            fetchMonthData(currentYear, currentMonth, day);
        };

        monthCalendar.appendChild(dayCell);
    }
}

// Fetch data for the selected month and day
function fetchMonthData(s_year, s_month, s_day) {
    //const url = `/getMonthData?year=${year}&month=${month + 1}&day=${day}`;
    // 행 데이터를 저장할 JSON 객체 생성
    var rowData = { trnscdate: s_year+"-"+String(s_month+1).padStart(2, "0") +"-"+String(s_day).padStart(2, "0")
                   ,yesr : s_year};
    
    // rowData를 URL 파라미터로 변환
    const queryParams = new URLSearchParams(rowData).toString();
    
    getFetch(`/alctnClnd/stckClndSelect?${queryParams}`, "alctnClndSelect");
}

// Year change button
function changeYear(value) {
    currentYear += value;
    renderYearCalendar();
    renderMonthCalendar();
}

// Month change button
function changeMonth(value) {
    currentMonth += value;
    
    // Adjust year if month goes out of bounds
    if (currentMonth < 0) {
        currentMonth = 11;
        currentYear--;
    } else if (currentMonth > 11) {
        currentMonth = 0;
        currentYear++;
    }
    
    // Update both the year calendar and month calendar
    renderYearCalendar();
    renderMonthCalendar();
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
        console.log(data);
        add_menu(data);
    }

}


function add_menu(json){
    const tbody = document.getElementById("tbody_00");
    var row = "";
   // 테이블의 기존 내용을 모두 지움
        while(tbody.rows.length > 0){
            tbody.deleteRow(0);
        }
    // `stckClndSelect` 데이터 찾기
    const dataset = json.datasets.find(d => d.datasetName === "stckClndSelect");
    
    // `rows` 추출
    const rows = dataset ? dataset.rows : [];

    // HTML 테이블 데이터 생성
    let tableRows = '';
    for (let i = 0; i < rows.length; i++) {
        const currentItem = rows[i];
        tableRows += '<tr>';
        tableRows += '<td>' + currentItem['TRNSCDATE'] + '</td>';
        tableRows += '<td>' + currentItem['STOCK_NAME'] + '</td>';
        tableRows += '<td>' + currentItem['TIKER'] + '</td>';
        tableRows += '<td>' + currentItem['AMOUNT'] + '</td>';
        tableRows += '</tr>'; // 마지막 태그 수정: <tr> → </tr>
    }

    tbody.innerHTML += tableRows;
}