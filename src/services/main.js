btn_entrar = document.getElementById("btn_entrar");
inp_email = document.getElementById("inp_email");
inp_senha = document.getElementById("inp_senha");

btn_entrar.addEventListener("click", function() {
    // Verifica se o campo de email está vazio
    if (inp_email.value.trim() === "") {
        alert("Por favor, insira seu email.");
        return;
    }

    // Verifica se o campo de senha está vazio
    if (inp_senha.value.trim() === "") {
        alert("Por favor, insira sua senha.");
        return;
    }

    // Se ambos os campos estiverem preenchidos, você pode prosseguir com a lógica de login
   
    window.location.href = "home.html"; 
});