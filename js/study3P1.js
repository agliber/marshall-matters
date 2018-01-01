
/*jshint esversion: 6 */
// -----------------------Form enable/disable-----------------------------------------------------
/*
document.querySelector("input[type=submit]").disabled = true; // submit button is disabled until radio button is selected
var submittedBool = false;
var form = document.querySelector("form");
form.addEventListener("click",function(e){
  if(e.target.tagName == "INPUT" && e.target.getAttribute("type") == "radio"){
    if(e.target.checked && !submittedBool){
      submittedBool = true;
      document.querySelector("input[type=submit]").disabled = false; //enable the submit button
    }
  }
});
*/



//------------------------------Randomize form info-----------------------------------------------

var candidate1InfoBox = document.querySelector("#candidate1").querySelectorAll(".info");
var candidate2InfoBox = document.querySelector("#candidate2").querySelectorAll(".info");
var infoLabels = document.querySelectorAll(".infoLabel");

infoLabels.forEach(function(label,i){
  candidate1InfoBox[i].setAttribute("data-info-num",i);
  candidate2InfoBox[i].setAttribute("data-info-num",i);
  label.setAttribute("data-info-num",i);
    label.id = i;
});

var infoLabelsShuffled = shuffle(Array.from(infoLabels));

infoLabels.forEach(function(label,i){
  label.outerHTML = infoLabelsShuffled[i].outerHTML;
});

//----------------------------info hover timer------------------------------------------------

var table = document.querySelector("#infoTable");
var interval, timeout, time = 0;

table.addEventListener("mouseover", function(e){//delays the timer
    timeout = setTimeout(function(){startTimer(e);},400);
});

var timeTotals = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]; // stores the cummalitive hover times, for each characteristic
function startTimer(e){//displays the information for each candidate upon hovering over a table data cell
    if(e.target.innerHTML.trim() === ""){//check for empty cell
      return;
    }

    if(e.target.className == "infoLabel"){
      console.log(e.target.innerHTML);
      var infoNum = e.target.getAttribute("data-info-num");

      interval = setInterval(function(){timer(infoNum);}, 100);

      document.querySelector("#candidate1").querySelector(`[data-info-num = "${infoNum}"]`).setAttribute("style","display:inline");
      document.querySelector("#candidate2").querySelector(`[data-info-num = "${infoNum}"]`).setAttribute("style","display:inline");

    }

}

table.addEventListener("mouseout", function(e){//hides the information for each candidate upon leaving a table data cell
  if(e.target.innerHTML.trim() === ""){//check for empty cell
    return;
  }
    if(e.target.className == "infoLabel"){
      clearTimeout(timeout);//restarts timer delay
      var infoNum = e.target.getAttribute("data-info-num");
      clearInterval(interval);// restarts timer
      document.querySelector("#candidate1").querySelector(`[data-info-num = "${infoNum}"]`).setAttribute("style","display:none");
      document.querySelector("#candidate2").querySelector(`[data-info-num = "${infoNum}"]`).setAttribute("style","display:none");

    }
});


function timer(infoNum){
    timeTotals[infoNum] += 0.1;
    console.log(timeTotals[infoNum]);

}

var postInterval = setInterval(postTimes, 10000);

function postTimes(){
  var timeData = {
     "College GPA" : timeTotals[0] ,
     "Extraversion score" : timeTotals[1] ,
     "Agreeableness score" : timeTotals[2] ,
     "Conscientiousness score" : timeTotals[3] ,
     "Gender" : timeTotals[4] ,
     "Race" : timeTotals[5] ,
     "Name of College Attended" : timeTotals[6]  ,
     "Major" : timeTotals[7],
     "Socioeconomic Status Background" : timeTotals[8],
     "Prior Experience in The Field" : timeTotals[9],
     "Pet Owner (yes/no)" : timeTotals[10],
     "Hobbies" : timeTotals[11],
     "Marital Status" : timeTotals[12],
     "Measure of Achievement Motivation" : timeTotals[13],
     "Favorite Color" : timeTotals[14],
     "Favorite Movie" : timeTotals[15],
     "Hometown" : timeTotals[16],
     "Programming Language " : timeTotals[17],
     "Foreign Language" : timeTotals[18],
     "Graduate Degree" : timeTotals[19],
  };
  $.post("/api/times",timeData);
}
var radioButtons = document.querySelector("form").querySelectorAll("input[type=radio]:checked");
document.querySelector("input[type=submit]").addEventListener("click",function(e){//submiting enables next button
    var radioButtons = document.querySelector("form").querySelectorAll("input[type=radio]:checked");
    console.log(radioButtons.length);
    if(radioButtons.length == 1){
      clearInterval(postTimes);
    }
});
//-----------------array shuffle function-------------------------------------------------------------

function shuffle(array) {
    var index = array.length , temp, random;

    while(index > 0){
      random = Math.floor(Math.random() * index);
      index--;

      temp = array[index];
      array[index] = array[random];
      array[random] = temp;
    }

    return array;
}
