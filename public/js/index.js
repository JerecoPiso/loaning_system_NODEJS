
     var app = angular.module('myApp', []);
     app.controller('myCtrl', function($scope,$http) {
     $scope.data = {};

     $scope.submit= function(){
        
     
        $http({
            url: '/signup',
            method: 'POST',
            data: $scope.data
        }).then(function (httpResponse) {
              
                alert(httpResponse.data);

                $('input').val('');
        
         
        })
    }
      

 });  
    $(document).ready(function(){
            
          if($('#hidden-msg').text() != ""){
        
                $('#alert').text($('#hidden-msg').text());
                $('#alert').show();
                     
          }
        setInterval(function(){
             
            $('#alert').remove().text();
            $('#alert').hide();

      
        },5000)
    });
    $(document).on('click', '#signup', function(){
         $('.login-form').fadeOut();
         $('.modal').fadeIn();
         //$('.modal, .modal-content').css("box-shadow", "5px 10px 5px 10px #888888");

    });
     $(document).on('click', '.close', function(){
         $('.modal').fadeOut();
          $('.login-form').fadeIn();
    });
    $('.close').tooltip("Close")