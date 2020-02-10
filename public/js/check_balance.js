$(document).on('keyup', '#search', function(){
   
	if($(this).val() === ""){

		$('.list-group > .list-group-item').remove();
			
	}else{

		$.ajax({

			type: "POST",
			url: "/name-search",
			data: {
              name: $(this).val()
			},
			success:function(res){

				$('.list-group').html(res);
			}

		});

	}

});
$(document).on('click', '#check', function(){
   
	if($('#search').val() === ""){

		$('.list-group > .list-group-item').remove();
			
	}else{

		$.ajax({

			type: "POST",
			url: "/balance-check",
			data: {
              name: $('#search').val()
			},
			success:function(res){

			   $('#balance').val(res);
			   $('#search').val('');
			   $('.list-group > .list-group-item').remove();

			}

		});

	}

});
$(document).on('click', '.list-group-item', function(){
   
  $('#search').val($(this).text());


});