const { Router } = require("express");
const RoleController = require("../controllers/roleController");


const router = Router()

router
    .post('/roles', RoleController.cadastrar)
    .get('/roles', RoleController.buscarTodosOsRoles)
    .get('/roles/id/:id', RoleController.buscarRolePorId)
    .put('/roles/id/:id', RoleController.editarRole)
    .delete('/roles/id/:id', RoleController.deletarRole)

module.exports = router