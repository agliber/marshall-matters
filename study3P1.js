

// -----------------------Form enable/disable-----------------------------------------------------
document.querySelector("button.navigation[type=next]").disabled = true;// next begins as disabled
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


document.querySelector("input[type=submit]").addEventListener("click",function(e){//submiting enables next button
  form.querySelectorAll("*").forEach(function(element){
    element.disabled = true;
  });
  document.querySelector("button.navigation[type=next]").disabled = false;
});

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

table.addEventListener("mouseover", function(e){
    timeout = setTimeout(function(){startTimer(e);},400);
});

function startTimer(e){//displays the information for each candidate upon hovering over a table data cell
    if(e.target.innerHTML.trim() === ""){//check for empty cell
      return;
    }

    if(e.target.className == "infoLabel"){
      console.log(e.target.innerHTML);
      var infoNum = e.target.getAttribute("data-info-num");
      time = 0;
      interval = setInterval(timer,100);
      document.querySelector("#candidate1").querySelector(`[data-info-num = "${infoNum}"]`).setAttribute("style","display:inline");
      document.querySelector("#candidate2").querySelector(`[data-info-num = "${infoNum}"]`).setAttribute("style","display:inline");

    }

};

table.addEventListener("mouseout", function(e){//hides the information for each candidate upon leaving a table data cell
  if(e.target.innerHTML.trim() === ""){//check for empty cell
    return;
  }
    if(e.target.className == "infoLabel"){
      clearTimeout(timeout);
      var infoNum = e.target.getAttribute("data-info-num");
      clearInterval(interval);
      document.querySelector("#candidate1").querySelector(`[data-info-num = "${infoNum}"]`).setAttribute("style","display:none");
      document.querySelector("#candidate2").querySelector(`[data-info-num = "${infoNum}"]`).setAttribute("style","display:none");

    }
});

document.querySelector("button.navigation[type=next]").addEventListener("click",function(){
  window.location = "study3P2.html";
});

function timer(){

    time += 0.1;
    console.log(time);

}
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
