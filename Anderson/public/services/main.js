btn_entrar = document.getElementById("btn_entrar");

btn_entrar.addEventListener("click", async ()=> {

    const inp_email = document.getElementById("inp_email").value;
    const inp_senha = document.getElementById("inp_senha").value;

    if(!inp_email || !inp_senha){
        alert("Email e senha são obrigatórios.");
        return;
    }

    const dados = {inp_email, inp_senha};

    try {
        const response = await fetch('/api/auth/login', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(dados)
        });

        const resultado = await response.json();

        if (response.ok){
            alert("Login bem sucedido!" + resultado.mensagem);
            
        }else{
            alert("Erro:" + resultado.mensagem);
        }


    } catch (error) {
        console.error("Erro ao realizar login:", error);
        alert("Erro ao realizar login");
    }
    
});