	
	 var app = angular.module('myApp', []);
	 app.controller('myCtrl', function($scope,$http) {
	 $scope.data = {};
  
	 $scope.submit= function(){
	 	var full = $scope.data.date; 
		$scope.data.date = full.toDateString();
		
	 
	    $http({
	        url: '/add-expenses',
	        method: 'POST',
	        data: $scope.data
	    }).then(function (httpResponse) {
	        
	        $('#data').html(httpResponse.data);
	        $('#alert').text("Added succesfully");
	        $('#alert').show();
	        $('select, input').val('');
	   
	    })
	}
	  

 });
 
 $(document).on('click', '.delete', function(){
   
     var id = $(this).data('id');
     $('.yes-delete').val(id);
     $('#delExpenses').modal('show');

     $('.yes-delete').click(function(){

     	 $.ajax({
	       url: "/delete-expenses",
	       type: "POST",
	       data: {
	         id: $(this).val()
	       },
	       success: function(res){
	       		$('#data').html(res);
	       		$('#delExpenses').modal('hide');

	       }
	     });   

     })
	   
 });

  $(document).on('click', '.edit', function(){

     var id = $(this).data('id');
     $('.update').val(id);
     $('#category').val($(this).data('category'));
     $('#amount').val($(this).data('amount'));
     $('#spender').val($(this).data('spender'));
     $('#modalUpdate').modal('show');
     
     $('.update').click( function(){

     	 if (id <= 0) {

     	alert("ID is empty!");

	     }else{

	     	 $.ajax({
			       url: "/update-expenses",
			       type: "POST",
			       data: {
			         id: $(this).val(),
			         cat: $('#category').val(),
			         amount: $('#amount').val(),
			         spender: $('#spender').val()
			       },
			       success: function(res){
			       		$('#data').html(res);
			       		 $('#modalUpdate').modal('hide');
			       }
		     });

	     }

     })
 });
