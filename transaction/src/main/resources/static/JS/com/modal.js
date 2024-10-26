const removeModal = () => {
  const modal = document.querySelector('.modal-background');
  if (modal) {
    document.body.removeChild(modal);
  }
};

const handleButtonClick = (event, callback) => {
  const { target } = event;
  if (target.classList.contains('close-btn')) {
    removeModal();
  } else if (target.classList.contains('confirm-btn')) {
    // Call the provided callback function when the confirm button is clicked
    if (callback) {
      callback(); // Call fn_call or any other function passed as a callback
    }
    removeModal(); // Close the modal after confirming
  }
};

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