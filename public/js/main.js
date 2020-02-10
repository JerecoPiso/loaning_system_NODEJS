$(document).on('click', '.btn-toggler', function(){
    $('.toggleNav').slideToggle();	
});
$(document).on('click', '.x', function(){
    $('.admin-dashboard').slideUp();	
});
$(document).ready(function(){
	
	$('#dataTable').DataTable({
		"bLengthChange": true,
		"bInfo": true,
		"bPaginate": true,
		"bFilter": true,
		"bSort": false,
		"pageLength": 7
	});
});
//ajax search
var  search_word = "";
	$(document).on('keyup', '#search-input', function(){
          search_word = $(this).val();
        if(search_word === ""){

        	$('.list-group > .list-group-item').remove();

        }else{
        	$.ajax({

        		type: "POST",
        		url: "/ajax-search",
        		data: {
        			search: search_word
        		},
        		success:function(res){
        			
        			$('.list-group').html(res);
                    //alert(res)
        			
        		}
        	});
        }

	});

