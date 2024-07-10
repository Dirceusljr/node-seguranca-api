const PermissaoService = require("../services/permissaoService");

const permisssaoService = new PermissaoService();

class PermissaoController {
  static async cadastrar(req, res) {
    const { nome, descricao } = req.body;

    try {
      const role = await permisssaoService.cadastrar({ nome, descricao });

      res.status(200).send(role);
    } catch (error) {
      res.status(400).send({ message: error.message });
    }
  }

  static async buscarTodasPermissoes(req, res) {
    try {
      const listaPermissoes = await permisssaoService.buscarTodasPermissoes();

      res.status(200).send(listaPermissoes);
    } catch (error) {
      res.status(400).send({ message: error.message });
    }
  }

  static async buscarPermissaoPorId(req, res) {
    const { id } = req.params;

    try {
      const permissao = await permisssaoService.buscarPermissaoPorId(id);

      res.status(200).send(permissao);
    } catch (error) {
      res.status(400).send({ message: error.message });
    }
  }

  static async editarPermissao(req, res) {
    const { id } = req.params;
    const { nome, descricao } = req.body;

    try {
      const permissao = await permisssaoService.editarPermissao({ id, nome, descricao });

      res.status(200).send(permissao);
    } catch (error) {
      res.status(400).send({ message: error.message });
    }
  }

  static async deletarPermissao(req, res) {
    const { id } = req.params;

    try {
      const role = await permisssaoService.deletarPermissao(id);

      res.status(200).send({message: 'Permissão deletada com sucesso!'});
    } catch (error) {
      res.status(400).send({ message: error.message });
    }
  }
}

module.exports = PermissaoController;
