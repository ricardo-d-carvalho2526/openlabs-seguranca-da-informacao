document.addEventListener("DOMContentLoaded", () => {
    const startGameBtn = document.getElementById("start-game");
    const scenarioContainer = document.getElementById("scenario-container");

    const scenarios = [
        {
            id: "phishing_email",
            title: "E-mail de Phishing Suspeito",
            description: "Você recebe um e-mail que parece ser do \"Suporte de TI\" da Open Labs, solicitando que você clique em um link para \"verificar sua conta\" devido a uma \"atividade incomum\".",
            options: [
                { text: "A) Clicar no link e inserir suas credenciais.", correct: false, feedback: "Incorreto! Clicar em links suspeitos e inserir credenciais pode levar ao roubo de informações. Sempre verifique a autenticidade do remetente." },
                { text: "B) Encaminhar o e-mail para o departamento de segurança da Open Labs e depois excluí-lo.", correct: true, feedback: "Correto! Reportar e-mails suspeitos ajuda a proteger a todos na Open Labs. Você ganha a insígnia \"Caçador de Phishing\"!" },
                { text: "C) Ignorar o e-mail e marcá-lo como lixo eletrônico.", correct: false, feedback: "Incorreto! Ignorar pode ser uma opção, mas reportar é crucial para alertar a equipe de segurança sobre a ameaça." }
            ]
        },
        {
            id: "social_engineering_call",
            title: "Chamada de Engenharia Social",
            description: "Você recebe uma ligação de alguém que se identifica como técnico de suporte de um fornecedor externo, solicitando suas credenciais de acesso para \"resolver um problema urgente\" em seu computador.",
            options: [
                { text: "A) Fornecer as informações solicitadas para ajudar a resolver o problema rapidamente.", correct: false, feedback: "Incorreto! Nunca forneça suas credenciais por telefone, mesmo que a pessoa pareça legítima. Isso é um ataque de engenharia social." },
                { text: "B) Dizer que irá verificar internamente e desligar, depois reportar a ligação ao departamento de segurança da Open Labs.", correct: true, feedback: "Correto! Você agiu com cautela e reportou uma tentativa de engenharia social. Você ganha a insígnia \"Guardião da Informação\"!" },
                { text: "C) Pedir para a pessoa ligar para o seu supervisor para confirmar a solicitação.", correct: false, feedback: "Incorreto! Embora seja melhor do que dar a informação, ainda é arriscado. O ideal é não dar nenhuma informação e que você reporte a tentativa de engenharia social." }
            ]
        },
        {
            id: "weak_password",
            title: "Criação de Senha Fraca",
            description: "Você precisa criar uma nova senha para um sistema interno. O sistema aceita senhas curtas e simples.",
            options: [
                { text: "A) Usar 'senha123' para facilitar a memorização.", correct: false, feedback: "Incorreto! Senhas simples são facilmente descobertas. Use senhas complexas e únicas." },
                { text: "B) Usar uma combinação de letras maiúsculas e minúsculas, números e símbolos, com pelo menos 12 caracteres.", correct: true, feedback: "Correto! Senhas fortes protegem suas contas. Você ganha a insígnia \"Mestre das Senhas\"!" },
                { text: "C) Reutilizar uma senha antiga que você usa em outros sites.", correct: false, feedback: "Incorreto! Reutilizar senhas é um grande risco. Se uma for comprometida, todas as suas contas estarão em perigo." }
            ]
        },
        {
            id: "public_wifi",
            title: "Uso de Wi-Fi Público",
            description: "Você está em um café e precisa acessar o e-mail da empresa para uma tarefa urgente. Há uma rede Wi-Fi pública disponível.",
            options: [
                { text: "A) Conectar-se ao Wi-Fi público e acessar o e-mail da empresa diretamente.", correct: false, feedback: "Incorreto! Redes Wi-Fi públicas são inseguras e podem ser monitoradas. Evite acessar informações sensíveis." },
                { text: "B) Usar a rede de dados móveis do seu celular ou uma VPN para acessar o e-mail da empresa.", correct: true, feedback: "Correto! Usar uma conexão segura ou VPN protege seus dados em redes públicas. Você ganha a insígnia \"Navegador Seguro\"!" },
                { text: "C) Acessar o e-mail, mas evitar clicar em links ou baixar anexos.", correct: false, feedback: "Incorreto! Mesmo sem clicar em links, seus dados podem ser interceptados em uma rede insegura." }
            ]
        },
        {
            id: "suspicious_usb",
            title: "USB Desconhecido",
            description: "Você encontra um pendrive desconhecido no estacionamento da empresa. Ele não tem nenhuma identificação.",
            options: [
                { text: "A) Conectar o pendrive ao seu computador de trabalho para ver o que contém.", correct: false, feedback: "Incorreto! Pendrives desconhecidos podem conter malware. Nunca os conecte a dispositivos da empresa." },
                { text: "B) Entregar o pendrive ao departamento de TI ou segurança da informação.", correct: true, feedback: "Correto! Reportar dispositivos desconhecidos ajuda a proteger a rede da empresa. Você ganha a insígnia \"Guardião do Hardware\"!" },
                { text: "C) Jogar o pendrive no lixo para evitar problemas.", correct: false, feedback: "Incorreto! Embora evite problemas para você, o pendrive ainda pode ser encontrado por outra pessoa e causar danos." }
            ]
        },
        {
            id: "data_sharing",
            title: "Compartilhamento de Dados Confidenciais",
            description: "Um colega de outro departamento pede para você enviar uma planilha com dados de clientes confidenciais por e-mail pessoal, pois ele está trabalhando de casa e não tem acesso à rede da empresa.",
            options: [
                { text: "A) Enviar a planilha por e-mail pessoal, pois o colega precisa dos dados para trabalhar.", correct: false, feedback: "Incorreto! Dados confidenciais nunca devem ser compartilhados por canais não seguros. Use apenas os canais oficiais da empresa." },
                { text: "B) Informar ao colega que você não pode compartilhar dados confidenciais por e-mail pessoal e sugerir que ele use os canais seguros da empresa.", correct: true, feedback: "Correto! Proteger dados confidenciais é fundamental. Você ganha a insígnia \"Defensor da Privacidade\"!" },
                { text: "C) Enviar a planilha, mas com uma senha para proteger o arquivo.", correct: false, feedback: "Incorreto! A senha pode ser interceptada, e o canal ainda é inseguro para dados confidenciais." }
            ]
        },
        {
            id: "software_installation",
            title: "Instalação de Software Não Autorizado",
            description: "Você encontra um software gratuito na internet que promete aumentar sua produtividade. Ele não é da lista de softwares aprovados pela empresa.",
            options: [
                { text: "A) Baixar e instalar o software, pois ele é gratuito e pode ajudar no trabalho.", correct: false, feedback: "Incorreto! Softwares não autorizados podem conter vulnerabilidades ou malware. Sempre use softwares aprovados pela empresa." },
                { text: "B) Consultar o departamento de TI para verificar se o software pode ser instalado ou se há uma alternativa aprovada.", correct: true, feedback: "Correto! Consultar o TI garante que você use apenas softwares seguros e compatíveis. Você ganha a insígnia \"Usuário Consciente\"!" },
                { text: "C) Instalar o software em seu computador pessoal e usá-lo para tarefas do trabalho.", correct: false, feedback: "Incorreto! Usar computadores pessoais para tarefas do trabalho com softwares não autorizados pode expor dados da empresa." }
            ]
        },
        {
            id: "physical_security",
            title: "Segurança Física no Escritório",
            description: "Você está saindo para o almoço e vê um colega deixando seu computador desbloqueado na mesa.",
            options: [
                { text: "A) Ignorar, pois o colega voltará em breve.", correct: false, feedback: "Incorreto! Um computador desbloqueado é uma porta aberta para acessos não autorizados. Sempre bloqueie sua tela ao se ausentar." },
                { text: "B) Bloquear o computador do colega e avisá-lo sobre a importância da segurança física.", correct: true, feedback: "Correto! Você agiu proativamente para proteger os ativos da empresa. Você ganha a insígnia \"Guardião Físico\"!" },
                { text: "C) Deixar um bilhete engraçado na tela do computador do colega.", correct: false, feedback: "Incorreto! Embora possa ser divertido, não resolve o problema de segurança e pode ser visto por pessoas não autorizadas." }
            ]
        },
        {
            id: "data_backup",
            title: "Backup de Dados Importantes",
            description: "Você está trabalhando em um documento muito importante para um projeto e percebe que não fez backup dele há algum tempo.",
            options: [
                { text: "A) Continuar trabalhando e fazer o backup depois, quando tiver mais tempo.", correct: false, feedback: "Incorreto! A perda de dados pode ocorrer a qualquer momento. Faça backups regularmente para evitar a perda de informações críticas." },
                { text: "B) Salvar o documento e fazer o backup imediatamente em um local seguro, conforme as políticas da empresa.", correct: true, feedback: "Correto! Backups regulares são essenciais para a recuperação de dados. Você ganha a insígnia \"Previsor de Desastres\"!" },
                { text: "C) Salvar o documento em um pendrive pessoal para ter uma cópia rápida.", correct: false, feedback: "Incorreto! Pendrives pessoais podem ser perdidos ou danificados, e não seguem as políticas de backup da empresa." }
            ]
        },
        {
            id: "suspicious_website",
            title: "Navegação em Site Suspeito",
            description: "Você recebe um link de um amigo por mensagem instantânea para um site que promete descontos incríveis em produtos de tecnologia, mas o endereço parece um pouco estranho.",
            options: [
                { text: "A) Clicar no link para verificar os descontos, pois seu amigo enviou.", correct: false, feedback: "Incorreto! Sites suspeitos podem ser armadilhas de phishing ou conter malware. Sempre verifique a URL antes de clicar." },
                { text: "B) Ignorar o link e avisar seu amigo sobre a possibilidade de ser um site malicioso.", correct: true, feedback: "Correto! Você agiu com cautela e ajudou a proteger seu amigo. Você ganha a insígnia \"Navegador Cauteloso\"!" },
                { text: "C) Acessar o site usando uma aba anônima para maior segurança.", correct: false, feedback: "Incorreto! A aba anônima não protege contra sites maliciosos, apenas impede o armazenamento de histórico e cookies no seu navegador." }
            ]
        }
    ];

    let currentScenarioIndex = 0;
    let score = 0;
    const totalScenarios = scenarios.length;
    const passingScore = 7; // Pontuação mínima para aprovação

    function loadScenario(scenario) {
        scenarioContainer.innerHTML = `
            <h2>${scenario.title}</h2>
            <p>${scenario.description}</p>
            <div class=\"options\">
                ${scenario.options.map((option, index) => `<button data-index=\"${index}\">${option.text}</button>`).join("")}
            </div>
            <div id=\"feedback-message\"></div>
        `;

        scenarioContainer.querySelectorAll(".options button").forEach(button => {
            button.addEventListener("click", (event) => {
                const chosenOptionIndex = event.target.dataset.index;
                const chosenOption = scenario.options[chosenOptionIndex];
                
                if (chosenOption.correct) {
                    score++;
                }

                displayFeedback(chosenOption.feedback, chosenOption.correct);
                
                setTimeout(() => {
                    currentScenarioIndex++;
                    if (currentScenarioIndex < totalScenarios) {
                        loadScenario(scenarios[currentScenarioIndex]);
                    } else {
                        endGame();
                    }
                }, 3000); 
            });
        });
    }

    function displayFeedback(message, isCorrect) {
        const feedbackDiv = document.getElementById("feedback-message");
        feedbackDiv.textContent = message;
        feedbackDiv.style.color = isCorrect ? "green" : "red";
    }

    function endGame() {
        let finalMessage = `<h2>Fim do Jogo!</h2><p>Você completou todos os cenários. Sua pontuação final é: ${score} de ${totalScenarios}.</p>`;
        let documentationLink = "";

        if (score >= passingScore) {
            finalMessage += `<p>Parabéns! Você foi aprovado e demonstrou um excelente conhecimento em segurança da informação.</p>`;
            documentationLink = `<p>Continue aprimorando seus conhecimentos: <a href=\"#\">Documentação Avançada de Segurança da Informação - Open Labs</a></p>`;
        } else {
            finalMessage += `<p>Não se preocupe! Você não atingiu a pontuação de aprovação. Segurança da informação é um aprendizado contínuo. Revise os conceitos e tente novamente.</p>`;
            documentationLink = `<p>Recursos de apoio: <a href=\"#\">Treinamento Básico de Conscientização em Segurança - Open Labs</a></p>`;
        }

        scenarioContainer.innerHTML = finalMessage + documentationLink;
        startGameBtn.style.display = "block";
        startGameBtn.textContent = "Jogar Novamente";
        currentScenarioIndex = 0;
        score = 0; // Reset score for new game
    }

    startGameBtn.addEventListener("click", () => {
        startGameBtn.style.display = "none";
        loadScenario(scenarios[currentScenarioIndex]);
    });
});

