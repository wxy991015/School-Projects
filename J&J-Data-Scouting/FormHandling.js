$(document).ready(function() {
    $("#singleSubmit").click(function(event) {
        event.preventDefault();
        var form = $("#myForm")[0];
        var data = new FormData(form);
        //$("#singleSubmit").prop("disabled", true);
        $.ajax({
            type: "POST",
            url: "127.0.0.1:5000/companies",
            data: data,
            processData: false,
            contentType: false,
            success: function(data) {
                console.log("SUCCESS: ", data);
                //$("#singleSubmit").prop("disabled", false);
            },
            error: function(e) {
                console.log("ERROR: ", e);
                //$("#singleSubmit").prop("disabled", false);
            }
        })

    })
})