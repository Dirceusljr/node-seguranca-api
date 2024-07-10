const { Router } = require("express");


const router = Router()

router
    .post('/role')
    .get('/role')
    .get('/role/:id')
    .put('/role/:id')
    .delete('/role/:id')

module.exports = router