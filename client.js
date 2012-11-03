console.log("client.js loaded");

console.log($);

$("#status").html("JQuery working");

$("#submit_trans").click(function() {
    console.log("Asdf");
    $.ajax({
        type: 'POST',
        dataType: "json",
        async: true,
        url: '/addTransPost',
        data: {lender:$("#lender").val(),
               borrower:$("#borrower").val(),
               amount:$("#amount").val(),
               description:$("#description").val()},
        success: function(res){
            console.log(res);
            $("#status").html("OK, Added Transaction").fadeIn('fast')
        }
    });
});