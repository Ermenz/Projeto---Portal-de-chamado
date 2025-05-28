CREATE DATABASE chamadosdb;
USE chamadosdb;

CREATE TABLE tipo_usuario (
  id_tipo_usuario INT PRIMARY KEY AUTO_INCREMENT,
  nome_tipo VARCHAR(50) NOT NULL UNIQUE
);

CREATE TABLE usuario (
  id_usuario INT PRIMARY KEY AUTO_INCREMENT,
  nome_usuario VARCHAR(100) NOT NULL,
  email_usuario VARCHAR(100) NOT NULL UNIQUE,
  senha_usuario VARCHAR(100) NOT NULL,
  id_tipo_usuario INT NOT NULL,
  FOREIGN KEY (id_tipo_usuario) REFERENCES tipo_usuario(id_tipo_usuario)
);

CREATE TABLE prioridade_chamado (
  id_prioridade INT PRIMARY KEY AUTO_INCREMENT,
  nivel_prioridade ENUM('baixa', 'media', 'alta') NOT NULL
);

CREATE TABLE status_chamado (
  id_status INT PRIMARY KEY AUTO_INCREMENT,
  nome_status VARCHAR(50) NOT NULL UNIQUE
);

CREATE TABLE chamado (
  id_chamado INT PRIMARY KEY AUTO_INCREMENT,
  titulo_chamado VARCHAR(100) NOT NULL,
  descricao_chamado TEXT NOT NULL,
  id_status INT NOT NULL,
  id_prioridade INT NOT NULL,
  dt_criacao_chamado DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  dt_conclusao_chamado DATETIME,
  id_usuario_abertura INT NOT NULL,
  id_usuario_responsavel INT,
  FOREIGN KEY (id_status) REFERENCES status_chamado(id_status),
  FOREIGN KEY (id_prioridade) REFERENCES prioridade_chamado(id_prioridade),
  FOREIGN KEY (id_usuario_abertura) REFERENCES usuario(id_usuario),
  FOREIGN KEY (id_usuario_responsavel) REFERENCES usuario(id_usuario)
);

-- Dados iniciais
INSERT INTO tipo_usuario (nome_tipo) VALUES 
('administrador'), 
('tecnico'),       
('usuario');

INSERT INTO prioridade_chamado (nivel_prioridade) VALUES 
('baixa'),
('media'),
('alta');

INSERT INTO status_chamado (nome_status) VALUES 
('aberto'),
('em_andamento'),
('resolvido'),
('fechado');