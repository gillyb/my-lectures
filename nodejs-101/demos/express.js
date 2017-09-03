
var express = require('express');
var app = express();

app.get('/gilly', function(req, res) {

    res.send('hello');

});

app.listen(8081);
