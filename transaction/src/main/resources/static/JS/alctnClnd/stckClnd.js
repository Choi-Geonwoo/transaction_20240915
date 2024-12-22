const today = new Date();
let currentMonth = today.getMonth();
let currentYear = today.getFullYear();

var firstDayOfMonth; 
var daysInMonth    ; 
var startDayOfWeek ; 
var calendars = "";


document.addEventListener("DOMContentLoaded", function () {
     calendars = [
    {
        datesElement: document.getElementById("calendarDates"),
        monthElement: document.getElementById("currentMonth")
    },
    {
        datesElement01: document.getElementById("calendarDates01"),
        monthElement01: document.getElementById("currentMonth01")
    },
];
    
    daysInMonth     = new Date(currentYear, currentMonth + 1, 0).getDate();   
    //renderCalendar();
    // 행 데이터를 저장할 JSON 객체 생성
    var rowData = { startDate: currentYear+"-"+Number(currentMonth+1)+"-01"
                   ,endDate  : currentYear+"-"+Number(currentMonth+1)+"-"+daysInMonth};
    
    // rowData를 URL 파라미터로 변환
    const queryParams = new URLSearchParams(rowData).toString();
    getFetch(`/alctnClnd/stckClndSelect?${queryParams}`,  "stckClndSelect");
});

/**
 * 콜백함수
 * @param data     : 리턴값
 **/
function fn_call(data) {
    if ("stckClndSelect" == data.id) {
        //calendarFun(data)
        console.log(data);
        renderCalendar(data);
    }

}


function renderCalendar(val) {
    
    firstDayOfMonth = new Date(currentYear, currentMonth, 1);                     
    daysInMonth     = new Date(currentYear, currentMonth + 1, 0).getDate();       
    startDayOfWeek  = firstDayOfMonth.getDay();   
    
    
    calendars.forEach((calendar) => {
        console.log("1.  . .. . .   currentYear " +  currentYear + " currentMonth " + currentMonth +"  daysInMonth  " + daysInMonth);
        if(calendar.monthElement != null){
        
            calendar.monthElement.textContent = `${currentYear}년`;
            calendar.datesElement.innerHTML = "";
                
            for (let day = 1; day <= 12; day++) {
                const dateCell = document.createElement("div");
                    dateCell.classList.add("date");
                    dateCell.textContent = day;
                    calendar.datesElement.appendChild(dateCell);
            }
        }else if(calendar.datesElement01 != null){
        
            calendar.monthElement01.textContent = `${currentYear}년 ${String(currentMonth + 1).padStart(2, "0")}월`;
            calendar.datesElement01.innerHTML = "";
            
            for (let i = 0; i < startDayOfWeek; i++) {
                    const emptyCell = document.createElement("div");
                    emptyCell.classList.add("empty");
                    calendar.datesElement01.appendChild(emptyCell);
            }
                
            for (let day = 1; day <= daysInMonth; day++) {
                const dateCell = document.createElement("div");
                const pCell = document.createElement("p");
                dateCell.classList.add("date");
                dateCell.textContent = day;
                pCell.textContent = val;
                calendar.datesElement01.appendChild(dateCell);
            }
        
        }
    });
    
}



    function fn_prevBtn(val){
        currentMonth--;
        if(currentMonth < 0){
            currentMonth = 11;
            currentYear --;
        }
        console.log("currentMonth " + currentMonth + " currentYear " +  currentYear);
        renderCalendar();
    }
    
    function fn_nextBtn(val){
        currentMonth++;
        if(currentMonth > 11){
            currentMonth = 0;
            currentYear ++;
        }
        console.log("currentMonth " + currentMonth + " currentYear " +  currentYear);
        renderCalendar();
    }
