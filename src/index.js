const express = require ('express');
const app= express();

//settings

app.set('port',process.env.PORT || 3000); 

//middlewares
app.use(express.json());
app.use(express.urlencoded({extended:false}));


//routes

app.use(require('./routes/empleados'));



//star servidor
app.listen(app.get('port'),() => {
console.log('server', app.get('port'));
});