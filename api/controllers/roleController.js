const RoleService = require("../services/roleService");

const roleService = new RoleService();

class RoleController {
  static async cadastrar(req, res) {
    const { nome, descricao } = req.body;

    try {
      const role = await roleService.cadastrar({ nome, descricao });

      res.status(200).send(role);
    } catch (error) {
      res.status(400).send({ message: error.message });
    }
  }

  static async buscarTodosOsRoles(req, res) {
    try {
      const listaRoles = await roleService.buscarTodosOsRoles();

      res.status(200).send(listaRoles);
    } catch (error) {
      res.status(400).send({ message: error.message });
    }
  }

  static async buscarRolePorId(req, res) {
    const { id } = req.params;

    try {
      const role = await roleService.buscarRolePorId(id);

      res.status(200).send(role);
    } catch (error) {
      res.status(400).send({ message: error.message });
    }
  }

  static async editarRole(req, res) {
    const { id } = req.params;
    const { nome, descricao } = req.body;

    try {
      const role = await roleService.editarRole({ id, nome, descricao });

      res.status(200).send(role);
    } catch (error) {
      res.status(400).send({ message: error.message });
    }
  }

  static async deletarRole(req, res) {
    const { id } = req.params;

    try {
      const role = await roleService.deletarRole(id);

      res.status(200).send({message: 'Role deletada com sucesso!'});
    } catch (error) {
      res.status(400).send({ message: error.message });
    }
  }
}

module.exports = RoleController;
