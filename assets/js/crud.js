document.querySelector("#adicionar").addEventListener("click", cadastrar);

function cadastrar() {
  const nome = document.querySelector("#nome").value;
  const descricao = document.querySelector("#descricao").value;
  const preco = document.querySelector("#preco").value;
  const imagem = document.querySelector("#imagem").value;
  const estoque = document.querySelector("#estoque").value;
  const departamento = document.querySelector("#departamento").value;
  const modal = bootstrap.Modal.getInstance(
    document.querySelector("#exampleModal")
  );
  const produto = {
    nome,
    descricao,
    preco,
    departamento,
    imagem,
    estoque,
  };

  if (
    !validar(produto.nome, document.querySelector("#nome")) ||
    !validar(produto.descricao, document.querySelector("#descricao")) ||
    !validar(produto.preco, document.querySelector("#preco")) ||
    !validarImagem() ||
    !validar(produto.estoque, document.querySelector("#estoque"))
  ) {
    return;
  }
  document.querySelector("#card").innerHTML += criaCard(produto);

  modal.hide();
  document.querySelector("#nome").value = "";
  document.querySelector("#descricao").value = "";
  document.querySelector("#preco").value = "";
  document.querySelector("#imagem").value = "";
  document.querySelector("#estoque").value = "";
}
function validarImagem() {
  const imagem = document.querySelector("#imagem");
  const regex = /(http(s?):)([/|.|\w|\s|-])*\.(?:jpg|gif|png)/g;
  if (!regex.test(imagem.value)) {
    imagem.classList.add("is-invalid");
    imagem.classList.remove("is-valid");
    return false;
  }
  imagem.classList.remove("is-invalid");
  imagem.classList.add("is-valid");
  return true;
}
function validar(valor, campo) {
  if (valor === "") {
    campo.classList.add("is-invalid");
    campo.classList.remove("is-valid");
    return false;
  }
  campo.classList.remove("is-invalid");
  campo.classList.add("is-valid");
  return true;
}
function apagar(botao) {
  botao.parentNode.parentNode.parentNode.remove();
}
function criaCard(produto) {
  return `
        <div class="col-lg-3 col-md-6 col-12">
          <div class="card">
            <img
              src="${produto.imagem}"
              class="card-img-top"
              alt="..."
              style="height: 280px"
            />
            <div class="card-body">
              <h5 class="card-title">${produto.nome}</h5>
              <p class="card-text">
                ${produto.descricao}
              </p>
              <p>
                <span class="badge text-bg-info">${produto.departamento}</span>
              </p>
            </div>
            <ul class="list-group list-group-flush">
              <li class="list-group-item">Preço: R$${produto.preco}</li>
              <li class="list-group-item">Estoque: ${produto.estoque} unidades</li>
            </ul>
            <div class="card-body">
              <a href="#" class="btn btn-success" title="Editar produto">
                <i class="bi bi-pencil-fill"></i>
              </a>
              <a onClick="apagar(this)" href="#" class="btn btn-danger" title="Deletar produto">
                <i class="bi bi-trash"></i>
              </a>
            </div>
          </div>
        </div>
      `;
}
