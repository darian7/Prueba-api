const express = require ('express');
const app= express();


//settings

app.set('port',process.env.PORT || 3000); 

//middlewares
app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use(function(req,res, next) {

    res.header('Access-Control-Allow-Origin',"*");
    res.header('Access-Control-Allow-Methods','GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers','Content-Type');
    next();

});

//routes

app.use(require('./routes/empleados'));



//star servidor
app.listen(app.get('port'),() => {
console.log('server', app.get('port'));
});