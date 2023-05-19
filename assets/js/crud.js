document.querySelector("#adicionar").addEventListener("click", cadastrar);
var modalCrear = new bootstrap.Modal(
  document.getElementById("exampleModal"),
  {}
);
var modalAtualizar = new bootstrap.Modal(
  document.getElementById("atualizarModal"),
  {}
);

let produtos = [];

window.addEventListener("load", () => {
  produtos = JSON.parse(localStorage.getItem("produtos")) || [
    {
      id: 1,
      nome: "Parafuso",
      descricao:
        "Parafuso Aglomerado Fenda Phillips Cabeça Chata 4 Bemfixa 4.5 X 50 Mm",
      preco: 7.6,
      departamento: "Materiais de Construção",
      imagem: "./assets/img/parafuso.png",
      estoque: 5000,
    },
    {
      id: 2,
      nome: "Cano PVC",
      descricao: "Tubo Pvc Soldável 25 Mm X 6 M - Tigre Tigre",
      preco: 23.9,
      departamento: "Materiais de Construção",
      imagem: "./assets/img/pvc.png",
      estoque: 1200,
    },
    {
      id: 3,
      nome: " Tijolos",
      descricao: "Tijolo Baiano 11,5x14x24",
      preco: 0.8,
      departamento: "Materiais de Construção",
      imagem: "./assets/img/tijolo.png",
      estoque: 5000,
    },
    {
      id: 4,
      nome: "Cimento",
      descricao: "Cimento Votoran CP II E-32 50kg",
      preco: 29.9,
      departamento: "Materiais de Construção",
      imagem: "./assets/img/cimento.png",
      estoque: 5000,
    },
  ];
  atualizar();
});

document.querySelector("#home").addEventListener("click", () => {
  document.querySelector("#card").innerHTML = "";
  produtos.forEach((produto) => {
    document.querySelector("#card").innerHTML += criaCard(produto);
  });
});
document.querySelector("#busca").addEventListener("keyup", () => {
  let busca = document.querySelector("#busca").value;
  let filtro = produtos.filter((produto) => {
    return produto.nome.toLowerCase().includes(busca.toLowerCase());
  });
  filtrar(filtro);
});

document.querySelector("#filtroFerragens").addEventListener("click", () => {
  let filtro = produtos.filter((produto) => {
    return produto.departamento == "Ferragens";
  });
  filtrar(filtro);
});

document.querySelector("#filtroRevestimento").addEventListener("click", () => {
  let filtro = produtos.filter((produto) => {
    return produto.departamento == "Revestimento";
  });
  filtrar(filtro);
});

document
  .querySelector("#filtroMateriaisdeConstrucao")
  .addEventListener("click", () => {
    let filtro = produtos.filter((produto) => {
      return produto.departamento == "Materiais de Construção";
    });
    filtrar(filtro);
  });

document
  .querySelector("#filtroMateriaisHidraulicos")
  .addEventListener("click", () => {
    let filtro = produtos.filter((produto) => {
      return produto.departamento == "Materiais Hidráulicos";
    });
    filtrar(filtro);
  });

document.querySelector("#filtroIluminacao").addEventListener("click", () => {
  let filtro = produtos.filter((produto) => {
    return produto.departamento == "Iluminação";
  });
  filtrar(filtro);
});

document.querySelector("#filtroFerramentas").addEventListener("click", () => {
  let filtro = produtos.filter((produto) => {
    return produto.departamento == "Ferramentas";
  });
  filtrar(filtro);
});

document
  .querySelector("#filtroPinturaseAcessorios")
  .addEventListener("click", () => {
    let filtro = produtos.filter((produto) => {
      return produto.departamento == "Pinturas e Acessorios";
    });
    filtrar(filtro);
  });

document.querySelector("#filtroPrecoMenor").addEventListener("click", () => {
  let filtro = produtos.sort((a, b) => {
    return a.preco - b.preco;
  });
  filtrar(filtro);
});
document.querySelector("#filtroPrecoMaior").addEventListener("click", () => {
  let filtro = produtos.sort((a, b) => {
    return b.preco - a.preco;
  });
  filtrar(filtro);
});

function filtrar(filtro) {
  document.querySelector("#card").innerHTML = "";
  filtro.forEach((produto) => {
    document.querySelector("#card").innerHTML += criaCard(produto);
  });
}

function editar(id) {
  const produto = produtos.find((produto) => produto.id == id);
  modalAtualizar.show();
  document.querySelector("#nomeA").value = produto.nome;
  document.querySelector("#descricaoA").value = produto.descricao;
  document.querySelector("#precoA").value = produto.preco;
  document.querySelector("#imagemA").value = produto.imagem;
  document.querySelector("#estoqueA").value = produto.estoque;
  document.querySelector("#departamentoA").value = produto.departamento;
  document.querySelector("#salvar").addEventListener("click", () => {
    produto.nome = document.querySelector("#nomeA").value;
    produto.descricao = document.querySelector("#descricaoA").value;
    produto.preco = document.querySelector("#precoA").value;
    produto.imagem = document.querySelector("#imagemA").value;
    produto.estoque = document.querySelector("#estoqueA").value;
    produto.departamento = document.querySelector("#departamentoA").value;
    atualizar();
    modalAtualizar.hide();
  });
}

function atualizar() {
  localStorage.setItem("produtos", JSON.stringify(produtos));
  document.querySelector("#card").innerHTML = "";
  produtos.forEach((produto) => {
    document.querySelector("#card").innerHTML += criaCard(produto);
  });
}

function cadastrar() {
  const nome = document.querySelector("#nome").value;
  const descricao = document.querySelector("#descricao").value;
  const preco = document.querySelector("#preco").value;
  const imagem = document.querySelector("#imagem").value;
  const estoque = document.querySelector("#estoque").value;
  const departamento = document.querySelector("#departamento").value;
  const produto = {
    id: Date.now(),
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

  produtos.push(produto);
  atualizar();

  modalCrear.hide();
  document.querySelector("#nome").value = "";
  document.querySelector("#descricao").value = "";
  document.querySelector("#preco").value = "";
  document.querySelector("#imagem").value = "";
  document.querySelector("#estoque").value = "";
  document.querySelector("#nome").classList.remove("is-valid");
  document.querySelector("#descricao").classList.remove("is-valid");
  document.querySelector("#preco").classList.remove("is-valid");
  document.querySelector("#imagem").classList.remove("is-valid");
  document.querySelector("#estoque").classList.remove("is-valid");
}
function validarImagem() {
  const imagem = document.querySelector("#imagem");
  const regex = /(http(s?):)([/|.|\w|\s|-])*\.(?:jpe?g|gif|png)/g;
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
function apagar(id) {
  produtos = produtos.filter((produto) => produto.id != id);
  atualizar();
}
function criaCard(produto) {
  return `
        <div class="col-lg-3 col-md-6 col-12 mt-3">
          <div class="card">
            <img
              src="${produto.imagem}"
              class="card-img-top"
              alt="..."
              style="height: 280px"
            />
            <div style="height: 170px" class="card-body">
              <h5 class="card-title">${produto.nome}</h5>
              <p class="card-text">
                ${produto.descricao}
              </p>
              
            </div>
            <ul class="list-group list-group-flush">
              <li class="list-group-item">Preço: R$${produto.preco}</li>
              <li class="list-group-item">Estoque: ${produto.estoque} unidades</li>
              <li class="list-group-item"> <p>
              <span class="badge text-bg-info">${produto.departamento}</span>
            </p></li>
            </ul>
            <div class="card-body">
              <a onClick="editar(${produto.id})" href="#" class="btn btn-success" title="Editar produto">
                <i class="bi bi-pencil-fill"></i>
              </a>
              <a onClick="apagar(${produto.id})" href="#" class="btn btn-danger" title="Deletar produto">
                <i class="bi bi-trash"></i>
              </a>
            </div>
          </div>
        </div>
      `;
}
