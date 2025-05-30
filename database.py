import sqlite3
from werkzeug.security import generate_password_hash, check_password_hash

# Cria conexão e tabelas
def init_db():
    conn = sqlite3.connect('portal_chamados.db')
    c = conn.cursor()

    c.execute('''
    CREATE TABLE IF NOT EXISTS usuarios (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        email TEXT UNIQUE NOT NULL,
        senha TEXT NOT NULL,
        tipo_usuario INTEGER NOT NULL
    )
    ''')

    c.execute('''
    CREATE TABLE IF NOT EXISTS chamados (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        titulo TEXT NOT NULL,
        descricao TEXT NOT NULL,
        prioridade TEXT NOT NULL,
        data_criacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        id_usuario INTEGER,
        FOREIGN KEY(id_usuario) REFERENCES usuarios(id)
    )
    ''')

    conn.commit()
    conn.close()

# Cadastrar usuário
def cadastrar_usuario(email, senha, tipo_usuario):
    senha_hash = generate_password_hash(senha)
    conn = sqlite3.connect('portal_chamados.db')
    c = conn.cursor()
    try:
        c.execute('INSERT INTO usuarios (email, senha, tipo_usuario) VALUES (?, ?, ?)',
                  (email, senha_hash, tipo_usuario))
        conn.commit()
        return True
    except sqlite3.IntegrityError:
        return False
    finally:
        conn.close()

# Validar login
def validar_login(email, senha):
    conn = sqlite3.connect('portal_chamados.db')
    c = conn.cursor()
    c.execute('SELECT id, senha, tipo_usuario FROM usuarios WHERE email = ?', (email,))
    user = c.fetchone()
    conn.close()
    if user and check_password_hash(user[1], senha):
        return {'id': user[0], 'tipo_usuario': user[2]}
    return None

# Registrar chamado
def criar_chamado(titulo, descricao, prioridade, id_usuario):
    conn = sqlite3.connect('portal_chamados.db')
    c = conn.cursor()
    c.execute('INSERT INTO chamados (titulo, descricao, prioridade, id_usuario) VALUES (?, ?, ?, ?)',
              (titulo, descricao, prioridade, id_usuario))
    conn.commit()
    conn.close()
    
    
    
    

    
    
    
    

# Exemplo uso
if __name__ == "__main__":
    init_db()
    # cadastrar_usuario('teste@email.com', '123456', 3)
    # print(validar_login('teste@email.com', '123456'))
    # criar_chamado('Teste', 'Descrição teste', 'vermelho', 1)




