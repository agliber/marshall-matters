document.querySelector("button.navigation[type=next]").addEventListener("click",function(){
  window.location = "study3P3.html";
});

var form = document.querySelector("form");
var radioButtons = form.querySelectorAll("input[type=radio][value=yes]");


form.addEventListener("click", function(e){
    radioButtons.forEach( function(button){
       var textarea = form.querySelector("textarea[name =" + button.name +"]")
      if(button.checked == true){
        textarea.setAttribute("style","display:initial");
      }else{
        textarea.setAttribute("style","display:none");
      }
    });
});
