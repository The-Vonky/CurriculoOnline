// Atualização de campos básicos
function atualizarCampo(idInput, idPreview, isLink=false) {
    document.getElementById(idInput).addEventListener("input", e => {
        if(isLink) {
            document.getElementById(idPreview).href = e.target.value;
            document.getElementById(idPreview).textContent = e.target.value || "linkedin.com";
        } else {
            document.getElementById(idPreview).textContent = e.target.value;
        }
    });
}

atualizarCampo("nome", "previewNome");
atualizarCampo("cargo", "previewCargo");
atualizarCampo("email", "previewEmail");
atualizarCampo("telefone", "previewTelefone");
atualizarCampo("dataNascimento", "previewDataNascimento");
atualizarCampo("linkedin", "previewLinkedin", true);
atualizarCampo("resumo", "previewResumo");

// Upload de foto
document.getElementById("foto").addEventListener("change", e => {
    const file = e.target.files[0];
    if(file) {
        const reader = new FileReader();
        reader.onload = ev => {
            document.getElementById("previewFoto").src = ev.target.result;
        };
        reader.readAsDataURL(file);
    }
});

// Adicionar Experiência
function adicionarExperiencia() {
    const id = Date.now();
    const div = document.createElement("div");
    div.innerHTML = `
        <input type="text" placeholder="Empresa" oninput="atualizarExperiencias()" data-exp="empresa-${id}">
        <input type="text" placeholder="Cargo" oninput="atualizarExperiencias()" data-exp="cargo-${id}">
        <input type="text" placeholder="Período" oninput="atualizarExperiencias()" data-exp="periodo-${id}">
        <textarea placeholder="Atividades (separadas por vírgula)" oninput="atualizarExperiencias()" data-exp="atividades-${id}"></textarea>
        <hr>
    `;
    document.getElementById("experiencias").appendChild(div);
}

function atualizarExperiencias() {
    const container = document.getElementById("previewExperiencias");
    container.innerHTML = "";
    const experiencias = document.querySelectorAll("[data-exp^='empresa-']");
    experiencias.forEach((empresaInput, index) => {
        const empresa = empresaInput.value;
        const cargo = document.querySelectorAll("[data-exp^='cargo-']")[index].value;
        const periodo = document.querySelectorAll("[data-exp^='periodo-']")[index].value;
        const atividades = document.querySelectorAll("[data-exp^='atividades-']")[index].value.split(",");

        if(empresa.trim() !== "") {
            let html = `<div class="empresa">
                <h3>Empresa: ${empresa}</h3>
                <p><strong>Cargo:</strong> ${cargo}</p>
                <p><strong>Período:</strong> ${periodo}</p>
                <p><strong>Atividades:</strong></p>
                <ul>${atividades.map(a => `<li>${a.trim()}</li>`).join("")}</ul>
            </div>`;
            container.innerHTML += html;
        }
    });
}

// Adicionar Habilidade
function adicionarHabilidade() {
    const input = document.createElement("input");
    input.type = "text";
    input.placeholder = "Habilidade";
    input.oninput = atualizarHabilidades;
    document.getElementById("habilidades").appendChild(input);
}

function atualizarHabilidades() {
    const lista = document.getElementById("previewHabilidades");
    lista.innerHTML = "";
    document.querySelectorAll("#habilidades input").forEach(inp => {
        if(inp.value.trim() !== "") {
            lista.innerHTML += `<li>${inp.value}</li>`;
        }
    });
}

// Adicionar Educação
function adicionarEducacao() {
    const id = Date.now();
    const div = document.createElement("div");
    div.innerHTML = `
        <input type="text" placeholder="Curso" oninput="atualizarEducacao()" data-edu="curso-${id}">
        <input type="text" placeholder="Instituição" oninput="atualizarEducacao()" data-edu="instituicao-${id}">
        <input type="text" placeholder="Período" oninput="atualizarEducacao()" data-edu="periodo-${id}">
        <hr>
    `;
    document.getElementById("educacao").appendChild(div);
}

function atualizarEducacao() {
    const container = document.getElementById("previewEducacao");
    container.innerHTML = "";
    const cursos = document.querySelectorAll("[data-edu^='curso-']");
    cursos.forEach((cursoInput, index) => {
        const curso = cursoInput.value;
        const instituicao = document.querySelectorAll("[data-edu^='instituicao-']")[index].value;
        const periodo = document.querySelectorAll("[data-edu^='periodo-']")[index].value;

        if(curso.trim() !== "") {
            container.innerHTML += `
                <div class="educacao-1">
                    <h3>${curso}</h3>
                    <p><strong>Instituição:</strong> ${instituicao}</p>
                    <p><strong>Período:</strong> ${periodo}</p>
                </div>
            `;
        }
    });
}

// Baixar PDF
document.getElementById("btnPDF").addEventListener("click", () => {
    const curriculo = document.getElementById("curriculo");
    const opt = {
        margin: 0.5,
        filename: 'curriculo.pdf',
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 2 },
        jsPDF: { unit: 'in', format: 'a4', orientation: 'portrait' }
    };
    html2pdf().set(opt).from(curriculo).save();
});