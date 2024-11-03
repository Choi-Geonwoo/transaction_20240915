
/**
 * POST 방식으로 비동기 전송
 * @param url       : 호출 URL
 * @param method    : GET/POST
 * @param body      : 전송데이터
 **/
function fetch002(url, method, body) {
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
        //console.log('Success:', JSON.stringify(result));
        //alert(result.msg);
        //showModal(result.msg);
        //showModal('Here is some important information.');
        //fn_call(result);
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
 * 문자열이 빈 문자열인지 체크하여 결과값을 리턴한다. 
 * @param str       : 체크할 문자열
 **/
function isEmpty(str){
  if(typeof str == "undefined" || str == null || str == "")
    return true;
  else
    return false ;
}

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