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
            if(response.status == 1) {
                var myTrans = requestTransDict();
                // render html with myTrans here!!!!11x
                $("#status").html("OK, Added Transaction");
            } else {
                $("#status").html(response.error);
            }
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

function requestTransDict() {
    $.ajax({
        type: 'POST',
        dataType: "json",
        async: true,
        url: '/requestTransDict',
        data: {user:$("#user").val()},
        // callback handler that will be called on success
        success: function(response, textStatus, jqXHR) {
            console.log(response);
            return response;
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
}