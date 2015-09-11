var express = require('express');
var path = require('path');
var app = express();
app.use(express.static(process.argv[3] || path.join(__dirname, 'public')));
app.get('/', function(req, res) {
    res.end('Hello World!');
}).get('/home', function(req, res) {
    res.end('Hello World!');
});
app.listen(process.argv[2] || 3008);
