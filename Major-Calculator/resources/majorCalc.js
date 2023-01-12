/* Major Calculator JavaScript file */

function validate(formObj) {
   var alertText = "";
   var focusSet = 0;
   if (formObj.firstName.value === "") {
      alertText += "You must enter a first name\n";
      formObj.firstName.focus();
      focusSet = 1;
   }
}
function hashInput(name) {
   var value = name.trim();
   var sum = 0;
   for(var i = 0; i < value.length; i++){
      sum += value.charCodeAt(i);
   }
   sum /= 16
   return sum;
}
var clicked = "";
var inputName = "";
var nameVal = 0;
var majorVal = 0;
var totalVal = 0;
$(document).ready(function () {
   $(".dropdown-content").change(function() {
        if($(this).val() != "Chosen Major"){
            clicked = $(this).val();
        }
   });
   $("#calculate").click(function () {
      inputName = "";
      nameVal = 0;
      majorVal = 0;
      totalVal = 0;
      var inputName = $("#name").val();
      var nameVal = hashInput(inputName);
      var majorVal = hashInput(clicked)
      var totalVal = majorVal + nameVal;
      totalVal %= 100;
      totalVal = Math.round(totalVal * 10) / 10
      $("#result").text("You are " + totalVal + "% compatible with this Major");
      $("#result").fadeIn();
   })
});