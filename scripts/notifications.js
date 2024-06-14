document.addEventListener("DOMContentLoaded", () => {
    const dadosUsuario = JSON.parse(localStorage.getItem("dadosUsuario"));

    if (dadosUsuario && dadosUsuario.vacinasTomadas) {
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

        const vacinasPendentes = vacinasBrasil.filter(vacina => !dadosUsuario.vacinasTomadas.includes(vacina.nome));

        if (vacinasPendentes.length > 0) {
            alert("Você possui vacinas pendentes! Por favor, verifique sua lista de vacinas.");
        }
    }
});
