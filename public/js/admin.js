/*****************************
**	delete item             **
*****************************/
$(function() {
	$('.del').click(function(event) {
		var target = $(event.target)
		var id = target.data('id')
		var name = target.data("name")
		var tr = $(".item-id-" + id)

		if(!confirm('Are you sure delete the record of its name is "' + name + '" ?')) {
			return false;
		}

		$.ajax({
			url: '/admin/list?id=' + id,
			type: 'DELETE'
		})
		.done(function(result) {
			if(result.success === 1) {
				if(tr.length > 1) {
					tr.remove()
				}
			}
		})
		.fail(function() {
			console.log("error");
		})
		.always(function() {
			console.log("complete");
		});
		
	});
})