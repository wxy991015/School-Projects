(function() {
    'use strict';
    window.addEventListener('load', function() {
      // Get the forms we want to add validation styles to
      var forms = document.getElementsByClassName('needs-validation');
      // Loop over them and prevent submission
      var validation = Array.prototype.filter.call(forms, function(form) {
        form.addEventListener('submit', function(event) {
          if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
          }
          form.classList.add('was-validated');
        }, false);
      });
    }, false);
})();

function validateForm() {
  if (document.forms["myForm"]["company_name"].value == "") {
      return false;
  } else if (document.forms["myForm"]["company_website"].value == "") {
      return false;
  } else if (isURLvalid(document.forms["myForm"]["company_website"].value) == false) {
      alert("You Enter an invalid URL! Please try again!");
      return false;
  } else {
      alert("The website is successfully added!");
      return true;
  }
}

// Check whether it is true URL or not
function isURLvalid(str) {
  var patten = new RegExp('^(https?:\\/\\/)?'+ 
  '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|'+ 
  '((\\d{1,3}\\.){3}\\d{1,3}))'+ 
  '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+ 
  '(\\?[;&a-z\\d%_.~+=-]*)?' + 
  '(\\#[-a-z\\d_]*)?$','i');
  return !!patten.test(str);
}

function fileTypeCheck() {
    var fileInput = document.getElementById("myfile");
    var filePath = fileInput.value;
    var allowExtensions = /(\.xlsx|\.csv)$/i;
    if (!allowExtensions.exec(filePath)) {
      return false;
    } else {
      return true;
    }
}

function validateFileUpload() {
  if (document.forms["fileUpload"]["filename"].value == "") {
      return false;
  } else if (!fileTypeCheck()) {
      alert("Invalid file type! The file must be either .xlsx or .csv");
  } else {
    alert("10 websites are successfully added!")
    return true;
  }
}