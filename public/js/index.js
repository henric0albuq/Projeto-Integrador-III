if (localStorage.getItem("token") == null){
    alert ("Você precisa logar para acessar essa página");
    window.location.href = "/entrar";
}

let userLogado = JSON.parse(localStorage.getItem("userLogado"));

let logado = document.querySelector("#logado");
logado.innerHTML = `Olá ${userLogado.nome}`;

function sair (){
    localStorage.removeItem("Token");
    localStorage.removeItem("userLogado");
    window.location.href = "/entrar";
}
let btnSair = document.querySelector("#btnSair");
btnSair.addEventListener("click", () => {
    sair();
});
