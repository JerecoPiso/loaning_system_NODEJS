const express = require('express');
//use hbs view eng
const app = express();
var conn = require('./conn.js');
//response for expenses
app.get('/response-expenses', (req, res) => {
    let sql = "SELECT * FROM expenses";
    let query = conn.query(sql, (err, results) => {
    if(err) throw err;
    //console.log(results);
    return res.render('response', {
        results: results
    });
 
});
});
//response for expenses
app.get('/response-employees', (req, res) => {
    let sql = "SELECT * FROM employees";
    let query = conn.query(sql, (err, results) => {
    if(err) throw err;
    //console.log(results);
    return res.render('response-employees', {
        results: results
    });
   // var result = JSON.parse(JSON.stringify(results));
    //res.send(result);
});
});
app.post('/ajax-search', (req, res) => {
    
    var sql = "SELECT category FROM expenses WHERE category LIKE '%"+req.body.search+"%'";
    var query = conn.query(sql, (err,results) => {
     
     if (err) throw err;
            
            for(var i in results){
                res.send("<li class='list-group-item'>"+results[i].category+"</li>");
            }

    });

});
//searching name of the loaner for paying and checking balance
app.post('/name-search', (req, res) => {
     
     var sql = "SELECT * FROM customer WHERE customer_name LIKE '%"+req.body.name+"%'";
     var query = conn.query(sql, (err, results) => {
         if (err) throw err;

        for(var i in results){
            res.send("<li class='list-group-item'>"+results[i].customer_name+"</li>");
        }
           
     });
     
});
//balance check
app.post('/balance-check', (req, res) => {
   var balance = 0;
   var name;
   var sql = "SELECT * FROM customer WHERE customer_name='"+req.body.name+"'";
   var query = conn.query(sql, (err, results) => {
      
      if (err) throw err;
         //console.log(results.length);
         if (results.length > 0 ) {

            for( var i in results){

             balance = results[i].loan;
             name = results[i].customer_name;
            
           }
            
            res.send(name+" is "+balance);
         }else{
            res.send("No name found!");
         }

     });

});
app.post('/get-msg', (req, res) => {
    
     var sql = "SELECT * FROM messages WHERE  sender='"+req.body.sender+"'AND receiver='"+req.body.receiver+"' OR receiver='"+req.body.sender+"'AND sender='"+req.body.receiver+"'";
     conn.query(sql, (err,results) => {
                     
       if(err) throw err;
                     

        if(results.length <= 0){

             res.send("No messages");

        }else{

             res.send(results);
          
        }

    });

});
//get message when clicking in the active list
app.post('/get-message', (req, res) => {
     
       var check_last_id = "SELECT id  FROM messages WHERE  sender='"+req.body.sender+"'AND receiver='"+req.body.receiver+"' OR receiver='"+req.body.sender+"'AND sender='"+req.body.receiver+"' ORDER BY id DESC LIMIT 1";
       var last_id;
       conn.query(check_last_id, (error, results) => {
           
           if (error) throw error;

           for(var i in results){
            last_id = results[i].id;
           }
           
           if(last_id == req.body.last){
              
              res.send("None");

           }else{
            
            //check if the last id is not equal undefined
            if (req.body.last != undefined){

            var sql = "SELECT * FROM messages WHERE id>"+req.body.last+" AND sender='"+req.body.sender+"' AND receiver='"+req.body.receiver+"' OR id>"+req.body.last+" AND receiver='"+req.body.sender+"' AND sender='"+req.body.receiver+"'";
               // console.log(req.body.last)
                // console.log(sql)

            conn.query(sql, (err,results) => {
                     
              if(err) throw err;
                     
               if(results.length <= 0){

                     res.send("No messages");
                     console.log("sdsd")

              }else{
                     res.send(results);
                 }

             });
               }
           }
        
       });     

});
 //monthly calculating the loan
app.post('/cal', (req, res) => {
    var total=0;
    var sql = "SELECT loan FROM customer WHERE month='"+req.body.month+"'";
    conn.query(sql, (err, results) => {

      if(err) throw err;
      
      for(var i in results){
          total = Number(total + Number(results[i].loan));
      }
         res.send(total.toString());
    });
     
});

module.exports = app;