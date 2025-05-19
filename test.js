function toggleSubmenu(id) {
    const submenu = document.getElementById(id);
    if (submenu.style.display === "block") {
        submenu.style.display = "none";
      } else {
        submenu.style.display = "block";
      }
    }
  
  function loadPage(page) {
    document.getElementById('content').innerHTML =
      '<iframe src="' + page + '" frameborder="0" width="100%" height="100%"></iframe>';
  }  
  