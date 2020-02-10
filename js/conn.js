'use strict'
//use path module
const path = require('path');
//use express module
const express = require('express');
//use hbs view engine

const mysql = require('mysql');

const conn = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'loaning_system'
});
module.exports = conn;