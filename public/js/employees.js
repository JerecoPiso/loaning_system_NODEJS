$(document).on('click', '#add-employee', function(){
      $('.add-employee-form').slideToggle();
	});

	var app = angular.module('myApp', []);
	 app.controller('myCtrl', function($scope,$http) {
	 $scope.data = {};

	 $scope.submit= function(){

	 
	    $http({
	        url: '/add-employee',
	        method: 'POST',
	        data: $scope.data
	    }).then(function (httpResponse) {
	   //  alert(httpResponse.data);
	  // 
	     if(httpResponse.data.length === undefined){
	       alert("Input fields should not be empty!")
	     }else{
	     	  $('input').val('');
	         $('#data').html(httpResponse.data);
	     	 $scope.data = {};
	     }
	    })
	}
	  

 });
	 $(document).on('click', '.delete', function(){
        $('#modalDelete').modal('show');
        $('.btn-delete').val($(this).data('id'));
        $('.btn-delete').click(function(){
       
        	if($(this).val() === 0){
        		alert("ID is empty!");
        	}else{
        		$.ajax({
        			type: "POST",
        			url: "/delete-employee",
        			data: {
                        id: $(this).val()
        			},
        			success: function(res){
        				 $('#modalDelete').modal('hide');
        				$('#data').html(res);
        			}
        		})
        	}

        });
	 });
	  $(document).on('click', '.edit', function(){
        $('#modalUpdate').modal('show');
        $('.update').val($(this).data('id'));
        $('#name').val($(this).data('name'));
        $('#position').val($(this).data('position'));
        $('#salary').val($(this).data('salary'));
        $('#address').val($(this).data('address'));
        $('.update').click(function(){
       
        	if($(this).val() === 0){
        		alert("ID is empty!");
        	}else{
        		$.ajax({
        			type: "POST",
        			url: "/update-employee",
        			data: {
                        id: $(this).val(),
                        name: $('#name').val(),
                        position:  $('#position').val(),
                        salary:  $('#salary').val(),
                        address:  $('#address').val()
        			},
        			success: function(res){
        				$('#data').html(res);
        				 $('#modalUpdate').modal('hide');
        				
        			}
        		})
        	}

        });
	 });