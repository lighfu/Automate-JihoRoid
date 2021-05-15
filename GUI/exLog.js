// =======================================
// ログ　log　Javascript
//    編集時に　デバッグとして使用できる
// =======================================
//
// Function
//  read(String m) ... Get log
//      m = ["text" or "html"]
//
//  write(String s, String color) ... Write log
//      s = String
//      color = String  (exsample:  "red"  "rgb(255,68,130)")
//
//  delete() ... Delete log
//
// invisible(Number m) ... Hide log
//      m = True or False  / 1 or 0
let log = {
  id: "log",
  logging: true,


  read: function(m) {
    var log;
    var e = document.getElementById(log.id);
    if (m == "text") {
      log = e.textContent;
    } else {
      log = e.innerHTML;
    }
    return log;
  },

  write: function(s, color) {
    if (log.logging == true) {
      var e = document.getElementById(log.id);
      e.innerHTML = "<div style='color:" + color + "'>" + s + "</div>" + e.innerHTML;
    }
  },

  delete: function() {
    var e = document.getElementById(log.id);
    e.textContent = "";
  },

  invisible: function(m) {
    var e = document.getElementById(log.id);

    m == true ? e.style.display = "none": e.style.display = "block";
  }
}