
/**
 * 주식정보 데이터 등록
 * @param formId     : 전성 FORM
 **/
function register(formId) {
  // 폼 요소를 ID로 가져옵니다
  const form = document.getElementById(formId);
  
    // 폼 데이터를 FormData 객체로 생성합니다
  const formData = new FormData(form);
  
  // FormData를 JSON으로 변환합니다
  const data = {};
  formData.forEach((value, key) => {
      data[key] = value;
  });
 //alert(JSON.stringify(data));
 //fetch API를 사용하여 POST 요청을 보냅니다
 fetch002('/stckInfo/stckInfoInsert.do', "post", data); //url, method, body
}


/**
 * 주식정보 데이터 수정
 * @param tb_id     : 테이블 ID
 * @param button    : 테이블정보(this)
 **/
 function rowUpdateClicked(tb_id, button) {
      // Get the row of the clicked button
      var row = button.parentElement.parentElement;
      var headerSelector = tb_id+' thead th';
      //alert(headerSelector);
      // Get the table headers to use as keys
      var headers = document.querySelectorAll(headerSelector);

      // Create a JSON object to store row data
      var rowData = {};

      // Loop through each cell in the row, skipping the last column (button)
      for (var i = 0; i < row.cells.length - 1; i++) {
        var input = row.cells[i].querySelector('input');
        var headerName = headers[i].getAttribute('name'); // Get the 'name' attribute from <th>
        console.log(i +" : " + input);
        // Check if input is a checkbox and store value accordingly
        if(!isEmpty(input)){
           if (input.type === 'checkbox') {
             rowData[headerName] = input.checked ? 'Y' : 'N';
           } else {
             rowData[headerName] = input.value;
           }
        }
      }
      //alert(JSON.stringify(rowData));
      // Convert the row data to JSON and display it
      // document.querySelector('p').innerText = JSON.stringify(rowData, null, 2);
      //fetch API를 사용하여 POST 요청을 보냅니다
      fetch002('/stckInfo/stckInfoUpdate.do', "post", rowData); //url, method, body
    }
    