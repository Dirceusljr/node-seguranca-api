const UsuarioService = require("../services/usuarioService")

const usuarioService = new UsuarioService()

class UsuarioController {
    static async cadastrar(req, res) {
        const { nome, email, senha } = req.body

        try {
            const usuario = await usuarioService.cadastrar({ nome, email, senha })
    
            res.status(201).send(usuario)
        } catch (error) {
            res.status(400).send({ message: error.message })
        }
    }

    static async buscarTodosOsUsuarios(req, res) {
        try {
            const listaUsuarios = await usuarioService.buscarTodosOsUsuarios()

            res.status(200).send(listaUsuarios)
        } catch (error) {
            res.status(400).send({message: error.message})
        }
    }

    static async buscarUsuarioPorId(req, res) {
        try {
            const { id } = req.params
            const usuario = await usuarioService.buscarUsuarioPorId(id)
            
            res.status(200).send(usuario)
        } catch (error) {
            res.status(400).send({ message: error.message })
        }
    }

    static async editarUsuario(req, res) {

        const { id } = req.params
        const { nome, email } = req.body
        
        try {
            const usuarioFoiEditado = await usuarioService.editarUsuario({ id, nome, email})
            
            if(usuarioFoiEditado) {
                const usuario = await usuarioService.buscarUsuarioPorId(id)
                res.status(200).send(usuario)
            }

        } catch (error) {
            res.status(400).send({ message: error.message })
        }

        //Solução do curso
        // const { id } = req.params
        // const { nome, email } = req.body
        // try {
        //     const usuario = await usuarioService.editarUsuario({ id, nome, email })
        //     res.status(200).json(usuario)
        // } catch (error) {
        //     res.status(400).send({ message: error.message })
        // }
    }

    static async deletarUsuario(req, res) {
        const { id } = req.params
        try {
            const usuario = await usuarioService.deletarUsuario(id)
            
            res.status(200).send({message: 'Usuário deletado com sucesso!'})
        } catch (error) {
            res.status(400).send({ message: error.message })
        }
    }
}

module.exports = UsuarioController