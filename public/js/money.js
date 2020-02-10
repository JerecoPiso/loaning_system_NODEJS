 $(document).ready(function(){
        var date = new Date();
        var lastDay =  new Date(date.getDate(), date.getMonth() + 1, 0); 
        //alert(lastDay.getDate())
        if(date.getDate() != lastDay){

        	$.ajax({
                url: "/cal",
                type: "POST",
                data:{
                    month: date.getMonth()
                },
                success:function(res){
                	//alert(res);
                }
        	});

        }else{
        	//alert("No way")
        }

    });