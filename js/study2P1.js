var questions = document.querySelectorAll(".question");
var answerOptions = [ "Not_At_All", "Rarely", "Some-times", "Often", "Very_Often"];

questions.forEach(function(question,index){

  for(var i = 0; i < 5; i++){
    var newCell = document.createElement("div");
    var newRadio = document.createElement("input");
    newCell.append(newRadio);

    newRadio.setAttribute("type","radio");
    newRadio.setAttribute("name",`Q${index+1}`);
    newRadio.setAttribute("value",answerOptions[i]);
    //newRadio.setAttribute("required","");//make all radio buttons required
    //question.append(newCell);
    $(newCell).insertAfter(question);
  }
});

//-----------check all the radio buttons are checked before submitting----------
/*
document.querySelector("input[type=submit]").disabled = true;
var form = document.querySelector("form");

form.addEventListener("click", function(e){
  var numChecked = form.querySelectorAll("input[type=radio]:checked").length;
  console.log(numChecked);
  if(numChecked == 18){
    document.querySelector("input[type=submit]").disabled = false;
    console.log("enable submit");
  }
});
*/