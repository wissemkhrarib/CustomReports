function deleteItem(id,action,controller) {
	$.ajax({
					url: "/" + controller + "/" + action,
					type : "POST",
					data : {
					'id' : id
					},
				  success: function () {
					  $("#" + id).remove();
					  console.log("success");
					}
	});
	
}

