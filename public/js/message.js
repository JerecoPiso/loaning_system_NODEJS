//getting the receivers name/ selectting whose to chat 
$(document).on('click', '.list-group-item', function(){

  $('strong').text($(this).text());

});
//submitting the message via ajax request
$(document).on('submit', '#myForm' , function(event) {
    
   var msg =  $('#message').val();
   
   //checking the message if it is empty
	 if( $('#message').val() === ""){

	 }else{

     $('#message').val('');

      //the ajax request
		  $.ajax({
           
           type: "POST",
           url: "/insert-messages",
           data:{
              chat:  msg,
              sender: $('#sender').text(),
              receiver: $('strong').text(),
              last: $('.last_id').last().val()
           },
           success:function(res){
           	  
              //getting the response result coming from the server and get its values using for loop
           		for(var i in res){
                
                //check if the sender is the user
           			if(res[i].sender == $('#sender').text()){
                        
                    $('.card-body').append("<div class='sender'><input type='hidden' class='last_id' value='"+res[i].id+"'><img src='vendor/images/login2.png' class='dp'><div class='messages'>"+res[i].chats+"</div></div><br>")

           			}else{

           				  $('.card-body').append("<div class='receiver'><input type='hidden' class='last_id' value='"+res[i].id+"'><img src='vendor/images/login2.png' class='dp'><div class='messages'>"+res[i].chats+"</div></div><br>")
           			}
           			
           		}

           	//scroll To Bottom Automatically	
  				  var elem = document.getElementById('body-card');
  				  elem.scrollTop = elem.scrollHeight;
				  
           }//success end
		  });
  	}

	 event.preventDefault();

});
//displaying the chatbox when the user clicks in the active lists and getting their messages to each other if their is
$(document).on('click', '.list-group-item', function(){

      var elem;

      $('.card-body').html('')
     
      if ($('.chat-box').is(":visible")){

          $('.chat-box').hide();
         
      }else{

         $('.chat-box').show();

      }
        $('.chat-box').fadeIn();
      //ajax request for getting the messages 
      $.ajax({
           
           type: "POST",
           url: "/get-msg",
           data:{
              sender: $('#sender').text(),
              receiver: $(this).text(),
              
           },
           success:function(response){
            
                if (response == "No messages") {

                  $('.card-body').html("<h5 style='color:red;text-align:center;'>No messages</h5>");

                }else{

                  for(var i in response){

                    if(response[i].sender == $('#sender').text()){
                            
                        $('.card-body').append("<div class='sender'><input type='hidden' class='last_id' value='"+response[i].id+"'><img src='/vendor/login.png' class='dp'><div class='messages'>"+response[i].chats+"</div></div><br>")

                    }else{

                        $('.card-body').append("<div class='receiver'><input type='hidden' class='last_id' value='"+response[i].id+"'><img src='/vendor/login.png' class='dp'><div class='messages'>"+response[i].chats+"</div></div><br>")
                   
                    }
                
              }
              
                var element = document.getElementById('body-card');
                element.scrollTop = element.scrollHeight;
               
           }  
        }
    });
});

$(document).ready(function (){

  //get new messages every two seconds  
	setInterval(function(){

		  if ($('.chat-box').is(":visible")){
		  
      		$.ajax({
                 
                 type: "POST",
                 url: "/get-message",
                 data:{
                    sender: $('#sender').text(),
                    receiver: $('strong').text(),
                    last: $('.last_id').last().val()

                    
                 },
                 success:function(response){
                 	
                      if (response == "None") {

                        
                          
                      }else if(response ==  "No messages" ){

                           $('.card-body').html("<h5 style='color:red;text-align:center;'>No messages</h5>");

                      }else{

                        for(var i in response){

                 			if(response[i].sender == $('#sender').text()){
                              
                              $('.card-body').append("<div class='sender'><input type='hidden' class='last_id' value='"+response[i].id+"'><img src='/vendor/login.png' class='dp'><div class='messages'>"+response[i].chats+"</div></div><br>")

                 			}else{
                 				  $('.card-body').append("<div class='receiver'><input type='hidden' class='last_id' value='"+response[i].id+"'><img src='/vendor/login.png' class='dp'><div class='messages'>"+response[i].chats+"</div></div><br>")
                 			}
                 			
                 		}
                 		
            				  var elem = document.getElementById('body-card');
            				  elem.scrollTop = elem.scrollHeight;
            				   // alert(elem.scrollHeight)

                      }
                 		
      				  
                 }

      		});

        }else{
           
        }

	}, 2000);
   
});