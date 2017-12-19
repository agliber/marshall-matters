


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


function shuffle(array) {
  var currentIndex = array.length, temporaryValue, randomIndex;
  // While there remain elements to shuffle...
  while (0 !== currentIndex) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;


  }
  return array;
}

var candidate1InfoBox = document.querySelector("#candidate1").querySelectorAll(".info");
var candidate2InfoBox = document.querySelector("#candidate2").querySelectorAll(".info");

  var infolabels = document.querySelectorAll("td");



for(let i = 0; i < 19 ; i++){

  candidate1InfoBox[i].setAttribute("data-info-num",i);
  candidate2InfoBox[i].setAttribute("data-info-num",i);
  infolabels[i].setAttribute("id",i);

}

var arr = [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19];

arr = shuffle(arr);
var infolabelsShuffled = [];

infolabels.forEach(function(label,i){
   infolabelsShuffled.push( infolabels[ arr[i] ] );
});





i = 0;
infolabels.forEach(function(label){

  label.outerHTML = infolabelsShuffled[i].outerHTML;
  i++;

});

var table = document.querySelector("#infoTable");
var interval,time = 0;

table.addEventListener("mouseover", function(e){//displays the information for each candidate upon hovering over a table data cell
    if(e.target.innerHTML.trim() === ""){//check for empty cell
      return;
    }

    if(e.target.tagName == "TD"){

      var infoNum = e.target.id;
      time = 0;
      interval = setInterval(timer,100);
      document.querySelector("#candidate1").querySelector(`[data-info-num = "${infoNum}"]`).setAttribute("style","display:inline");
      document.querySelector("#candidate2").querySelector(`[data-info-num = "${infoNum}"]`).setAttribute("style","display:inline");

    }

});

table.addEventListener("mouseout", function(e){//hides the information for each candidate upon leaving a table data cell
  if(e.target.innerHTML.trim() === ""){//check for empty cell
    return;
  }
    if(e.target.tagName == "TD"){

      var infoNum = e.target.id;
      clearInterval(interval);
      document.querySelector("#candidate1").querySelector(`[data-info-num = "${infoNum}"]`).setAttribute("style","display:none");
      document.querySelector("#candidate2").querySelector(`[data-info-num = "${infoNum}"]`).setAttribute("style","display:none");

    }
});

document.querySelector("button.navigation[type=next]").addEventListener("click",function(){
  window.location = "study3P2.html";
});

function timer(){

  //  time += 0.1;
  //  console.log(time);

}
