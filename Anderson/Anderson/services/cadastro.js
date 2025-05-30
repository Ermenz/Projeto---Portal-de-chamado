const salvar = document.getElementById("btn_save");
const regex = /\S+@\S+\.\S+/;



salvar.addEventListener("click", ()=> {
    
    const nome = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const senha = document.getElementById("password").value;
    const confirmaSenha = document.getElementById("confirm_password").value;
    const adm = document.getElementById("adm");
    const tec = document.getElementById("tec");
    
    if (!nome || !email || !senha || !confirmaSenha) {
      return alert("Por favor, preencha todos os campos!");
    }
   
    if (senha != confirmaSenha) {
      return alert("As senhas não coincidem!");
    }

    if (!regex.test(email)) {
      return alert("Por favor, preencha um email válido");
    }

    function existeRadioMarcado(nomeDoGrupo) {
        const radioButtons = document.querySelectorAll(`input[type="radio"][name="${nomeDoGrupo}"]`);
        
        
    
      
        for (const radioButton of radioButtons) {
          if (radioButton.checked) {
            
            if (radioButton === adm) {
                return "Administrador";
            }
            if( radioButton === tec) {
                return "Técnico";
            }
          }
        }
        return null;
      }
      
      cargo = existeRadioMarcado(("choice"));

      if (cargo === null) {
         alert("Por favor, escolha um cargo!");
      }else{

      window.location.href = "login.html";
      }

    });
    