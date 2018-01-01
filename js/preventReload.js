

window.addEventListener("beforeunload",function(e){
    var confirmationMessage = "Please do not reload page";
    e.returnValue = confirmationMessage;     // Gecko, Trident, Chrome 34+
    return confirmationMessage;
});
