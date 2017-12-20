var answerBoxes = document.querySelectorAll("tr");
var answerOptions = [ "Not_At_All", "Rarely", "Some-times", "Often", "Very_Often"];

answerBoxes.forEach(function(answerBox,index){
  console.log(answerBox,index);
  if(index == 0){
    return;
  }

  for(var i = 0; i < 5; i++){
    var newCell = document.createElement("td");
    var newRadio = document.createElement("input");
    newCell.append(newRadio);

    newRadio.setAttribute("type","radio");
    newRadio.setAttribute("name",`Q${index+1}`);
    newRadio.setAttribute("value",answerOptions[i]);
    answerBox.append(newCell);
  }
});

var nextButton =  document.querySelector("button.navigation[type = \"next\"]");

nextButton.addEventListener("click",function(e){
  window.location = "study3P1.html";
});
