document.getElementById("chamadoForm").addEventListener("submit", function(e) {
    e.preventDefault();

    const titulo = document.getElementById("titulo").value;
    const descricao = document.getElementById("descricao").value;
    const prioridade = document.getElementById("prioridade").value;

    const chamado = {
        titulo,
        descricao,
        prioridade,
        dataAbertura: new Date(),
    };

    adicionarChamadoAoContainer(chamado);

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

    container.appendChild(divChamado);
}

// Função única para atualizar todos os tempos a cada segundo
setInterval(() => {
    document.querySelectorAll(".tempo").forEach(tempoElement => {
        const inicio = new Date(tempoElement.dataset.inicio);
        const agora = new Date();
        let diff = Math.floor((agora - inicio) / 1000); // diferença em segundos

        const dias = Math.floor(diff / 86400);
        diff %= 86400;
        const horas = Math.floor(diff / 3600);
        diff %= 3600;
        const minutos = Math.floor(diff / 60);
        const segundos = diff % 60;

        let tempoString = '';
        if (dias > 0) tempoString += `${dias}d `;
        if (horas > 0 || tempoString) tempoString += `${horas}h `;
        if (minutos > 0 || tempoString) tempoString += `${minutos}m `;
        tempoString += `${segundos}s`;

        tempoElement.innerText = tempoString;
    });
}, 1000);
