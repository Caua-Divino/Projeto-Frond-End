/*

*/
const URL = "http://localhost:3400/login";

let campoEmail = document.querySelector("#email");
let campoSenha = document.querySelector("#senha");
let btnEntrar = document.querySelector("#btn-entrar");

btnEntrar.addEventListener("click", () => {

    let emailDigitado = campoEmail.value.toLowerCase();
    let senhaDigitada = campoSenha.value;

    autenticar(emailDigitado, senhaDigitada);
    
});

function autenticar(email, senha) {

    fetch(URL, {
        method : "POST",
        headers : {"Content-Type" : "application/json"},
        body : JSON.stringify({email, senha})
    })
    .then(response => response = response.json())

    .then(response => {
        console.log(response);

        if(!!response.mensagem)
        {
            alert(response.mensagem);
            return;
        }

        let gestorDeToken = new GerenciadorDeToken();
        let gestorDeUsuario = new GerenciadorDeUsuario();

        gestorDeToken.salvarToken(response.token);
        gestorDeUsuario.salvarUsuario(response.usuario);

        window.open("home.html", "_self");
    })

    .catch(error => {
        console.log(error);
    })
  
}
