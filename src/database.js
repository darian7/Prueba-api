const mysql= require('mysql');

const mysqlConnection = mysql.createConnection({
host: 'localhost',
user: 'root',
password: 'root',
database: 'company'
});

mysqlConnection.connect(function (err){
    if (err) {
        console.log(err);
        return;
    }else{
        console.log("coneccion exitosa")
    }
});

module.exports = mysqlConnection;