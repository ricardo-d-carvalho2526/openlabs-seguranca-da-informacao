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
        }
    ];

    let currentScenarioIndex = 0;

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
                displayFeedback(chosenOption.feedback, chosenOption.correct);
                // Optionally move to next scenario or end game after feedback
                setTimeout(() => {
                    currentScenarioIndex++;
                    if (currentScenarioIndex < scenarios.length) {
                        loadScenario(scenarios[currentScenarioIndex]);
                    } else {
                        scenarioContainer.innerHTML = `<h2>Fim do Jogo!</h2><p>Você completou todos os cenários. Parabéns por suas decisões de segurança!</p>`;
                        startGameBtn.style.display = "block";
                        startGameBtn.textContent = "Jogar Novamente";
                        currentScenarioIndex = 0;
                    }
                }, 3000); // Wait 3 seconds before moving to next scenario or ending game
            });
        });
    }

    function displayFeedback(message, isCorrect) {
        const feedbackDiv = document.getElementById("feedback-message");
        feedbackDiv.textContent = message;
        feedbackDiv.style.color = isCorrect ? "green" : "red";
    }

    startGameBtn.addEventListener("click", () => {
        startGameBtn.style.display = "none";
        loadScenario(scenarios[currentScenarioIndex]);
    });
});

