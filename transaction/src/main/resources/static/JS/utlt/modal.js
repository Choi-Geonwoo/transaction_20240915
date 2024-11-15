
//////////////////////////////////////////////
//배당 거래 내역등록
function chartColorr(){
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
    return chartColor;
}

const showModal = (data, callback) => {
  const modal = document.createElement('div');
  modal.classList.add('modal-background');
  modal.innerHTML = `
    <div class="modal-content">
      <h2 class="modal-title">알림</h2>
      <p class="modal-text"> ${data}</p>
      <div class="modal-buttons">
        <button class="close-btn">닫기</button>
        <button class="confirm-btn">확인</button>
      </div>
    </div>
  `;
  document.body.appendChild(modal);
  
  // Pass the callback to the handleButtonClick function
  modal.addEventListener('click', (event) => handleButtonClick(event, callback));
  
};
// 모달 제거 함수
const removeModal = () => {
  const modal = document.querySelector('.modal-background');
  if (modal) {
    document.body.removeChild(modal);
  }
};

// 버튼 클릭 처리 함수
const handleButtonClick = (event, callback) => {
  const { target } = event;

  // 모달 내부 버튼 클릭이 아닌 경우 무시
  if (!target.classList.contains('close-btn') && !target.classList.contains('confirm-btn')) {
    return;
  }

  // 닫기 버튼 클릭 처리
  if (target.classList.contains('close-btn')) {
    removeModal();
  }

  // 확인 버튼 클릭 처리
  if (target.classList.contains('confirm-btn')) {
    if (typeof callback === 'function') {
      callback(); // 콜백 함수 실행
    }
    removeModal(); // 모달 닫기
  }
};

// 새로운 모달 생성 함수
const newShowModal = (msg) => {
  // 모달 생성
  const modal = document.createElement('div');
  modal.classList.add('modal-background');
  modal.innerHTML = `
    <div class="modal-content">
      <h2 class="modal-title">알림</h2>
      <p class="modal-text">${msg}</p>
      <div class="modal-buttons">
        <button class="close-btn">닫기</button>
        <button class="confirm-btn">확인</button>
      </div>
    </div>
  `;

  // 모달을 DOM에 추가
  document.body.appendChild(modal);

  // 클릭 이벤트 핸들러 추가
  modal.addEventListener('click', (event) => handleButtonClick(event));
};

