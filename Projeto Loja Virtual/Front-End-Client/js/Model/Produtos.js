
const URL = "http://localhost:3400/produtos"

class Produtos {
    constructor(obj){
        obj = obj || {};
        this.tabela = obj.tabela;
        this.listaProdutos = [];
    }

    consultarProdutos(){
        let gestorTokens = new GerenciadorDeToken();

        fetch(URL, {
            method: "GET",
            headers: { 
                "Authorization" : gestorTokens.obterToken()
            }
        })
        .then(response => response.json())

        .then(produtos => {
           this.listaProdutos = produtos;
           this.popularTabela(produtos);
        })
        .catch((erro) => {});
    
    }

    popularTabela(produtos){
        this.tabela.textContent = "";

        produtos.forEach(produtos => {
            this.criarLinhaNaTabela(produtos);
        });

    }

    criarLinhaNaTabela(produto){
        let tr = document.createElement("tr");
    
        let tdId = document.createElement("td");
        let tdFoto = document.createElement("td");
        let tdNome = document.createElement("td");
        let tdValor = document.createElement("td");
        let tdQtdEstoque = document.createElement("td");
        let tdEspecificacao = document.createElement("td");
        let tdDataCadastro = document.createElement("td");
        let tdAcoes = document.createElement("td");
    
        tdId.textContent = produto.id;
        tdFoto.textContent = produto.foto;
        tdNome.textContent = produto.nome;
        tdValor.textContent = produto.valor;
        tdQtdEstoque.textContent = produto.quantidadeEstoque;
        tdEspecificacao.textContent = produto.observacao;
        tdDataCadastro.textContent = new Date(produto.dataCadastro).toLocaleDateString();
        tdAcoes.innerHTML =
        `<button onclick="produtos.editarProdutosPorID(${produto.id})" class="btn btn-outline-primary btn-sm mr-3">
            Editar
        </button>
        <button onclick="produtos.excluirProdutosPorID(${produto.id})" class="btn btn-outline-primary btn-sm mr-3">
            Excluir
        </button>
        `
        tr.appendChild(tdId);
        tr.appendChild(tdFoto);
        tr.appendChild(tdNome);
        tr.appendChild(tdValor);
        tr.appendChild(tdQtdEstoque);
        tr.appendChild(tdEspecificacao);
        tr.appendChild(tdDataCadastro);
        tr.appendChild(tdAcoes);
    
        this.tabela.appendChild(tr);
    }

    editarProdutosPorID(id){
        alert("Editar Produtos!");
    }

    excluirProdutosPorID(id){
        let produtos = this.listaProdutos.find(produtos => produtos.id == id);

    if(confirm(`Deseja realmente excluir esse produto: ${produtos.nome} ?`)){
            this.excluirClientesNoBackEnd(id);
        }
    }

    excluirClientesNoBackEnd(id){

        //let gestorToken = new GerenciadorDeToken();

        fetch(`${URL}/${id}`,{
            method: "DELETE",
            Authorization: localStorage.getItem("token"),
        })
        .then(() =>{
            this.removerProdutoDaLista(id);
            this.popularTabela(this.listaProdutos);
        })
        
    }

    removerProdutoDaLista(id){

        let indice = this.listaProdutos.findIndex(produtos => produtos.id == id);
        this.listaProdutos.splice(indice, 1)
    }
    
    adicionarProdutoNoBackEnd(produto)
    {
        let produtoAptadoParaBackEnd = {
            id: produto.id,
            nome: produto.nome,
            foto: produto.foto,
            valor: produto.valor,
            quantidadeEstoque: produto.qtdEstoque,
            observacao: produto.especificacao,
            dataCadastro: produto.dataCadastro
        }

        let gestorTokens = new GerenciadorDeToken();

        fetch(URL,{
            method: "POST",
            headers: {
                Authorization: gestorTokens.obterToken(),
                "Content-Type": "application/json"
            },
            body: JSON.stringify(produtoAptadoParaBackEnd)
        })
        .then(response => response.json())
        .then(response => {

            // Adapta Do Modelo Back-End para Do Front
            let novoProduto = {
                id: response.id,
                nome: response.nome,
                foto: response.foto,
                valor: response.valor,
                observacao: response.observacao,
                quantidadeEstoque: response.quantidadeEstoque,
                dataCadastro: response.dataCadastro
            }
            
            this.listaProdutos.push(novoProduto);

            this.popularTabela(this.listaProdutos);
    
            alert(`Produto ${produto.nome} foi cadastrado com sucesso!`);
        })
    }
    
}

