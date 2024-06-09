document.addEventListener("DOMContentLoaded", () => {
    const formLogin = document.getElementById("form-login");
    const formDados = document.getElementById("form-dados");

    if (formLogin) {
        formLogin.addEventListener("submit", (e) => {
            e.preventDefault();
            const usuario = document.getElementById("usuario").value;
            const senha = document.getElementById("senha").value;
            if (usuario && senha) {
                localStorage.setItem("usuario", usuario);
                window.location.href = "usuario.html";
            } else {
                alert("Por favor, preencha todos os campos.");
            }
        });
    }

    if (formDados) {
        formDados.addEventListener("submit", (e) => {
            e.preventDefault();
            const nome = document.getElementById("nome").value;
            const idade = document.getElementById("idade").value;
            const vacinas = document.getElementById("vacinas").value;
            const dadosUsuario = { nome, idade, vacinas };
            localStorage.setItem("dadosUsuario", JSON.stringify(dadosUsuario));
            exibirDadosUsuario();
        });

        exibirDadosUsuario();
    }

    function exibirDadosUsuario() {
        const dadosUsuario = JSON.parse(localStorage.getItem("dadosUsuario"));
        if (dadosUsuario) {
            document.getElementById("nome").value = dadosUsuario.nome;
            document.getElementById("idade").value = dadosUsuario.idade;
            document.getElementById("vacinas").value = dadosUsuario.vacinas;
            document.getElementById("info-vacinas").innerText = `Olá, ${dadosUsuario.nome}. Você tem ${dadosUsuario.idade} anos e ainda precisa tomar as seguintes vacinas: ${dadosUsuario.vacinas}.`;
        }
    }
});