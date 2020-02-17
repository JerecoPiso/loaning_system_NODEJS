const express = require('express');
const app = express();
var conn = require('./conn.js');

//adding employees
app.post('/add-employee', (req, res) => {
	var datas = req.body;
	query = conn.query("INSERT INTO employees SET ?", datas, function(err, result){
      if (err) {
      	return res.send(err);
      }else{

      	  res.redirect('/response-employees');
        
      }
	});
});
//adding expenses
app.post('/add-expenses', (req, res) => {
    var query = conn.query("INSERT INTO expenses SET ?", req.body, function(err, result){
    	if (err) {
    		return res.send(err);
    	}else{

         res.redirect('/response-expenses');
         
    	}

    });
});
//insert chat messages to table messages
app.post('/insert-messages', (req, res) => {
    //array of month name for converting number month to string
    const monthNames = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
    ];
   
    var date = new Date();
    var month = date.getUTCMonth() + 1; //months from 1-12
    var day = date.getUTCDate();
    var year = date.getUTCFullYear();
    var new_date = monthNames[month-1]+" "+day+ " " + year;
   
            var sql_2 = "INSERT INTO messages (chats, date, sender, receiver) VALUES ('"+req.body.chat+"','"+new_date+"','"+req.body.sender+"','"+req.body.receiver+"')";
            conn.query(sql_2 , (error, results) => {
            
            if(error) throw error;    
                 var sql = "SELECT * FROM messages WHERE  sender='"+req.body.sender+"'AND receiver='"+req.body.receiver+"' OR receiver='"+req.body.sender+"'AND sender='"+req.body.receiver+"' ORDER BY id DESC LIMIT 1";
                 conn.query(sql ,(error, result) => {
                  
                     res.send(result);
                   // console.log(result);
                 });
            });
   
});
module.exports = app;