const database = require('../models')

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

        database.usuarios.insert(dto)
    }
}

module.exports = UsuarioService