const sqlite3 = require("sqlite3");

const db = new sqlite3.Database("db.Anderson");

db.serialize(() => {
    db.run(`
        CREATE TABLE IF NOT EXISTS usuario (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            nome TEXT NOT NULL,
            email TEXT NOT NULL UNIQUE,
            senha TEXT NOT NULL,
            tipo TEXT NOT NULL
        );
    `);

    db.run(`
        CREATE TABLE IF NOT EXISTS categoria (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            nome TEXT NOT NULL
        );
    `);

    db.run(`
        CREATE TABLE IF NOT EXISTS chamado (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            titulo TEXT NOT NULL,
            descricao TEXT NOT NULL,
            status TEXT NOT NULL DEFAULT 'aberto',
            prioridade TEXT NOT NULL DEFAULT 'média',
            data_criacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            data_atualizacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            usuario_id INTEGER NOT NULL,
            categoria_id INTEGER NOT NULL
        );
    `);

    db.run(`
        CREATE TABLE IF NOT EXISTS abre (
            chamado_id INTEGER NOT NULL,
            usuario_id INTEGER NOT NULL,
            dt_chamado DATE NOT NULL,
            PRIMARY KEY (chamado_id, usuario_id)
        );
    `);

    // Foreign keys são suportadas, mas precisam ser ativadas no SQLite
    db.run(`PRAGMA foreign_keys = ON;`);

    db.run(`
        CREATE TABLE IF NOT EXISTS tecnico (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            nome TEXT NOT NULL
        );
    `);

    
});

module.exports = { db };
