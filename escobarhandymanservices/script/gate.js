(function () {
  // ---- EDIT THESE TWO LINES ----
  var PASSWORD = "escobar123";        // the password visitors must enter
  var STORAGE_KEY = "folderUnlocked"; // change per-folder if you gate more than one

  if (sessionStorage.getItem(STORAGE_KEY) === "yes") return;

  document.addEventListener("DOMContentLoaded", function () {
    var overlay = document.createElement("div");
    overlay.id = "gate-overlay";
    overlay.innerHTML =
      '<div id="gate-box">' +
        '<p id="gate-label">This page is password protected</p>' +
        '<input id="gate-input" type="password" placeholder="Password" autocomplete="off" />' +
        '<button id="gate-submit">Enter</button>' +
        '<p id="gate-error">Incorrect password</p>' +
      '</div>';
    document.body.appendChild(overlay);
    document.body.style.overflow = "hidden";

    var style = document.createElement("style");
    style.textContent =
      '#gate-overlay{position:fixed;inset:0;z-index:99999;background:#0b1226;' +
      'display:flex;align-items:center;justify-content:center;font-family:system-ui,sans-serif;}' +
      '#gate-box{background:#fff;padding:32px 28px;border-radius:10px;width:280px;text-align:center;' +
      'box-shadow:0 20px 50px rgba(0,0,0,.4);}' +
      '#gate-label{margin:0 0 16px;font-size:14px;color:#222;}' +
      '#gate-input{width:100%;padding:10px;border:1px solid #ccc;border-radius:6px;font-size:14px;' +
      'margin-bottom:10px;box-sizing:border-box;}' +
      '#gate-submit{width:100%;padding:10px;border:none;border-radius:6px;background:#222;color:#fff;' +
      'font-size:14px;cursor:pointer;}' +
      '#gate-submit:hover{background:#000;}' +
      '#gate-error{display:none;color:#c0392b;font-size:12px;margin:10px 0 0;}';
    document.head.appendChild(style);

    function tryUnlock() {
      var input = document.getElementById("gate-input");
      if (input.value === PASSWORD) {
        sessionStorage.setItem(STORAGE_KEY, "yes");
        overlay.remove();
        document.body.style.overflow = "";
      } else {
        document.getElementById("gate-error").style.display = "block";
        input.value = "";
        input.focus();
      }
    }

    document.getElementById("gate-submit").addEventListener("click", tryUnlock);
    document.getElementById("gate-input").addEventListener("keydown", function (e) {
      if (e.key === "Enter") tryUnlock();
    });
    document.getElementById("gate-input").focus();
  });
})();
