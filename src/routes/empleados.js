const express = require('express');
const router = express.Router();
const mysqlconecction = require('../database');

router.get('/', (req, res) => {
    mysqlconecction.query('select * from empelados', (err, rows, fields) => {
        if (!err) {
            res.json(rows);
        } else {
            console.log(err);
        }
    });
});

router.get('/:id', (req, res) => {
    const { id } = req.params;
    mysqlconecction.query('select * from empelados where id=?', [id], (err, rows, fields) => {
        if (!err) {
            res.json(rows[0]);
        } else {
            console.log(err)
        }
    });
});

router.post('/newempleado', (req, res) => {
    const { name, salario } = req.body;
    mysqlconecction.query('insert into empelados (name,salario) values (?,?)', [name, salario], (err, rows, fields) => {
        if (!err) {
            res.json({ Status: 'Empleado guardado' });
        } else {
            console.log(err);
        }
    });
});

router.put('/actualizarempleado', (req, res) => {
    const { id, name, salario } = req.body;
    mysqlconecction.query('update empelados set name=?, salario=? where id=?', [name, salario, id], (err, rows, fields) => {
        if (!err) {
            res.json({Status: 'Empleado actualizado'});
        }else{
            console.log(err);
        }
    });
});

module.exports = router;