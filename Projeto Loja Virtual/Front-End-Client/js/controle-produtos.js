/*


*/

/*
=================================================================================================
 Fix Me:

 Todo:
 
=================================================================================================
*/ 

/*
===========================================================
 Função: Consulta e Armazena principais elementos do Modal
===========================================================
*/

let acessorDoModal = new Modal({
    id: document.getElementById("id"),
    foto: document.getElementById("foto"),
    nome: document.getElementById("nome"),
    valor: document.getElementById("valor"),
    qtdEstoque: document.getElementById("qtdEstoque"),
    especificacao: document.getElementById("especificacao"),
    dataCadastro: document.getElementById("dataCadastro"),
    btnSalvar: document.getElementById("btn-salvar"),
    btnCancelar: document.getElementById("btn-cancelar"),
    BootstrapModal: (new bootstrap.Modal(document.getElementById("modal-produtos"))),
})

let btnAdicionar = document.getElementById("btn-adicionar");

let produtos = new Produtos({
    tabela: document.querySelector("table>tbody")
});

/*
==============================================================
Função: Carrega Tabela de Produtos
==============================================================
*/

produtos.consultarProdutos();

/*
==============================================================
Função: Habilita Botão(Adicionar+) Abrir Modal
==============================================================
*/

btnAdicionar.addEventListener("click",()=>{

    acessorDoModal.BootstrapModal.show();
})

/*
==============================================================
Função: Habilita Fechar Modal e Limpa Dados Escritos no Modal
==============================================================
*/

acessorDoModal.btnCancelar.addEventListener("click", ()=>{
    acessorDoModal.limparModalProdutos();

    acessorDoModal.BootstrapModal.toggle();
});

/*
==============================================================
Função: Salva Informações do Modal
==============================================================
*/
acessorDoModal.btnSalvar.addEventListener("click", ()=>{

    let produto = acessorDoModal.obterProdutosDoModal();

    if(!acessorDoModal.validar()){
        alert("Nome e Quantidade no Estoque são Obrigatórios.");
        return;
    }

    produtos.adicionarProdutoNoBackEnd(produto);

    acessorDoModal.limparModalProdutos();

    acessorDoModal.BootstrapModal.hide();
})
