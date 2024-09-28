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
        console.log(response.status);
        console.log(response.ok);

        if (!response.ok) {
            throw new Error(`Network response was not ok: ${response.status}`);
        }

        return response.json();
    })
    .then(result => {
        console.log('Success:', JSON.stringify(result));
        //alert(result.msg);
        fn_call(result);
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