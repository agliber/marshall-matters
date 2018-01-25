
/*jshint esversion: 6 */
//jquery included
//js-cookie included

// set time cookies to zero if not already set
var timeData = {};
(function(){

  if(!Cookies.get('times') ){
    timeData = {
       "College GPA" : 0 ,
       "Extraversion score" : 0,
       "Agreeableness score" : 0 ,
       "Conscientiousness score" : 0 ,
       "Gender" : 0 ,
       "Race" : 0 ,
       "Name of College Attended" : 0  ,
       "Major" : 0,
       "Socioeconomic Status Background" : 0,
       "Prior Experience in The Field" : 0,
       "Pet Owner (yes/no)" : 0,
       "Hobbies" : 0,
       "Marital Status" : 0,
       "Measure of Achievement Motivation" : 0,
       "Favorite Color" : 0,
       "Favorite Movie" : 0,
       "Hometown" : 0,
       "Programming Language" : 0,
       "Foreign Language" : 0,
       "Graduate Degree" : 0,
    };
  }else{
    timeData = JSON.parse(Cookies.get('times') );
  }
  Cookies.set('times',timeData);
}());
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
    timeout = setTimeout(function(){startTimer(e);},1200);
});

 // stores the cummalitive hover times, for each characteristic
function startTimer(e){//displays the information for each candidate upon hovering over a table data cell
    if(e.target.innerHTML.trim() === ""){//check for empty cell
      return;
    }

    if(e.target.className == "infoLabel"){
      var label = e.target.innerHTML.trim();
      var infoNum = e.target.getAttribute("data-info-num");
      interval = setInterval(function(){timer(label);}, 100);

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


function timer(label){

    timeData[label] += 0.1 ;
    timeData[label] = round(timeData[label],2);
    Cookies.set('times',timeData);

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


//-------------rounding function---------------------------------------------

function round(value, decimals) {
  return Number(Math.round(value+'e'+decimals)+'e-'+decimals);
}
