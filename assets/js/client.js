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
                requestTransDict();
                document.getElementById("status").innerHTML =
                    "Added transaction.";
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
            updateUI(response);
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

function updateUI(trans) {
    var value = trans.value;
    var neighbors = trans.neighbors;

    // render html with myTrans here!!!!11x
    var table = document.getElementById("trans");
    table.innerHTML = "";
    for(var curNeighbor in neighbors) {
        console.log(neighbors[curNeighbor]);
        
        var rowCount = table.rows.length;
        var row = table.insertRow(rowCount);
        
        // Friend
        var cell1 = row.insertCell(0);
        cell1.innerHTML = curNeighbor;
        
        // Amount
        var cell2 = row.insertCell(1);
        cell2.innerHTML = neighbors[curNeighbor].net;
    }
}
