// Code.gs
function doGet() {
  return HtmlService.createHtmlOutputFromFile('login.html');
}

function validatePassword(password) {
  // 假設密碼為 'correctPassword'，你可以修改為從資料庫或其他地方驗證密碼
  var correctPassword = 'correctPassword';
  
  // 驗證密碼
  if (password === correctPassword) {
    return true;
  } else {
    return false;
  }
}
