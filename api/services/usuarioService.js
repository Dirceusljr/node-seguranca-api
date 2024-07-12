const database = require('../models')
const { hash } = require('bcryptjs');
const uuid = require('uuid');

class UsuarioService {
    async cadastrar(dto) {
        const usuario = await database.usuarios.findOne({
            where: {
                email: dto.email
            }
        })
        if (usuario) {
            throw new Error('Usuário já cadastrado!')
        }
    
        try {
            const senhaHash = await hash(dto.senha, 8)
    
            const novoUsuario = database.usuarios.create({
                id: uuid.v4(),
                nome: dto.nome,
                email: dto.email,
                senha: senhaHash
            })
    
            return novoUsuario
        } catch (error) {
            throw new Error('Erro ao cadastrar usuário.')
        }
    }

    async buscarTodosOsUsuarios() {
        try {
            const listaUsuarios = await database.usuarios.findAll({
                include: [
                    {
                      model: database.roles,
                      as: "usuario_roles",
                      attributes: ["id", "nome", "descricao"],
                    },
                    {
                        model: database.permissoes,
                        as: "usuario_permissoes",
                        attributes: [ "id", "nome", "descricao" ]
                    },
                  ]
            })
    
            if(!listaUsuarios) {
                throw new Error('Não foi possível realizar a pesquisa.')
            }
            
            return listaUsuarios
        } catch (error) {
          throw new Error('Houve algum erro no banco de dados.')  
        }
    }
    
    async buscarUsuarioPorId(dto) {
        if(!dto) {
            throw new Error('É necessário informar um id válido.')
        }

        try {
        const usuario = await database.usuarios.findOne({
            include: [
                {
                  model: database.roles,
                  as: "usuario_roles",
                  attributes: ["id", "nome", "descricao"],
                },
                {
                    model: database.permissoes,
                    as: "usuario_permissoes",
                    attributes: [ "id", "nome", "descricao" ]
                },
              ],
            where: {
                id: dto
            }
        })
        if(!usuario) {
            throw new Error('Usuário informado não cadastrado.')
        }
            return usuario
        } catch (error) {
            throw new Error('Erro ao realizar a busca.')
        }
    }

    async editarUsuario(dto) {
        if(!dto.id) {
            throw new Error('É necessário informar um id.')
        }

        try {
            const usuario = await database.usuarios.update({
                nome: dto.nome,
                email: dto.email
            }, {
                where: {
                    id: dto.id
                }
            })
            
            if(usuario[0] === 0) {
                throw new Error('Erro ao editar usuario!')
            }

            return true
        } catch (error) {
            throw new Error('Erro ao editar usuario!')
        }

        //SOLUÇÃO DO CURSO
        // const usuario = await this.buscarUsuarioPorId(dto.id)
        // try {
        //     usuario.nome = dto.nome
        //     usuario.email = dto.email
        //     await usuario.save()
        //     return usuario
        // } catch (error) {
        //     throw new Error('Erro ao editar usuario!')
        // }
    }

    async deletarUsuario(dto) {
        if(!dto) {
            throw new Error('É necessário informar um id válido.')
        }

        try {
            const usuario = await database.usuarios.destroy({
                where: {
                    id: dto
                }
            })

            return usuario
        } catch (error) {
            throw new Error('Não foi possível deletar o usuário.')
        }
    }
}

module.exports = UsuarioService