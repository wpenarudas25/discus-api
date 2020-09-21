const express = require('express');
const router = express.Router();

const mysqlConnection = require('../database');
 
// Mostrar todos los Discos
router.get('/discos', function (req, res) {
        mysqlConnection.query('SELECT * FROM discos', (err, rows, fields) => {
            if (!err) {
                res.json(rows);
            } else {
                console.log(err);
            }
        });
    });


// Mostrar un Disco
router.get('/discos/:id', (req, res)=>{
    const {id} = req.params;
    mysqlConnection.query('SELECT * FROM discos WHERE id = ?',[id], (err, rows, fields) => {
        if (!err) {
            res.json(rows[0]);
        } else {
            console.log(err);
        } 
    })

});

// Agregar un nuevo Disco
router.post('/discos', (req, res) => {
    mysqlConnection.query('INSERT INTO discos SET ?', req.body, (err, result) => {
        if (err) throw err;
 
        res.status(201).send(`Disco agregado con el ID: ${result.insertId}`);
    });
});

// Eliminar un Disco
router.delete('/discos/:id', (req, res) => {
    const { id } = req.params;
    mysqlConnection.query('DELETE FROM discos WHERE id = ?', [id], (err, rows, fields) => {
      if(!err) {
        res.json({status: 'Disco Eliminado'});
      } else {
        console.log(err);
      }

    });
  }); 

  // Actualizar un Disco existente
router.put('/discos/:id', (req, res) => {
    const id = req.params.id;
 
    mysqlConnection.query('UPDATE discos SET ? WHERE id = ?', [req.body, id], (error, result) => {
        if (error) throw error;
 
    res.send('Disco actualizado correctamente!');
    });
});


module.exports = router; 