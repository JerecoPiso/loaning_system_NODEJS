$('form').submit(function(event){
    

    $.ajax({
      
      type: "POST",
      url: "/paid",
      data:{
          
          name: $('#name-selected').val(),
          amount: $('#amount').val()
      },

      success:function(res){
      	alert(res);
      }


    });
     
 event.preventDefault();
});
$(document).on('keyup', '#name', function(){
   
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

				$('.name-result').html(res);
			}

		});

	}

});
$(document).on('click', '.list-group-item', function(){
    
    $('#name').val($(this).text());
});
$(document).on('click', '#select-name', function(){
    
    $('#name-selected').val($('#name').val());
    $('#name').val('');
    $('.list-group > .list-group-item').remove();

});
