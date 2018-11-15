const express = require('express');
const bodyParser = require('body-parser');
const app = new express();

app.use(bodyParser.json({
    limit: '5mb'
}));
app.use(bodyParser.urlencoded({
    extended: true,
    limit: '5mb'
}));
app.use(bodyParser.text());

app.use('/api', require('./back/api'));

require('http').Server(app).listen(3000, 'localhost', function () {
    console.log('Listening at %s:%d', this.address().address, this.address().port);
});
