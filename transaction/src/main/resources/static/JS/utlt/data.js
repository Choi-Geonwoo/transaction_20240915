function toDay(format){
    var retDay = "";
    // 작성일 : 2022년 5월 19일 목요일 19시 4분 10초 1밀리초
    let date = new Date();
    //연도 : 2022
    //date.getFullYear();
    //월 : 4
    //date.getMonth();
    //일 : 19
    //date.getDate();
    switch(format) {
      case "YYYY":  // if (x === "value1")
        //연도 : 2022
        retDay = date.getFullYear();
        break
      case "MM":  // if (x === "value2")
        //월 : 4
        retDay =date.getMonth()+1;
        break
      case "DD":  // if (x === "value2")
        //일 : 19
        retDay =date.getDate();
        break
      case "YYYYMM":  // if (x === "value2")
        retDay =date.getFullYear()+(date.getMonth()+1);
        break
      case "YYYYMMDD":  // if (x === "value2")
        retDay =date.getFullYear()+(date.getMonth()+1)+date.getMonth();
        break
      case "YYYY-MM":  // if (x === "value2")
        retDay =date.getFullYear()+"-"+(date.getMonth()+1);
        break
      case "YYYY-MM-DD":  // if (x === "value2")
        retDay =date.getFullYear()+"-"+(date.getMonth()+1)+"-"+date.getMonth();
        break
//      default:
//        break
    }
    return retDay;
}


// 날짜 변환
function dateFormat(date) {
        let dateFormat2 = date.getFullYear() +
    '-' + ( (date.getMonth()+1) < 9 ? "0" + (date.getMonth()+1) : (date.getMonth()+1) )+
    '-' + ( (date.getDate()) < 9 ? "0" + (date.getDate()) : (date.getDate()) );
  return dateFormat2;
}