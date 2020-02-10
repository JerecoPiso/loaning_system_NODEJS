const express = require('express');
//use hbs view eng
const app = express();
var conn = require('./conn.js');
//route for homepage alert for log in error
app.get('/',(req, res) => {
     //check if admin is already loggedin redirect to dashboard if true
     if (req.session.loggedin === true) {

  	   res.render('admin_dashboard', {
          name : req.session.name
       });
        
     }else{

          res.render('index',{
         msg: req.session.alert

       });
   }
});
//route for messages
app.get('/messages', (req, res) => {

  var sql = "SELECT * FROM admin";
  conn.query(sql, (err, results) => {
      
      if(err) throw err;
      res.render('messages', {
        
        results: results,
        name: req.session.name

      });

  });	   
 
});
//route for signup
app.get('/signup',(req, res) => {
 
    res.render('signup', {
    	name : req.session.name
    });

});
app.get('/file', (req, res) => {
	res.render('file');
});

//route for logout
app.get('/logout',(req, res) =>{

	 req.session.loggedin=false;
   req.session.alert = "";
   	res.redirect('/');

});
//route after login
app.get('/dashboard',(req, res) => {
  
  if (req.session.loggedin != true) {

        res.redirect('/');

	}else{

    res.render('admin_dashboard', {
    	name : req.session.name
    });
     
}

});

//route to add customer
app.get('/add-customer',(req, res) => {
 	
    res.render('add-customer', {
    	name : req.session.name,
    	success:  req.session.msg
    });
   

});
//route for expenses
app.get('/expenses', (req, res) => {
  var total_expenses = 0;
	if (req.session.loggedin != true) {

        res.redirect('/');

	}else{

		  let sql = "SELECT * FROM expenses";
		  let query = conn.query(sql, (err, results) => {
		  if(err) throw err;

        for (var i in results) {
           total_expenses = total_expenses + Number(results[i].amount);
        }
        
		  res.render('expenses',{
		     results: results,
         total_expenses: total_expenses
		    	});
			});
	}
  
});
//log in
app.get('/admin', function(request, response) {
 
  
	if (request.session.loggedin) {

	   request.session.name = request.session.username;
		  response.redirect('/dashboard');
	} else {
		response.send('Please login to view this page!');
	}
	
	response.end();	
});
//route for loaner lists
app.get('/loaner-list',(req, res) => {
  let sql = "SELECT * FROM customer";
  let query = conn.query(sql, (err, results) => {
    if(err) throw err;
    res.render('loaner-list',{
      results: results
    });
  });
});
//route for employees
app.get('/employees',(req, res) => {
  let sql = "SELECT * FROM employees";
  let query = conn.query(sql, (err, results) => {
    if(err) throw err;
    res.render('employees',{
      results: results
    });
  });
});
// route for payment
app.get('/payment',(req, res) => {
    
    res.render('payment');
});
// route for checking balance
app.get('/check-balance', (req, res) => {
  
  res.render('check_balance');

});
// route for checking balance
app.get('/money', (req, res) => {
  
  res.render('money');

});
module.exports = app;