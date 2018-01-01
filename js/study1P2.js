
var form =  document.querySelector("form");
var checkBoxItem = form.querySelectorAll("label");
var checkBoxes = document.querySelectorAll("input[type=checkbox]");

//----------------set the id for each checkbox to the index number
checkBoxItem.forEach(function(checkBox,index){
  checkBox.id = index;
});

//-------------------make sudo X box trigger real checkbox---------------
form.addEventListener("click", function(e){
  var inputCheckBoxes = form.querySelectorAll("input[type=checkbox]");
  inputCheckBoxes.forEach(function(box){
      if(box.checked == true){
          box.parentElement.querySelector(".newCheck").innerHTML = "X";
        //box.parentElement.querySelector(".newCheck").setAttribute("style","background-color: blue;");
      }else{
        box.parentElement.querySelector(".newCheck").innerHTML = "";
      }
  });

});
//--------------------randomize order of questions-----------------------------
var checkBoxItemShuffled = shuffle( Array.from(checkBoxItem) );
checkBoxItem.forEach(function(checkBox,i){
    checkBox.outerHTML  = checkBoxItemShuffled[i].outerHTML;
});



//------------------Array randomizer function----------------------------------

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
