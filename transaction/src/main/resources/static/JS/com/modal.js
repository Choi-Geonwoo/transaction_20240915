window.onload = function(){
    
// 모달 요소와 버튼, 닫기 버튼을 가져옴
const modal = document.getElementById('myModal');
const openModalBtn = document.getElementById('openModalBtn');
const closeBtn = document.querySelector('.close');
const modalBody = document.getElementById('modalBody');

// 모달 열기 시 외부 HTML 로드
openModalBtn.onclick = async function() {
  modal.style.display = 'block';

  try {
    const response = await fetch('/MODAL/modal-content.html'); // 외부 HTML 파일을 불러옴
    if (response.ok) {
      const data = await response.text(); // 텍스트 형식으로 불러오기
      modalBody.innerHTML = data; // 모달 본문에 외부 HTML 삽입
    } else {
      modalBody.innerHTML = '<p>콘텐츠를 불러오는 데 실패했습니다.</p>';
    }
  } catch (error) {
    console.error('Error loading modal content:', error);
    modalBody.innerHTML = '<p>오류가 발생했습니다.</p>';
  }
}

// 모달 닫기
closeBtn.onclick = function() {
  modal.style.display = 'none';
}

// 모달 외부 클릭 시 닫기
window.onclick = function(event) {
  if (event.target === modal) {
    modal.style.display = 'none';
  }
}

}