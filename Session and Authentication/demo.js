const express = require('express');
// const cookieParser = require('cookie-parser');
const expressSession = require('express-session');
const app = express();

app.use(express.urlencoded({extended:true}));

app.use(expressSession({
    secret: 'super secret',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: 'auto' }
}));
app.get('/', (req, res) => {
    console.log(req.session.user);
   res.send(`<!DOCTYPE html>
   <html lang="en">
   <head>
       <meta charset="UTF-8">
       <meta http-equiv="X-UA-Compatible" content="IE=edge">
       <meta name="viewport" content="width=device-width, initial-scale=1.0">
       <title>Document</title>
   </head>
   <body>
       <p>Hello, ${req.session.user}</p>
       <a href="/login">Login</a>
   </body>
   </html>`)
})
app.get('/login',(req,res)=>{
    res.sendFile(__dirname + '/login.html')   
})

app.post('/login',(req,res)=>{
    if(req.body.username == 'peter' && req.body.password == '123'){
        console.log('Successful login');
        req.session.user = 'peter'
    }
    res.redirect('/')
})

app.listen(3000, () => console.log('Server started on port 3000'));