<script>
        // Calculadora de Peso Planetário
        const planetGravity = {
            mercury: 0.38,
            venus: 0.91,
            earth: 1.00,
            mars: 0.38,
            jupiter: 2.34,
            saturn: 1.06,
            uranus: 0.92,
            neptune: 1.19,
            pluto: 0.06,
            moon: 0.165
        };
        
        const planetNames = {
            mercury: "Mercúrio",
            venus: "Vênus",
            mars: "Marte",
            jupiter: "Júpiter",
            saturn: "Saturno",
            uranus: "Urano",
            neptune: "Netuno",
            pluto: "Plutão",
            moon: "Lua"
        };
        
        document.getElementById('calculate-weight').addEventListener('click', function() {
            const earthWeight = parseFloat(document.getElementById('earth-weight').value);
            const planet = document.getElementById('planet').value;
            
            if (isNaN(earthWeight)) {
                alert("Por favor, insira um peso válido");
                return;
            }
            
            const planetWeight = earthWeight * planetGravity[planet];
            const planetName = planetNames[planet];
            
            document.getElementById('planet-name').textContent = planetName;
            document.getElementById('calculated-weight').textContent = planetWeight.toFixed(2);
            document.getElementById('weight-result').style.display = 'block';
        });
        
        // Conversor de Moedas (usando valores fictícios para exemplo)
        const exchangeRates = {
            USD: { BRL: 5.20, EUR: 0.85, GBP: 0.75, JPY: 110.50 },
            BRL: { USD: 0.19, EUR: 0.16, GBP: 0.14, JPY: 21.25 },
            EUR: { USD: 1.18, BRL: 6.15, GBP: 0.88, JPY: 130.00 },
            GBP: { USD: 1.33, BRL: 6.95, EUR: 1.14, JPY: 147.50 },
            JPY: { USD: 0.009, BRL: 0.047, EUR: 0.0077, GBP: 0.0068 }
        };
        
        const currencyNames = {
            USD: "Dólares Americanos",
            BRL: "Reais Brasileiros",
            EUR: "Euros",
            GBP: "Libras Esterlinas",
            JPY: "Ienes Japoneses"
        };
        
        document.getElementById('convert-currency').addEventListener('click', function() {
            const amount = parseFloat(document.getElementById('amount').value);
            const fromCurrency = document.getElementById('from-currency').value;
            const toCurrency = document.getElementById('to-currency').value;
            
            if (isNaN(amount)) {
                alert("Por favor, insira um valor válido");
                return;
            }
            
            if (fromCurrency === toCurrency) {
                alert("Por favor, selecione moedas diferentes");
                return;
            }
            
            const rate = exchangeRates[fromCurrency][toCurrency];
            const convertedAmount = amount * rate;
            
            document.getElementById('original-amount').textContent = amount.toFixed(2);
            document.getElementById('from-currency-name').textContent = currencyNames[fromCurrency];
            document.getElementById('converted-amount').textContent = convertedAmount.toFixed(2);
            document.getElementById('to-currency-name').textContent = currencyNames[toCurrency];
            document.getElementById('currency-result').style.display = 'block';
        });
        
        // Jogo de Quebra-Cabeça
        const puzzlePieces = [1, 2, 3, 4, 5, 6, 7, 8, ''];
        let emptyIndex = 8;
        
        function renderPuzzle() {
            const puzzleBoard = document.getElementById('puzzle-board');
            puzzleBoard.innerHTML = '';
            
            puzzlePieces.forEach((piece, index) => {
                const pieceElement = document.createElement('div');
                pieceElement.className = piece === '' ? 'puzzle-piece empty' : 'puzzle-piece';
                pieceElement.textContent = piece;
                pieceElement.dataset.index = index;
                
                if (piece !== '') {
                    pieceElement.addEventListener('click', movePiece);
                }
                
                puzzleBoard.appendChild(pieceElement);
            });
            
            // Verificar se o quebra-cabeça foi resolvido
            if (isPuzzleSolved()) {
                document.getElementById('puzzle-message').textContent = 'Parabéns! Você resolveu o quebra-cabeça!';
                document.getElementById('puzzle-message').style.display = 'block';
            } else {
                document.getElementById('puzzle-message').style.display = 'none';
            }
        }
        
        function movePiece(e) {
            const clickedIndex = parseInt(e.target.dataset.index);
            const clickedRow = Math.floor(clickedIndex / 3);
            const clickedCol = clickedIndex % 3;
            const emptyRow = Math.floor(emptyIndex / 3);
            const emptyCol = emptyIndex % 3;
            
            // Verificar se a peça clicada está adjacente ao espaço vazio
            if ((Math.abs(clickedRow - emptyRow) === 1 && clickedCol === emptyCol) || 
                (Math.abs(clickedCol - emptyCol) === 1 && clickedRow === emptyRow)) {
                
                // Trocar as posições
                puzzlePieces[emptyIndex] = puzzlePieces[clickedIndex];
                puzzlePieces[clickedIndex] = '';
                emptyIndex = clickedIndex;
                
                renderPuzzle();
            }
        }
        
        function isPuzzleSolved() {
            for (let i = 0; i < puzzlePieces.length - 1; i++) {
                if (puzzlePieces[i] !== i + 1) {
                    return false;
                }
            }
            return puzzlePieces[8] === '';
        }
        
        function shufflePuzzle() {
            // Embaralhar as peças (garantindo que o quebra-cabeça seja solucionável)
            do {
                for (let i = puzzlePieces.length - 1; i > 0; i--) {
                    const j = Math.floor(Math.random() * (i + 1));
                    [puzzlePieces[i], puzzlePieces[j]] = [puzzlePieces[j], puzzlePieces[i]];
                    
                    if (puzzlePieces[i] === '') emptyIndex = i;
                    if (puzzlePieces[j] === '') emptyIndex = j;
                }
            } while (isPuzzleSolved() || !isSolvable());
            
            renderPuzzle();
        }
        
        function isSolvable() {
            let inversions = 0;
            for (let i = 0; i < puzzlePieces.length - 1; i++) {
                for (let j = i + 1; j < puzzlePieces.length; j++) {
                    if (puzzlePieces[i] && puzzlePieces[j] && puzzlePieces[i] > puzzlePieces[j]) {
                        inversions++;
                    }
                }
            }
            return inversions % 2 === 0;
        }
        
        document.getElementById('shuffle-puzzle').addEventListener('click', shufflePuzzle);
        
        // Quiz Interativo
        const quizQuestions = [
            {
                question: "Qual linguagem de programação foi criada por Brendan Eich?",
                options: ["Python", "Java", "JavaScript", "C++"],
                answer: 2
            },
            {
                question: "O que significa a sigla 'HTML'?",
                options: [
                    "Hyperlinks and Text Markup Language",
                    "Home Tool Markup Language",
                    "Hyper Text Markup Language",
                    "Hyper Text Making Links"
                ],
                answer: 2
            },
            {
                question: "Qual empresa desenvolveu o React?",
                options: ["Google", "Facebook", "Microsoft", "Apple"],
                answer: 1
            },
            {
                question: "Qual destes NÃO é um framework CSS?",
                options: ["Bootstrap", "Tailwind", "Sass", "Foundation"],
                answer: 2
            }
        ];
        
        let currentQuestion = 0;
        let userAnswers = [];
        
        function renderQuiz() {
            const quizContainer = document.getElementById('quiz-questions');
            quizContainer.innerHTML = '';
            
            quizQuestions.forEach((q, qIndex) => {
                const questionElement = document.createElement('div');
                questionElement.className = 'quiz-question ' + (qIndex > 0 ? 'hidden' : '');
                questionElement.dataset.index = qIndex;
                
                questionElement.innerHTML = `
                    <h3>${qIndex + 1}. ${q.question}</h3>
                    <div class="quiz-options">
                        ${q.options.map((opt, optIndex) => `
                            <div class="quiz-option" data-question="${qIndex}" data-option="${optIndex}">
                                ${opt}
                            </div>
                        `).join('')}
                    </div>
                `;
                
                quizContainer.appendChild(questionElement);
            });
            
            // Mostrar botão de submit apenas quando todas as perguntas forem respondidas
            document.getElementById('submit-quiz').style.display = 'none';
            document.getElementById('quiz-score').style.display = 'none';
            
            // Adicionar eventos às opções
            document.querySelectorAll('.quiz-option').forEach(option => {
                option.addEventListener('click', function() {
                    const questionIndex = parseInt(this.dataset.question);
                    const optionIndex = parseInt(this.dataset.option);
                    
                    userAnswers[questionIndex] = optionIndex;
                    
                    // Remover seleção de outras opções na mesma pergunta
                    document.querySelectorAll(`.quiz-option[data-question="${questionIndex}"]`).forEach(opt => {
                        opt.classList.remove('selected');
                    });
                    
                    // Adicionar classe selected à opção clicada
                    this.classList.add('selected');
                    
                    // Verificar se todas as perguntas foram respondidas
                    const allAnswered = userAnswers.length === quizQuestions.length && userAnswers.every(a => a !== undefined);
                    document.getElementById('submit-quiz').style.display = allAnswered ? 'block' : 'none';
                });
            });
        }
        
        function checkQuiz() {
            let correct = 0;
            
            quizQuestions.forEach((q, index) => {
                const questionElement = document.querySelector(`.quiz-question[data-index="${index}"]`);
                const options = questionElement.querySelectorAll('.quiz-option');
                
                options.forEach((opt, optIndex) => {
                    opt.classList.remove('correct', 'incorrect');
                    
                    if (optIndex === q.answer) {
                        opt.classList.add('correct');
                    } else if (userAnswers[index] === optIndex) {
                        opt.classList.add('incorrect');
                    }
                });
                
                if (userAnswers[index] === q.answer) {
                    correct++;
                }
            });
            
            document.getElementById('correct-answers').textContent = correct;
            document.getElementById('total-questions').textContent = quizQuestions.length;
            document.getElementById('quiz-score').style.display = 'block';
        }
        
        document.getElementById('submit-quiz').addEventListener('click', checkQuiz);
        
        // Inicializar todos os componentes
        renderPuzzle();
        renderQuiz();
        
        // Efeito de digitação para o título
        const title = document.querySelector('h1');
        const originalText = title.textContent;
        title.textContent = '';
        
        let i = 0;
        function typeWriter() {
            if (i < originalText.length) {
                title.textContent += originalText.charAt(i);
                i++;
                setTimeout(typeWriter, 100);
            }
        }
        
        setTimeout(typeWriter, 1000);
    </script>