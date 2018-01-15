
/*jshint esversion: 6 */
// jquery included

document.querySelector("input[type=email]").addEventListener("input",function (e){

  var emailInput = document.querySelector('input[type=email]');
  var email = { "email" : (emailInput.value) };
  var submitButton = document.querySelector('input[type=submit]');
  var loadingAnimation = document.querySelector('form').querySelector('img');
  submitButton.disabled = true;
  loadingAnimation.style.visibility = "initial";

  $.post("/api/email-exists", email, function(data){

      if(!data){
        emailInput.setCustomValidity("Please provide a valid email");
      }else{
        emailInput.setCustomValidity("");

      }
      loadingAnimation.style.visibility = "hidden";
      submitButton.disabled = false;

  });


});
