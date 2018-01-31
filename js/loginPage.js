
/*jshint esversion: 6 */
// jquery included

$(function ($) {
    var $inputs = $('input[name=email],input[name=mturk_id]');

    $inputs.on('input', function () {
        // Set the required property of the other input to false if this input is not empty.
        $inputs.not(this).prop('required', !$(this).val().length);
        $inputs.not(this).prop('disabled', $(this).val().length );
    });

});

var timeout = 0;
document.querySelector("input[type=email]").addEventListener("input",function (e){
  clearTimeout(timeout);//restarts timer delay
  var emailInput = document.querySelector('input[type=email]');
  var email = { "email" : (emailInput.value) };
  var submitButton = document.querySelector('input[type=submit]');
  var loadingAnimation = document.querySelector('form').querySelector('img');
  submitButton.disabled = true;


  timeout = setTimeout(function(){
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
  },600);

});
