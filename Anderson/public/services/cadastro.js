const salvar = document.getElementById("btn_save");
const regex = /\S+@\S+\.\S+/;



salvar.addEventListener("click", async ()=> {
    
    const nome = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const senha = document.getElementById("password").value;
    const confirmaSenha = document.getElementById("confirm_password").value;
    const tipo = document.getElementById("adm").checked ? "administrador" : (document.getElementById("tec").checked ? "tecnico" : "");
    
    if (!nome || !email || !senha || !confirmaSenha || !tipo) {
      return alert("Todos os campos devem ser preenchidos!");
    }
   
    if (senha != confirmaSenha) {
      return alert("As senhas não coincidem!");
    }

    if (!regex.test(email)) {
      return alert("Por favor, preencha um email válido");
    }

    const dados = {nome, email, senha, tipo};
      
    try {
      const response = await fetch("/api/auth/cadastro", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(dados)
      });

      const resultado = await response.json();

      if (response.ok) {
          alert(resultado.mensagem);
      } else {
          alert(resultado.mensagem);
      }

  } catch (error) {
      console.error("Erro ao cadastrar:", error);
      alert("Erro no servidor.");
  }

      
});
    