function toDay(format){
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, '0');
  const day = String(today.getDate()).padStart(2, '0');
  var formattedDate = `${year}-${month}-${day}`;
    switch(format) {
      case "YYYY":  // if (x === "value2")
        formattedDate = `${year}`;
        break;
      case "YYYY-MM":  // if (x === "value2")
        formattedDate = `${year}-${month}`;
        break;
      case "YYYY-MM-DD":  // if (x === "value2")
        formattedDate = `${year}-${month}-${day}`;
        break;
    }  
  return formattedDate;
}

// 날짜 변환
function dateFormat(date) {
        let dateFormat2 = date.getFullYear() +
    '-' + ( (date.getMonth()+1) < 9 ? "0" + (date.getMonth()+1) : (date.getMonth()+1) )+
    '-' + ( (date.getDate()) < 9 ? "0" + (date.getDate()) : (date.getDate()) );
  return dateFormat2;
}

