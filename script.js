const form = document.getElementById('chamadoForm');
const container = document.getElementById('chamadoContainer');

form.addEventListener('submit', (e) => {
  e.preventDefault();

  const titulo = document.getElementById('titulo').value;
  const descricao = document.getElementById('descricao').value;
  const prioridade = document.getElementById('prioridade').value;

  const chamado = document.createElement('div');
  chamado.className = `chamado ${prioridade}`;
  chamado.innerHTML = `<h2>${titulo}</h2><p>${descricao}</p>`;

  container.prepend(chamado);
  form.reset();
});
