/* Major Calculator JavaScript file */
var majors = ["Architecture", "Biomedical Engineering", "Chemical Engineering", "Environment Engineering", "Biology", "Management", "Communication", "Computer Science", "Information Technology and Web Science", "Mechanical Engineering", "Materials Engineering", "Civil Engineering", "Math", "Physics", "Psychology", "Electrical Engineering"];
majors.sort();
var scores = [];
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
function sortFunction(a, b) {
    if (a[0] === b[0]) {
        return 0;
    }
    else {
        return (a[0] < b[0]) ? -1 : 1;
    }
}
var clicked = "";
$(document).ready(function () {
   $("#calculate").click(function () {
         $("#result").text("");
         scores = [];
         var inputName = $("#name").val();
         var nameVal = hashInput(inputName);
         for(var i = 0; i < majors.length; i++){
            var majorVal = hashInput(majors[i])
            var totalVal = majorVal + nameVal;
            totalVal %= 100;
            totalVal = Math.round(totalVal * 10) / 10;
            scores.push([totalVal, majors[i]]);
         }
         scores.sort(sortFunction);
         for(var i = scores.length - 1; i >= 0; i--){
            $("#mList").append(scores[i][1] + " - " + scores[i][0] + "%<br>");
         }
         $("#mList").fadeIn();
   })
});