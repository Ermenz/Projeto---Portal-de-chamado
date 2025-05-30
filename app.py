from flask import Flask, render_template, request, redirect, url_for, session, flash
import sqlite3
from werkzeug.security import generate_password_hash, check_password_hash
from database import init_db  # Função que cria as tabelas

app = Flask(__name__)
app.secret_key = 'sua_chave_secreta_aqui'

def get_db_connection():
    conn = sqlite3.connect('portal_chamados.db')
    conn.row_factory = sqlite3.Row
    return conn

init_db()

@app.route('/')
def login():
    return render_template('login.html')

@app.route('/login', methods=['POST'])
def login_post():
    email = request.form['email']
    senha = request.form['password']
    conn = get_db_connection()
    user = conn.execute('SELECT * FROM usuarios WHERE email = ?', (email,)).fetchone()
    conn.close()
    if user and check_password_hash(user['senha'], senha):
        session['user_id'] = user['id']
        session['email'] = user['email']
        return redirect(url_for('dashboard'))
    flash('Email ou senha incorretos')
    return redirect(url_for('login'))

@app.route('/cadastro')
def register():
    return render_template('cadastro.html')

@app.route('/register', methods=['POST'])
def register_post():
    email = request.form['email']
    senha = request.form['password']
    hashed_password = generate_password_hash(senha)
    conn = get_db_connection()
    try:
        conn.execute('INSERT INTO usuarios (email, senha, tipo_usuario) VALUES (?, ?, ?)',
                     (email, hashed_password, 3))
        conn.commit()
    except sqlite3.IntegrityError:
        flash('Email já cadastrado')
        conn.close()
        return redirect(url_for('register'))
    conn.close()
    flash('Usuário registrado com sucesso')
    return redirect(url_for('login'))

@app.route('/dashboard', methods=['GET', 'POST'])
def dashboard():
    if 'user_id' not in session:
        return redirect(url_for('login'))

    conn = get_db_connection()

    if request.method == 'POST':
        titulo = request.form['titulo']
        descricao = request.form['descricao']
        prioridade = request.form['prioridade']
        id_usuario = session['user_id']

        conn.execute('INSERT INTO chamados (titulo, descricao, prioridade, id_usuario) VALUES (?, ?, ?, ?)',
                     (titulo, descricao, prioridade, id_usuario))
        conn.commit()

    chamados = conn.execute('SELECT * FROM chamados WHERE id_usuario = ? ORDER BY data_criacao DESC',
                            (session['user_id'],)).fetchall()
    conn.close()

    return render_template('index.html', chamados=chamados, email=session['email'])

@app.route('/logout')
def logout():
    session.clear()
    return redirect(url_for('login'))

if __name__ == '__main__':
    app.run(debug=True)
