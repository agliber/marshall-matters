document.querySelector("button.navigation[type=\"next\"]").addEventListener("click", function(){
    window.location = "study1P2.html";
});

var form = document.querySelector("form");
var checkBoxes = document.querySelectorAll("input[type=checkbox]");

form.addEventListener("click", function(e){
    if(e.target.tagName == "LABEL"){
      console.log("woohoo");
    }
});
