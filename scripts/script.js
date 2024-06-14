// Script para a página de login
document.addEventListener("DOMContentLoaded", () => {
    const formLogin = document.getElementById("form-login");

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
});

// Script para a página do usuário
document.addEventListener("DOMContentLoaded", () => {
    const formDados = document.getElementById("form-dados");
    const vacinasInput = document.getElementById("vacinas-input");
    const sugestoesVacinas = document.getElementById("sugestoes-vacinas");
    const vacinasSelecionadas = document.getElementById("vacinas-selecionadas");
    const formPopup = document.getElementById("form-popup");
    const editarInfoBtn = document.getElementById("editar-info");
    const closePopupBtn = document.getElementById("close-popup");

    const vacinasBrasil = [
        { nome: "BCG", idade: "Ao nascer", paraQueServe: "Protege contra formas graves de tuberculose." },
        { nome: "Hepatite B", idade: "Ao nascer, 1 e 6 meses", paraQueServe: "Protege contra a hepatite B." },
        { nome: "Poliomielite (VIP e VOP)", idade: "2, 4, 6, 15 meses, e 4 anos", paraQueServe: "Protege contra a poliomielite." },
        { nome: "Penta (DTP + Hib + Hepatite B)", idade: "2, 4, 6 meses", paraQueServe: "Protege contra difteria, tétano, coqueluche, Haemophilus influenzae tipo b e hepatite B." },
        { nome: "Rotavírus", idade: "2, 4 meses", paraQueServe: "Protege contra rotavírus, que causa diarreia grave em crianças." },
        { nome: "Pneumocócica", idade: "2, 4, 6 meses, e reforço com 12 meses", paraQueServe: "Protege contra doenças pneumocócicas, como pneumonia, meningite e otite." },
        { nome: "Meningocócica C", idade: "3, 5 meses, e reforço com 12 meses", paraQueServe: "Protege contra a meningite meningocócica do tipo C." },
        { nome: "Febre Amarela", idade: "9 meses e 4 anos", paraQueServe: "Protege contra a febre amarela." },
        { nome: "Tríplice Viral (Sarampo, Caxumba e Rubéola)", idade: "12 meses e 15 meses", paraQueServe: "Protege contra sarampo, caxumba e rubéola." },
        { nome: "Tetra Viral (Sarampo, Caxumba, Rubéola e Varicela)", idade: "15 meses", paraQueServe: "Protege contra sarampo, caxumba, rubéola e varicela." },
        { nome: "Varicela", idade: "15 meses", paraQueServe: "Protege contra varicela (catapora)." },
        { nome: "Hepatite A", idade: "15 meses", paraQueServe: "Protege contra a hepatite A." },
        { nome: "DTP", idade: "4 anos", paraQueServe: "Protege contra difteria, tétano e coqueluche." },
        { nome: "HPV", idade: "Meninas: 9 a 14 anos, Meninos: 11 a 14 anos", paraQueServe: "Protege contra o papilomavírus humano (HPV), que pode causar câncer." }
    ];

    if (formDados) {
        vacinasInput.addEventListener("input", () => {
            const filtro = vacinasInput.value.toLowerCase();
            sugestoesVacinas.innerHTML = "";
            if (filtro) {
                const vacinasFiltradas = vacinasBrasil.filter(v => v.nome.toLowerCase().includes(filtro));
                vacinasFiltradas.forEach(vacina => {
                    const li = document.createElement("li");
                    li.innerText = vacina.nome;
                    li.addEventListener("click", () => {
                        adicionarVacina(vacina);
                        vacinasInput.value = "";
                        sugestoesVacinas.innerHTML = "";
                    });
                    sugestoesVacinas.appendChild(li);
                });
            }
        });

        formDados.addEventListener("submit", (e) => {
            e.preventDefault();
            const nome = document.getElementById("nome").value;
            const idade = document.getElementById("idade").value;
            const email = document.getElementById("email").value;
            const vacinasTomadas = Array.from(vacinasSelecionadas.children).map(vacinaTag => vacinaTag.dataset.vacina);
            const dadosUsuario = { nome, idade, email, vacinasTomadas };
            localStorage.setItem("dadosUsuario", JSON.stringify(dadosUsuario));
            exibirDadosUsuario();
            enviarEmailVacinasPendentes(dadosUsuario);
            formPopup.style.display = "none";
        });

        exibirDadosUsuario();
    }

    function adicionarVacina(vacina) {
        if (!Array.from(vacinasSelecionadas.children).some(vacinaTag => vacinaTag.dataset.vacina === vacina.nome)) {
            const vacinaTag = document.createElement("div");
            vacinaTag.className = "vacina-tag";
            vacinaTag.dataset.vacina = vacina.nome;
            vacinaTag.innerHTML = `${vacina.nome} <button type="button" onclick="removerVacina('${vacina.nome}')">&times;</button>`;
            vacinasSelecionadas.appendChild(vacinaTag);
        }
    }

    window.removerVacina = (nomeVacina) => {
        const vacinaTag = Array.from(vacinasSelecionadas.children).find(vacinaTag => vacinaTag.dataset.vacina === nomeVacina);
        if (vacinaTag) {
            vacinasSelecionadas.removeChild(vacinaTag);
        }
    };

    window.mostrarDetalhes = (nomeVacina) => {
        const vacinaTag = Array.from(document.querySelectorAll("li")).find(li => li.dataset.vacina === nomeVacina);
        if (vacinaTag) {
            let detalhes = vacinaTag.querySelector(".vacina-detalhes");
            if (detalhes) {
                detalhes.style.display = detalhes.style.display === 'none' ? 'block' : 'none';
            } else {
                const vacina = vacinasBrasil.find(v => v.nome === nomeVacina);
                detalhes = document.createElement("div");
                detalhes.className = "vacina-detalhes";
                detalhes.innerHTML = `<div class="vacina-header">
                                        <span class="vacina-nome">${vacina.nome}</span>
                                        <img src="imagens/info.png" class="info-icon" onclick="mostrarDetalhes('${vacina.nome}')">
                                      </div>
                                      <strong>Nome:</strong> ${vacina.nome}<br>
                                      <strong>Idade Recomendada:</strong> ${vacina.idade}<br>
                                      <strong>Para que serve:</strong> ${vacina.paraQueServe}`;
                detalhes.style.display = 'block';
                vacinaTag.appendChild(detalhes);
            }
        }
    };

    function exibirDadosUsuario() {
        const dadosUsuario = JSON.parse(localStorage.getItem("dadosUsuario"));
        if (dadosUsuario) {
            document.getElementById("nome-usuario").innerText = dadosUsuario.nome;
            document.getElementById("idade-usuario").innerText = dadosUsuario.idade;
            document.getElementById("email-usuario").innerText = dadosUsuario.email;
            vacinasSelecionadas.innerHTML = "";
            dadosUsuario.vacinasTomadas.forEach(nomeVacina => {
                const vacina = vacinasBrasil.find(v => v.nome === nomeVacina);
                adicionarVacina(vacina);
            });

            const listaTomadas = document.getElementById("lista-vacinas-tomadas");
            listaTomadas.innerHTML = "";
            dadosUsuario.vacinasTomadas.forEach(vacina => {
                const li = document.createElement("li");
                const detalhes = vacinasBrasil.find(v => v.nome === vacina);
                li.dataset.vacina = detalhes.nome;
                li.innerHTML = `<span class="vacina-nome">${detalhes.nome}</span> <img src="imagens/info.png" class="info-icon" onclick="mostrarDetalhes('${detalhes.nome}')">
                                <div class="vacina-detalhes">
                                  <strong>Nome:</strong> ${detalhes.nome}<br>
                                  <strong>Idade Recomendada:</strong> ${detalhes.idade}<br>
                                  <strong>Para que serve:</strong> ${detalhes.paraQueServe}
                                </div>`;
                listaTomadas.appendChild(li);
            });

            const listaPendentes = document.getElementById("lista-vacinas-pendentes");
            listaPendentes.innerHTML = "";
            vacinasBrasil.forEach(vacina => {
                if (!dadosUsuario.vacinasTomadas.includes(vacina.nome)) {
                    const li = document.createElement("li");
                    li.dataset.vacina = vacina.nome;
                    li.innerHTML = `<span class="vacina-nome">${vacina.nome}</span> <img src="imagens/info.png" class="info-icon" onclick="mostrarDetalhes('${vacina.nome}')">
                                    <div class="vacina-detalhes">
                                      <strong>Nome:</strong> ${vacina.nome}<br>
                                      <strong>Idade Recomendada:</strong> ${vacina.idade}<br>
                                      <strong>Para que serve:</strong> ${vacina.paraQueServe}
                                    </div>`;
                    listaPendentes.appendChild(li);
                }
            });
        }
    }

    editarInfoBtn.addEventListener("click", () => {
        formPopup.style.display = "block";
    });

    closePopupBtn.addEventListener("click", () => {
        formPopup.style.display = "none";
    });

    window.onclick = function(event) {
        if (event.target == formPopup) {
            formPopup.style.display = "none";
        }
    };
});

// Script para a página de index
document.addEventListener("DOMContentLoaded", () => {
    const listaPendentes = document.getElementById("lista-vacinas-pendentes");
    const vacinasBrasil = [
        { nome: "BCG", idade: "Ao nascer", paraQueServe: "Protege contra formas graves de tuberculose." },
        { nome: "Hepatite B", idade: "Ao nascer, 1 e 6 meses", paraQueServe: "Protege contra a hepatite B." },
        { nome: "Poliomielite (VIP e VOP)", idade: "2, 4, 6, 15 meses, e 4 anos", paraQueServe: "Protege contra a poliomielite." },
        { nome: "Penta (DTP + Hib + Hepatite B)", idade: "2, 4, 6 meses", paraQueServe: "Protege contra difteria, tétano, coqueluche, Haemophilus influenzae tipo b e hepatite B." },
        { nome: "Rotavírus", idade: "2, 4 meses", paraQueServe: "Protege contra rotavírus, que causa diarreia grave em crianças." },
        { nome: "Pneumocócica", idade: "2, 4, 6 meses, e reforço com 12 meses", paraQueServe: "Protege contra doenças pneumocócicas, como pneumonia, meningite e otite." },
        { nome: "Meningocócica C", idade: "3, 5 meses, e reforço com 12 meses", paraQueServe: "Protege contra a meningite meningocócica do tipo C." },
        { nome: "Febre Amarela", idade: "9 meses e 4 anos", paraQueServe: "Protege contra a febre amarela." },
        { nome: "Tríplice Viral (Sarampo, Caxumba e Rubéola)", idade: "12 meses e 15 meses", paraQueServe: "Protege contra sarampo, caxumba e rubéola." },
        { nome: "Tetra Viral (Sarampo, Caxumba, Rubéola e Varicela)", idade: "15 meses", paraQueServe: "Protege contra sarampo, caxumba, rubéola e varicela." },
        { nome: "Varicela", idade: "15 meses", paraQueServe: "Protege contra varicela (catapora)." },
        { nome: "Hepatite A", idade: "15 meses", paraQueServe: "Protege contra a hepatite A." },
        { nome: "DTP", idade: "4 anos", paraQueServe: "Protege contra difteria, tétano e coqueluche." },
        { nome: "HPV", idade: "Meninas: 9 a 14 anos, Meninos: 11 a 14 anos", paraQueServe: "Protege contra o papilomavírus humano (HPV), que pode causar câncer." }
    ];

    const dadosUsuario = JSON.parse(localStorage.getItem("dadosUsuario"));

    if (dadosUsuario && dadosUsuario.vacinasTomadas) {
        const vacinasPendentes = vacinasBrasil.filter(vacina => !dadosUsuario.vacinasTomadas.includes(vacina.nome));
        
        vacinasPendentes.forEach(vacina => {
            const li = document.createElement("li");
            li.dataset.vacina = vacina.nome;
            li.innerHTML = `<span class="vacina-nome">${vacina.nome}</span> <img src="imagens/info.png" class="info-icon" onclick="mostrarDetalhes('${vacina.nome}')">
                            <div class="vacina-detalhes">
                              <strong>Nome:</strong> ${vacina.nome}<br>
                              <strong>Idade Recomendada:</strong> ${vacina.idade}<br>
                              <strong>Para que serve:</strong> ${vacina.paraQueServe}
                            </div>`;
            listaPendentes.appendChild(li);
        });
    }
});

window.mostrarDetalhes = (nomeVacina) => {
    const vacinaTag = Array.from(document.querySelectorAll("li")).find(li => li.dataset.vacina === nomeVacina);
    if (vacinaTag) {
        let detalhes = vacinaTag.querySelector(".vacina-detalhes");
        if (detalhes) {
            detalhes.style.display = detalhes.style.display === 'none' ? 'block' : 'none';
        } else {
            const vacina = vacinasBrasil.find(v => v.nome === nomeVacina);
            detalhes = document.createElement("div");
            detalhes.className = "vacina-detalhes";
            detalhes.innerHTML = `<div class="vacina-header">
                                    <span class="vacina-nome">${vacina.nome}</span>
                                    <img src="imagens/info.png" class="info-icon" onclick="mostrarDetalhes('${vacina.nome}')">
                                  </div>
                                  <strong>Nome:</strong> ${vacina.nome}<br>
                                  <strong>Idade Recomendada:</strong> ${vacina.idade}<br>
                                  <strong>Para que serve:</strong> ${vacina.paraQueServe}`;
            detalhes.style.display = 'block';
            vacinaTag.appendChild(detalhes);
        }
    }
};
