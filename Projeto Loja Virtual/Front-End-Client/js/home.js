
const URL = "http://localhost:3400/clientes";

let btnLogin = document.querySelector("#btn-login");

let btnControleDeProdutos = document.querySelector("#btn-controle-produtos");
let btnControleDeClientes = document.querySelector("#btn-controle-clientes");

let ControleDeProdutosRedirecionamento = "";

btnLogin.addEventListener("click",()=>{
    window.open("login.html","_self");
})

document.addEventListener("DOMContentLoaded", ()=>{

    let gestorDeToken = new GerenciadorDeToken();

   if(!!gestorDeToken.obterToken()){
        
        btnControleDeClientes.style.display = "block";
        btnControleDeProdutos.style.display = "block";

        ControleDeProdutosRedirecionamento = "controle-produtos.html";
        btnControleDeProdutos.disabled = false;
   }
})

btnControleDeProdutos.addEventListener("click",()=>{
    window.open(ControleDeProdutosRedirecionamento,"_self");
})




