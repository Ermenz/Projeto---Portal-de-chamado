const {db} = require('../database/db.js');
const bcrypt = require('bcrypt');

exports.login = (req, res) => {
    const {inp_email, inp_senha} = req.body;

    console.log("req.body: " , req.body);
    
    if(!inp_email || !inp_senha){
        return res.status(400).json({ mensagem: "Email e senha são obrigatórios. Digite-os Por favor!" });
    }

    const query = 'SELECT * FROM usuario WHERE email = ?';

    db.get(query, [inp_email], (err, row)=> {
        if (err) {
            console.error(err);
            return res.status(500).json({ mensagem: "Erro interno do servidor." });
        }

        if (!row){
            return res.status(401).json({ mensagem: "Email ou senha inválidos. Email ou senha não existem"});
        }

        bcrypt.compare(inp_senha, row.senha, (err, result) => {
            if (err) {
                console.error(err);
                return res.status(500).json({ mensagem: "Erro interno do servidor." });
            }

            if (!result) {
                return res.status(401).json({ mensagem: "Email ou senha inválidos." });
            }

            
            return res.status(200).json({ mensagem: "Login bem-sucedido!", usuario: {id: row.id, nome: row.nome, tipo: row.tipo} });
        });
    });
}

exports.cadastro = async (req, res) => {
    const {nome, email, senha, tipo} = req.body;
    
    if (!nome || !email || !senha || !tipo) {
        return res.status(400).json({ mensagem: "Por favor, preencha todos os campos!" });
    }


    
    try {
        const senhaCriptografada = await bcrypt.hash(senha,10);
        
        const insertQuery = 'INSERT INTO usuario (nome, email, senha, tipo) VALUES (?, ?, ?, ?)';

        db.run(insertQuery, [ nome, email, senhaCriptografada, tipo], (err)=> {
            if (err){
                if (err.message.includes("UNIQUE constraint failed")) {
                    return res.status(400).json({mensagem: "Email já cadastrado."});
                }
                console.error(err);
                return res.status(500).json({ mensagem: 'Erro ao cadastrar usuário.' });
            }

            return res.status(201).json({ mensagem: 'Usuário cadastrado com sucesso!', id: this.lastID });
        });

    } catch (error) {
        console.error(error);
        return res.status(500).json({ mensagem: 'Erro interno do servidor.' });
    }

    
}