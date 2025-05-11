document.getElementById("chamadoForm").addEventListener("submit", function(e) {
    e.preventDefault();
  
  
    const titulo = document.getElementById("titulo").value;
    const descricao = document.getElementById("descricao").value;
    const prioridade = document.getElementById("prioridade").value;
  

    const chamado = {
      titulo,
      descricao,
      prioridade,
      dataAbertura: new Date(), // Data atual como data de abertura
    };
  
   
    adicionarChamadoAoContainer(chamado);
  
    // Limpando o formulário
    document.getElementById("titulo").value = '';
    document.getElementById("descricao").value = '';
    document.getElementById("prioridade").value = '';
  });
  
  function adicionarChamadoAoContainer(chamado) {
    const container = document.getElementById("chamadoContainer");
  

    const divChamado = document.createElement("div");
    divChamado.classList.add("chamado", chamado.prioridade);
  

    divChamado.innerHTML = `
      <h2>${chamado.titulo}</h2>
      <p>${chamado.descricao}</p>
      <p>Tempo de Abertura: <span class="tempo" data-inicio="${chamado.dataAbertura.toISOString()}">0s</span></p>
    `;
  
    // Adicionando o chamado ao container
    container.appendChild(divChamado);
  
    // Atualizando o tempo a cada segundo
    atualizarTempo(chamado);
  }
  
  function atualizarTempo(chamado) {
    const tempoElement = document.querySelector(`.tempo[data-inicio="${chamado.dataAbertura.toISOString()}"]`);
  
    setInterval(() => {
      const tempoAtual = new Date();
      const tempoAberto = tempoAtual - new Date(chamado.dataAbertura); // Tempo em milissegundos
      
      // Cálculo de tempo
      const segundos = Math.floor(tempoAberto / 1000);
      const minutos = Math.floor(segundos / 60);
      const horas = Math.floor(minutos / 60);
      const dias = Math.floor(horas / 24);
  
    
      let tempoString = `${segundos}s`;  // Default é em segundos
      if (minutos >= 1) tempoString = `${minutos}m`;
      if (horas >= 1) tempoString = `${horas}h`;
      if (dias >= 1) tempoString = `${dias}d`;
  
      tempoElement.innerText = tempoString;
    }, 1000); 
  }
  