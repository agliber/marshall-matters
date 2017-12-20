document.querySelector("button.navigation[type=\"next\"]").addEventListener("click", function(){
    window.location = "study2P1.html";
});
var form =  document.querySelector("form");
var checkBoxItem = form.querySelectorAll("label");
var checkBoxes = document.querySelectorAll("input[type=checkbox]");



form.addEventListener("click", function(e){
  var inputCheckBoxes = form.querySelectorAll("input[type=checkbox]");
  inputCheckBoxes.forEach(function(box){
      if(box.checked == true){
        //box.parentElement.querySelector(".newCheck").setAttribute("style","background-color: blue;");
        box.parentElement.querySelector(".newCheck").setAttribute("style","content: '\274c';");
      }else{
        //box.parentElement.querySelector(".newCheck").setAttribute("style","background-color: red;");
      }
  });

});
checkBoxItem.forEach(function(checkBox,index){
  checkBox.id = index;
});


var checkBoxItemShuffled = shuffle( Array.from(checkBoxItem) );



checkBoxItem.forEach(function(checkBox,i){
    checkBox.outerHTML  = checkBoxItemShuffled[i].outerHTML;
});





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
