 $(document).on('click','.edit',function(){
        var id = $(this).data('id');
        var name = $(this).data('customer_name');
        var number = $(this).data('phone_number');
        var address = $(this).data('address');
        var work = $(this).data('work');
        var loan = $(this).data('loan');

        $('#modalUpdate').modal('show');
        $('#customers_id').val(id);
        $('#name').val(name);
        $('#number').val(number);
        $('#address').val(address);
        $('#work').val(work);
        $('#loan').val(loan);
   });

 $(document).on('click','.delete',function(){
        var id = $(this).data('id');
        $('#modalDelete').modal('show');
        $('#customer_id').val(id);
   });
 
$(document).on('click', '.delete', function(){
    $('#modalDelete').modal('show');


});
$(document).on('click', '.btn-toggler', function(){
       $('.toggleNav').slideToggle();	
	});
	$(document).on('click', '.x', function(){
       $('.admin-dashboard').slideUp();	
	});
	