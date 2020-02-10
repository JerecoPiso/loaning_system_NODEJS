const express = require('express');
const app = express();
var conn = require('./conn.js');
//update customer
app.post('/update', (req, res) => {
    var sql = "UPDATE customer SET customer_name='"+req.body.customer_name+"', phone_number='"+req.body.phone_number+"', address='"+req.body.address+"', work='"+ req.body.work+"', loan='"+req.body.loan+"' WHERE id="+req.body.id;
    var query = conn.query(sql, (err, results) => {
    if (err) throw err;
    res.redirect('/loaner-list');
    });
});
//update employee
app.post('/update-employee', (req, res) => {
   
    var sql = "UPDATE employees SET  name='"+req.body.name+"', position='"+req.body.position+"', salary='"+req.body.salary+"', address='"+req.body.address+"' WHERE id="+req.body.id;
    var query = conn.query(sql, (err, results) => {
       if (err) throw err;
       res.redirect('/response-employees');
    });
});
//update expenses
app.post('/update-expenses', (req, res) => {

    var sql = "UPDATE expenses SET category='"+req.body.cat+"', amount='"+req.body.amount+"', spender='"+req.body.spender+"' WHERE id="+req.body.id;
    var query = conn.query(sql, (err, results) => {
        
        if (err) throw err;

        res.redirect('/response-expenses');

    });
   
  //  console.log(sql);
});
module.exports = app;
