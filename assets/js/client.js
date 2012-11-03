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
			var table = document.getElementById("trans");
			var rowCount = table.rows.length;
			var row = table.insertRow(rowCount);

			// Lender
			var cell1 = row.insertCell(0);
			cell1.innerHTML = $("#lender").val();

			// Borrower
			var cell2 = row.insertCell(1);
			cell2.innerHTML = $("#borrower").val();

			var cell3 = row.insertCell(2);
			cell3.innerHTML = $("#amount").val();

			var cell4 = row.insertCell(3);
			cell4.innerHTML = $("#description").val();

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
