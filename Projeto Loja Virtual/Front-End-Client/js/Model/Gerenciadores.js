

// Gerência Tokens
class GerenciadorDeToken{
    salvarToken(token){
        localStorage.setItem("token", token);
    }
    obterToken(){
        return localStorage.getItem("token");
    }
}

// Gerência Usuarios
class GerenciadorDeUsuario{
    salvarUsuario(usuario){
        localStorage.setItem("usuario", JSON.stringify(usuario));
    }

    obterUsuario(usuario){
        let usuarioStore = localStorage.getItem("usuario");
    
        return JSON.parse(usuarioStore);
    }

    desconectarUsuario(){
        localStorage.removeItem("token");
        localStorage.removeItem("usuario");
    
        window.open("login.html", "_self");
    }
}