
var form =  document.querySelector("form");
var rows = form.querySelectorAll(".inputRow");


rows.forEach(function(row){
  var hiddenInput = document.createElement("input");
  hiddenInput.type = "hidden";
  hiddenInput.className = "uncheckedBox";
  hiddenInput.name = "unchecked";
  console.log(row.querySelector("input[type='radio']").getAttribute("name") );
  hiddenInput.setAttribute("value",row.querySelector("input[type='radio']").getAttribute("name") );
  row.append(hiddenInput);
});

//----------------set the id for each checkbox to the index number
rows.forEach(function(row,index){
  row.id = index;// index each checkbox

});

//-------------------make sudo X box trigger real checkbox---------------
form.addEventListener("click", function(e){
  var inputCheckBoxes = form.querySelectorAll("input[type=checkbox]");
  if(e.target.className == "newCheck"){
    let row = e.target.parentElement;
    console.log("hi");

    if(row.querySelector("input[value='1']").checked == true){
        row.querySelector("input[value='1']").checked = false;
        e.target.innerHTML = "";//insert checkmark char into div
        row.querySelector(".uncheckedBox").disabled = false;
    }else{
      row.querySelector("input[value='1']").checked = true;
      row.querySelector(".newX").innerHTML = "";// erase Xmark
      e.target.innerHTML = "&#10004";//insert checkmark char into special div
      row.querySelector(".uncheckedBox").disabled = true;
    }
  }
  if(e.target.className == "newX"){
    let row = e.target.parentElement;
    console.log("hi X");

    if(row.querySelector("input[value='2']").checked == true){
      row.querySelector("input[value='2']").checked = false;
      e.target.innerHTML = "";//remove X mark char into special Xmark div
      row.querySelector(".uncheckedBox").disabled = false;
    }else{
      row.querySelector("input[value='2']").checked = true;
      row.querySelector(".newCheck").innerHTML = "";// erase checkmark
      e.target.innerHTML = "&#10006";//insert X mark char into special div
      row.querySelector(".uncheckedBox").disabled = true;
    }

  }
  if(e.target.type == "RADIO"){
    console.log(e.target.type);
    console.log("in");
    e.preventDefault();
  }


});
//--------------------randomize order of questions-----------------------------
var rowShuffled = shuffle( Array.from(rows) );
rows.forEach(function(checkBox,i){
    checkBox.outerHTML  = rowShuffled[i].outerHTML;
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
