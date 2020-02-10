const express = require('express');
const app = express();
var conn = require('./conn.js');
//delete customer 
app.post('/delete', (req, res) => {
  let sql = "DELETE FROM customer WHERE id="+req.body.id+"";
  //console.log(sql)
  let query = conn.query(sql, (err, results) => {
    if(err) throw err;
      res.redirect('/loaner-list');
  });
});
app.post('/delete-expenses', (req, res) => {
  let sql = "DELETE FROM expenses WHERE id="+req.body.id+"";
  let query = conn.query(sql, (err, results) => {
    if(err) throw err;
      res.redirect('/response-expenses');
    
  });
});
app.post('/delete-employee', (req, res) => {
  let sql = "DELETE FROM employees WHERE id="+req.body.id+"";
  let query = conn.query(sql, (err, results) => {
    if(err) throw err;
     // res.redirect('/response-expenses');
      res.redirect('/response-employees');
  });
});
module.exports = app;