
/*jshint esversion: 6 */
// jquery included

document.querySelector("input[type=email]").addEventListener("input",function (e){

  var emailInput = document.querySelector('input[type=email]');
  var email = { "email" : (emailInput.value) };

  $.post("/api/email-exists", email  ,function(data){

      if(!data){
        emailInput.setCustomValidity("Please provide a valid email");
      }else{
        emailInput.setCustomValidity("");
      }

  });

});
