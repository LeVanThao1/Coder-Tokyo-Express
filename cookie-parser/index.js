const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');

app.use(cookieParser());

app.get('/', (req, res) => {
    res.cookie('name-id', 1234);
    res.send("hello");  
});

app.get('/user', (req, res) => {
    console.log(req.cookies);
})
app.listen(3000);