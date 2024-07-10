const database = require("../models");
const uuid = require("uuid");

class PermissaoService {
  async cadastrar(dto) {
    const permissao = await database.permissoes.findOne({
      where: {
        nome: dto.nome,
      },
    });

    if (permissao) {
      throw new Error("Permissão já cadastrada.");
    }

    try {
      const newPermissao = await database.permissoes.create({
        id: uuid.v4(),
        nome: dto.nome,
        descricao: dto.descricao,
      });

      return newPermissao;
    } catch (error) {
      throw new Error("Erro ao cadastrar permissão.");
    }
  }

  async buscarTodasPermissoes() {
    try {
      const listaPermissoes = await database.permissoes.findAll();

      return listaPermissoes;
    } catch (error) {
      throw new Error("Erro ao realizar a busca.");
    }
  }

  async buscarPermissaoPorId(dto) {
    try {
      const permissao = database.permissoes.findOne({
        where: {
          id: dto,
        },
      });

      if (!permissao) {
        throw new Error("Permissão com esse id não foi cadastrado.");
      }

      return permissao;
    } catch (error) {
      throw new Error("Erro ao realizar a busca.");
    }
  }

  async editarPermissao(dto) {
    const permissao = await this.buscarPermissaoPorId(dto.id)

    if(!permissao) {
        throw new Error('Permissão informada não cadastrada.')
    }

    try {
        permissao.nome = dto.nome
        permissao.descricao = dto.descricao
        await permissao.save()

        return await permissao.reload()
    } catch (error) {
        throw new Error("Erro ao editar a permissão.");
    }
  }

  async deletarPermissao(dto) {
    try {
        const permissao = database.permissoes.destroy({
          where: {
            id: dto,
          },
        });
  
        return permissao;
      } catch (error) {
        throw new Error("Não foi possível deletar a permissão.");
      }
  }
}

module.exports = PermissaoService;
