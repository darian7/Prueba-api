const express = require('express');
const router = express.Router();
const mysqlconecction = require('../database');

router.get('/empleados', (req, res) => {
    mysqlconecction.query('select * from empelados', (err, rows, fields) => {
        if (!err) {
            res.json(rows);
        } else {
            console.log(err);
        }
    });
});

router.get('/empleados/:id', (req, res) => {
    const { id } = req.params;
    mysqlconecction.query('select * from empelados where id=?', [id], (err, rows, fields) => {
        if (!err) {
            res.json(rows[0]);
        } else {
            console.log(err);
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

    mysqlconecction.query('select id from empelados where id=?', [id], (err, rows, fields) => {

        if (rows[0] != null) {

            mysqlconecction.query('update empelados set name=?, salario=? where id=?', [name, salario, id], (err, rows, fields) => {
                if (!err) {
                    res.json({ Status: 'Empleado actualizado' });
                } else {
                    console.log(err);
                }
            });

        } else {
            res.json({ Status: 'El empleado no existe' });
        }

    });

});

router.post('/login', (req, res) => {


    const { correo, contraseña } = req.body;

    if (correo != "") {

        if (contraseña != "") {

            mysqlconecction.query('select correo from usuarios where correo=?', [correo], (err, rows, fields) => {

                if (rows[0] != null) {
                    mysqlconecction.query('select contraseña from usuarios where contraseña=? and correo=?', [contraseña, correo], (err, rows, fields) => {
                        if (rows[0] != null) {
                            res.json({ Status: 'Login exitoso' });
                            return;
                        } else {
                            res.json({ Status: 'Contraseña erronea' });
                        }
                    });

                } else {
                    res.json({ Status: 'Correo erroneo' });
                }

            });

        } else {
            res.json({ Status: 'Ingrese contraseña' });
        }

    } else {

        res.json({ Status: 'Ingrese usuario' });

    }



});

module.exports = router;