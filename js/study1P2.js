
var form =  document.querySelector("form");
var checkBoxItem = form.querySelectorAll("label");
var checkBoxes = document.querySelectorAll("input[type=checkbox]");

checkBoxes.forEach(function(checkBox){
  var hiddenInput = document.createElement("input");
  hiddenInput.type = "hidden";
  hiddenInput.className = "uncheckedBox";
  hiddenInput.name = "unchecked";
  console.log(checkBox.getAttribute("value") );
  hiddenInput.setAttribute("value",checkBox.getAttribute("value") );
  checkBox.parentElement.append(hiddenInput);
});

//----------------set the id for each checkbox to the index number
checkBoxItem.forEach(function(checkBoxItem,index){
  checkBoxItem.id = index;// index each checkbox

});

//-------------------make sudo X box trigger real checkbox---------------
form.addEventListener("click", function(e){
  var inputCheckBoxes = form.querySelectorAll("input[type=checkbox]");

  inputCheckBoxes.forEach(function(box){
    console.log(box.parentElement.querySelectorAll(".uncheckedBox"));
      if(box.checked == true){
          box.parentElement.querySelector(".newCheck").innerHTML = "X";

          box.parentElement.querySelector(".uncheckedBox").disabled = true;//disable hidden input
        //box.parentElement.querySelector(".newCheck").setAttribute("style","background-color: blue;");
      }else{
        box.parentElement.querySelector(".newCheck").innerHTML = "";
        box.parentElement.querySelector(".uncheckedBox").disabled = false;//enable hidden input
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
