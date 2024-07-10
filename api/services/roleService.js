const database = require("../models");
const uuid = require("uuid");

class RoleService {
  async cadastrar(dto) {
    const role = await database.roles.findOne({
      where: {
        nome: dto.nome,
      },
    });

    if (role) {
      throw new Error("Role já cadastrada.");
    }

    try {
      const newRole = await database.roles.create({
        id: uuid.v4(),
        nome: dto.nome,
        descricao: dto.descricao,
      });

      return newRole;
    } catch (error) {
      throw new Error("Erro ao cadastrar role.");
    }
  }

  async buscarTodosOsRoles() {
    try {
      const listaRoles = await database.roles.findAll();

      return listaRoles;
    } catch (error) {
      throw new Error("Erro ao realizar a busca.");
    }
  }

  async buscarRolePorId(dto) {
    try {
      const role = database.roles.findOne({
        where: {
          id: dto,
        },
      });

      if (!role) {
        throw new Error("Role com esse id não foi cadastrado.");
      }

      return role;
    } catch (error) {
      throw new Error("Erro ao realizar a busca.");
    }
  }

  async editarRole(dto) {
    const role = await this.buscarRolePorId(dto.id)

    if(!role) {
        throw new Error('Role informada não cadastrada.')
    }

    try {
        role.nome = dto.nome
        role.descricao = dto.descricao
        await role.save()

        return await role.reload()
    } catch (error) {
        throw new Error("Erro ao editar a role.");
    }
  }

  async deletarRole(dto) {
    try {
        const role = database.roles.destroy({
          where: {
            id: dto,
          },
        });
  
        return role;
      } catch (error) {
        throw new Error("Não foi possível deletar a role.");
      }
  }
}

module.exports = RoleService;
