const express = require('express');
const path = require('path');
const authRoutes = require('./routes/auth');
const app = express();
const port = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, '../public')));
  
const {db} = require('./database/db.js');

db.serialize(() => {
    console.log('Banco de dados carregado.');
});

app.get('/login', (req, res)=> {
     res.sendFile(path.join(__dirname, '../public/pages/login.html'));
});

app.get('/cadastro', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/pages/cadastro.html'));
})

app.use('/api/auth', authRoutes);

app.listen(port, ()=> {
    console.log(`Servidor rodando na porta ${port}`);
});