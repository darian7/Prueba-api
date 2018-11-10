const mysql= require('mysql');

const mysqlConnection = mysql.createConnection({
host: '127.0.0.1',
user: 'root',
password: 'root',
database: 'company',
port: '33061'
});

mysqlConnection.connect(function (err){
    if (err) {
        console.log(err,"este es el error encontrado");
	 return;
    }else{
        console.log("coneccion exitosa a la Bd")
    }
});

module.exports = mysqlConnection;
