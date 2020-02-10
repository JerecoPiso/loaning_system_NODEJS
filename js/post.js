const express = require('express');
//use hbs view eng
const app = express();
var conn = require('./conn.js');
//file upload
app.post('/file', (req, res) => {
 
   if(req.method == "POST"){
     
 
	  if (!req.files)
				return res.send('No files were uploaded.');
 
		var file = req.files.uploaded_image;
		var img_name=file.name;
         
	  	 if(file.mimetype == "image/jpeg" ||file.mimetype == "image/png"||file.mimetype == "image/gif" ){
                                 
              file.mv('public/images/upload_images/'+file.name, function(err) {
                             
	              if (err)
 
	                return res.send(err);
      					var sql = "INSERT INTO photo (photo) VALUES ('" + img_name + "')";
 								console.log(sql);
    						var query = conn.query(sql, function(err, result) {
    							 res.redirect('/file');
    						});
					   });
          } else {
            message = "This format is not allowed , please upload file with '.png','.gif','.jpg'";
            res.render('file',{message: message});
          }
   } else {
      res.render('file');
   }

  
});
//signup for admin
app.post('/signup', (req, res) => {
      
      //check if request method is equal to post
      if (req.method == "POST") {
      
		    var sql = "SELECT COUNT(*) FROM admin WHERE name ='"+req.body.name+"'";
		    var query = conn.query(sql, function(err, rows, fields) {

	    	if (err) throw err;

	          //if row == 1 send a message to tell name is already used
			  if(rows[0]['COUNT(*)'] > 0) {

				return res.send("Name is already taken");

			  }else{
                  
                 //continued saving the data is name is not exist in database
			  	 if (req.body.password == req.body.repassword) {

			  	 		if (req.body.password.length <= 7) {

			  	 			return res.send("Password should contain at least 8 characters!");

			  	 		}else{

				           	   var sql = "INSERT INTO admin (name, password) VALUES ('"+req.body.name+"','"+req.body.password+"')";
					      	   var query = conn.query(sql, function(err, result){
				      
					      	   	if (err) {

					      	   		return res.send(err);

					      	   	}else{

					      	   		return res.send("Signup succesfully");

					      	   	}

				      	      });

			  	 		}

	           }else{
	                 
	                 return res.send("Password didn't matched");

	           }

			}//CHECK IF NAME EXIST END

         });//query var end 
                
      }else{

      	 return res.send("Request method should be POST!");

    }
});

//check name if already exist 
app.post('/check', (req, res) => {
	var cope = req.body;
     console.log(cope)
	var name = req.body.customer_name;
    var sql = "SELECT COUNT(*) FROM customer WHERE customer_name ='"+name+"'";
    var query = conn.query(sql, function(err, rows, fields) {

	  if (err) throw err;
	 
	  if(rows[0]['COUNT(*)'] > 0) {

		return res.send("Name is already taken");

	  }else{
	     //insert into database if the name is not exist
		 var query = conn.query('INSERT INTO customer SET ?', cope, function(err, result) {

		    if (err) {

		      
		       return res.send(err);

		     } else {
		     	
		       return res.send("Inserted succesfully");
		       
		     }
		});
	 }
	}); 
});


//admin login
app.post('/login', function(request, response) {
	var username = request.body.name;
	var password = request.body.password;
	if (username && password) {
		conn.query('SELECT * FROM admin WHERE name = ? AND password = ?', [username, password], function(error, results, fields) {
			if (results.length > 0) {
				request.session.loggedin = true;
				request.session.username = username;
				
				return response.redirect('/admin');
				
			} else {
				//response.send('Incorrect Username and/or Password!');
				request.session.alert = "Incorrect Username and/or Password!";
				return response.redirect('/');

			}			
			response.end();
		});
	} else {
		
				request.session.alert = "Please enter Username and Password!";
				return response.redirect('/');

		response.end();
	}
});
//for payment of the loaner
app.post('/paid', (req, res) => {

   var balance = 0;
   var new_balance = 0;
   var sql = "SELECT * FROM customer WHERE customer_name='"+req.body.name+"' LIMIT 1";
   var query = conn.query(sql, (err, results) => {
     
       if (err) throw err;
       
       // check if the name is in the database
       if (results.length > 0) {
 
	       for( var i in results){
	       	 balance = results[i].loan;
	       	
	       }
        
         if(req.body.amount > results[i].loan){

         		 //new_balance = balance - req.body.amount;
         		 new_balance = balance;
		         var sec_sql = "UPDATE customer SET loan='"+new_balance+"' WHERE customer_name='"+req.body.name+"'";
		     
		          conn.query(sec_sql, (error, result) => {
		          
		          if (error) throw error;

		           res.send("Paid succesfully. Your balance is now O");

		        });
	      
	       }else{

	       		 new_balance = balance - req.body.amount;
		         var sec_sql = "UPDATE customer SET loan='"+new_balance+"' WHERE customer_name='"+req.body.name+"'";
		     
		          conn.query(sec_sql, (error, result) => {
		          
		          if (error) throw error;

		           res.send("Paid succesfully. Your balance is now only : "+new_balance);

		        });

	       }

      }else{
          
          res.send("No name found");

      }
   });
    
});

module.exports = app;