// 顯示或隱藏子選單
function toggleSubmenu(id) {
  const submenu = document.getElementById(id);
  submenu.classList.toggle("open");
}
// 載入指定頁面到主內容區
function loadPage(page) {
  document.getElementById('content').innerHTML =
    '<iframe src="' + page + '" frameborder="0" width="100%" height="100%"></iframe>';
}
// 切換側邊選單的顯示狀態
function toggleSideMenu() {
    const menu = document.querySelector('.sideMenu');
    menu.classList.toggle('active');
  }  

  function toggleSubmenu(id) {
    const submenu = document.getElementById(id);
    if (submenu.style.display === "block") {
      submenu.style.display = "none";
    } else {
      submenu.style.display = "block";
    }
  }
  
  function logout() {
    window.location.href = 'https://script.google.com/macros/s/AKfycbygoP1AEkAncei6mhOA8b-ASV0xpBz-IKpNZtO7Vmw_pZO2aUrjQcaNwO80uavMnu16og/exec';
  }

  {
fetch('http://192.168.0.100/api/data')
  .then(response => response.json())
  .then(data => console.log(data));
  }