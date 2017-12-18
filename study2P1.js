var answerBoxes = document.querySelectorAll(".answerBox");
var answerOptions = [ "Not_At_All", "Rarely", "Some-times", "Often", "Very_Often"];

answerBoxes.forEach(function(answerBox,index){
  console.log(answerBox,index);
  for(var i = 0; i < 5; i++){
    var newRadio = document.createElement("input");
    newRadio.setAttribute("type","radio");
    newRadio.setAttribute("name",`Q${index+1}`);
    newRadio.setAttribute("value",answerOptions[i]);
    answerBox.append(newRadio);
  }
});

var nextButton =  document.querySelector("button.navigation[type = \"next\"]");

nextButton.addEventListener("click",function(e){
  window.location = "study3P1.html";
});
