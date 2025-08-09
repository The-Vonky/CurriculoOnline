def pegaDados():
    nome = input("Digite seu nome: ")
    cargo = input("Digite seu cargo: ")
    email = input("Digite seu e-mail: ")
    telefone = input("Digite seu telefone: ")
    dataNascimento = input("Digite sua data de nascimento: ")
    linkedin = input("Digite seu LinkedIn (URL): ")
    foto = input("Digite o link da sua foto de perfil: ")
    resumo = input("Digite um breve resumo sobre você: ")
 
    experiencias = []
    atividades = []
    habilidades = []
    educacao = []

    while (1):
        empresa = input("Digite o nome da empresa (ou 'parar' para finalizar): ")
        if empresa.lower() == 'parar':
            break
        cargoExperiencia = input(f"Digite o cargo que ocupou na {empresa}: ")
        periodo = input(f"Digite o período que trabalhou na {empresa} (ex: Jan 2023 - Dez 2024): ")

        while (1):
            atividade = input(f"Digite uma atividade realizada na {empresa} (ou 'parar' para finalizar as atividades): ")
            if atividade.lower() == 'parar':
                break

            atividades.append(atividade)
        experiencias.append((empresa, cargoExperiencia, periodo, atividades))
    
    while (1):
        habilidade = input("Digite uma habilidade (ou 'parar' para finalizar as habilidades): ")
        if habilidade.lower() == 'parar':
            break
        habilidades.append(habilidade)

    while (1):
        curso = input("Digite o curso (ou 'parar' para finalizar a educação): ")
        if curso.lower() == 'parar':
            break
        instituicao = input(f"Digite a instituição do curso {curso}: ")
        periodoEducacao = input(f"Digite o período (ex: 2023 - 2024): ")
        educacao.append((curso, instituicao, periodoEducacao))

    return {
        "nome": nome,
        "cargo": cargo,
        "email": email,
        "telefone": telefone,
        "dataNascimento": dataNascimento,
        "linkedin": linkedin,
        "foto": foto,
        "resumo": resumo,
        "experiencias": experiencias,
        "habilidades": habilidades,
        "educacao": educacao,
    }

#Segunda Função################################################################################

def geraHtml(dados):
    html_content = f'''<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Currículo {dados['nome']}</title>
    <link rel="stylesheet" href="Styles.css">
    <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap" rel="stylesheet">
</head>
<body>
    <div class="container">
        <header>
            <div class="perfil">
                <img src="{dados['foto']}" alt="Foto de perfil">
                <div class="dados">
                    <h1>{dados['nome']}</h1>
                    <h3>{dados['cargo']}</h3>
                    <p>Email: {dados['email']} | Telefone: {dados['telefone']}</p>
                    <p>Data de Nascimento: {dados['dataNascimento']}</p>
                    <p>LinkedIn: <a href="{dados['linkedin']}">{dados['linkedin']}</a></p>
                </div>
            </div>
        </header>
        <main>
            <section class="sumario">
                <h2>Resumo:</h2>
                <p>{dados['resumo']}</p>
            </section>
            <section class="xp">
                <h2>Experiência Profissional:</h2>'''
    for experiencia in dados['experiencias']:
        empresa, cargoExperiencia, periodo, atividades = experiencia
        html_content += f'''
                <div class="empresa">
                    <h3>Empresa: {empresa}</h3>
                    <p><strong>Cargo:</strong> {cargoExperiencia}</p>
                    <p><strong>Período:</strong> {periodo}</p>
                    <p><strong>Atividades:</strong></p>
                    <ul>'''
        for atividade in atividades:
            html_content += f'<li>{atividade}</li>'
        html_content += '</ul></div>'
    html_content += '''
            </section>
            <section class="habilidades">
                <h2>Habilidades:</h2>
                <ul>'''
    for habilidade in dados['habilidades']:
        html_content += f'<li>{habilidade}</li>'
    html_content += '''
                </ul>
            </section>
            <section class="educacao">
                <h2>Educação:</h2>'''
    for educacao in dados['educacao']:
        curso, instituicao, periodoEducacao = educacao
        html_content += f'''
                <div class="educacao-1">
                    <h3>{curso}</h3>
                    <p><strong>Instituição:</strong> {instituicao}</p>
                    <p><strong>Período:</strong> {periodoEducacao}</p>
                </div>'''
    html_content += '''
            </section>
        </main>
    </div>
</body>
</html>'''
    with open("curriculo.html", "w", encoding="utf-8") as file:
        file.write(html_content)

#Programa Principal###########################################################

dados = pegaDados()
geraHtml(dados)