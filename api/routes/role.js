const { Router } = require("express");
const RoleController = require("../controllers/roleController");


const router = Router()

router
    .post('/role', RoleController.cadastrar)
    .get('/role', RoleController.buscarTodosOsRoles)
    .get('/role/:id', RoleController.buscarRolePorId)
    .put('/role/:id', RoleController.editarRole)
    .delete('/role/:id', RoleController.deletarRole)

module.exports = router