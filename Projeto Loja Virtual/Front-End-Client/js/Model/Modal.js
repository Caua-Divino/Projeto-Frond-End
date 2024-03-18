




class Modal{
    constructor(obj){
        obj = obj || {};
        this.id = obj.id;
        this.foto = obj.foto;
        this.nome = obj.nome;
        this.valor = obj.valor;
        this.qtdEstoque = obj.qtdEstoque;
        this.especificacao = obj.especificacao;
        this.dataCadastro = obj.dataCadastro;
        this.btnSalvar = obj.btnSalvar;
        this.btnCancelar = obj.btnCancelar;
        this.BootstrapModal = obj.BootstrapModal;
    }

    obterProdutosDoModal(){
        return {
            id: this.id.value,
            foto: this.foto.value,
            nome: this.nome.value,
            valor: this.valor.value,
            qtdEstoque: this.qtdEstoque.value,
            especificacao: this.especificacao.value,
            dataCadastro: this.dataCadastro.value
        }
    }

    validar(){
        return !!(this.nome.value && this.qtdEstoque.value);
    }

    limparModalProdutos(){
        this.id.value = "";
        this.foto.value = "";
        this.nome.value = "";
        this.valor.value = "";
        this.qtdEstoque.value = "";
        this.especificacao.value = "";
        this.dataCadastro.value = "";
    };
}