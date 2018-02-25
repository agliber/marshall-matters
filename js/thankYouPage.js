$(function ($) {
  $.get("/api/thankyou",function(data){

    var paragraph = document.getElementById("mturkCode");
    var codeText = document.createTextNode(data.mTurkCode + ".");

    paragraph.appendChild(codeText);
  });
});
