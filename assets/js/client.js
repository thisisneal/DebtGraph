console.log("client.js loaded");

$("#submit_trans").click(function() {
    $.ajax({
        type: 'POST',
        dataType: "json",
        async: true,
        url: '/addTransPost',
        data: {lender:$("#lender").val(),
               borrower:$("#borrower").val(),
               amount:$("#amount").val(),
               description:$("#description").val()},
        // callback handler that will be called on success
        success: function(response, textStatus, jqXHR) {
            if(response.status == 1)
                $("#status").html("OK, Added Transaction")
        },
        // callback handler that will be called on error
        error: function(jqXHR, textStatus, errorThrown) {
            // log the error to the console
            console.log(
                "The following error occured: " +
                textStatus, errorThrown
            );
        }
    });
});