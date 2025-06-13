create database IF NOT EXISTS db_Anderson;

use db_Anderson;

create table IF NOT EXISTS usuario(
    id int PRIMARY KEY AUTO_INCREMENT,
    nome varchar(100) NOT NULL,
    email varchar(100) NOT NULL UNIQUE,
    senha varchar(100) NOT NULL,
    tipo char(1) NOT NULL
);

create table IF NOT EXISTS categoria(
    id INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(100) NOT NULL
);

create table IF NOT EXISTS chamado(
    id INT PRIMARY KEY AUTO_INCREMENT,
    titulo VARCHAR(100) NOT NULL,
    descricao TEXT NOT NULL,
    status ENUM('aberto', 'em andamento', 'fechado') NOT NULL DEFAULT 'aberto',
    prioridade ENUM('baixa', 'média', 'alta') NOT NULL DEFAULT 'média',
    data_criacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    data_atualizacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    usuario_id INT NOT NULL,
    categoria_id INT NOT NULL,
    
);

create table IF NOT EXISTS abre(
    chamado_id INT NOT NULL,
    usuario_id INT NOT NULL,
    dt_chamado DATE NOT NULL,
    PRIMARY KEY (chamado_id, usuario_id)
);

ALTER TABLE chamado
ADD FOREIGN KEY (categoria_id) REFERENCES categoria(id);

ALTER TABLE chamado
ADD FOREIGN KEY (usuario_id) REFERENCES usuario(id);

ALTER TABLE chamado
ADD FOREIGN KEY (tecnico_id) REFERENCES tecnico(id);

ALTER TABLE abre
ADD FOREIGN KEY (chamado_id) REFERENCES chamado(id);

ALTER TABLE abre
ADD FOREIGN KEY (usuario_id) REFERENCES usuario(id);

-- Esse arquivo é apenas para deixar salvo o banco físico. As modificações do banco estarão em um outro.