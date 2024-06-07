const startButton = document.getElementById('start-btn');
const quizQuestions = document.getElementById('quiz-questions');
const questionElement = document.getElementById('question');
const choicesElement = document.getElementById('choices');
const nextButton = document.getElementById('next-btn');
const scoreElement = document.getElementById('score');

let currentQuestion = {};
let questionCounter = 0;
let availableQuestions = [];
let score = 0;

const MAX_QUESTIONS = 10;

// Fetch questions from API
function fetchQuestions(category) {
    fetch(`https://opentdb.com/api.php?amount=10&category=${category}&type=multiple`)
        .then(res => res.json())
        .then(loadedQuestions => {
            availableQuestions = loadedQuestions.results;
            startGame();
        })
        .catch(err => {
            console.error(err);
        });
}

// Start game
function startGame() {
    questionCounter = 0;
    score = 0;
    scoreElement.innerText = `Score: ${score}`;
    quizQuestions.classList.remove('hide');
    document.getElementById('category-selection').classList.add('hide');
    nextButton.classList.add('hide'); // Hide the next button initially
    getNewQuestion();
}

// Get a new question
function getNewQuestion() {
    if (questionCounter >= MAX_QUESTIONS) {
        return showResults();
    }

    const question = availableQuestions[questionCounter];
    currentQuestion = {
        question: question.question,
        choices: [...question.incorrect_answers, question.correct_answer].sort(() => Math.random() - 0.5)
    };

    questionElement.innerText = currentQuestion.question;
    choicesElement.innerHTML = '';
    currentQuestion.choices.forEach((choice, index) => {
        const choiceElement = document.createElement('button');
        choiceElement.innerText = choice;
        choiceElement.classList.add('btn', 'btn-outline-primary', 'choice');
        choiceElement.addEventListener('click', () => selectChoice(index));
        choicesElement.appendChild(choiceElement);
    });

    questionCounter++;
}

// Handle choice selection
function selectChoice(index) {
    const selectedAnswer = currentQuestion.choices[index];
    const classToApply = selectedAnswer === availableQuestions[questionCounter - 1].correct_answer ? 'correct' : 'incorrect';

    if (classToApply === 'correct') {
        score++;
        scoreElement.innerText = `Score: ${score}`;
    }

    document.querySelectorAll('.choice').forEach(choice => {
        choice.disabled = true;
        if (choice.innerText === availableQuestions[questionCounter - 1].correct_answer) {
            choice.classList.add('btn-success');
        } else {
            choice.classList.add('btn-danger');
        }
    });

    if (questionCounter < MAX_QUESTIONS) {
        nextButton.classList.remove('hide');
    } else {
        nextButton.innerText = 'Finish Quiz';
    }
}

// Show results
function showResults() {
    quizQuestions.innerHTML = `<h2>Quiz Completed!</h2><p>Your final score is: ${score} out of ${MAX_QUESTIONS}</p>`;
    
    const playAgainButton = document.createElement('button');
    playAgainButton.innerText = 'Play Again';
    playAgainButton.classList.add('btn', 'btn-primary');
    playAgainButton.addEventListener('click', () => {
        // Reset the quiz when the "Play Again" button is clicked
        startGame();
    });
    quizQuestions.appendChild(playAgainButton);

    nextButton.classList.add('hide');
}

// Event Listeners
startButton.addEventListener('click', () => {
    const selectedCategory = document.getElementById('category').value;
    fetchQuestions(selectedCategory);
});

nextButton.addEventListener('click', () => {
    if (questionCounter < MAX_QUESTIONS) {
        getNewQuestion();
        document.querySelectorAll('.choice').forEach(choice => {
            choice.classList.remove('btn-success', 'btn-danger');
            choice.disabled = false;
        });
        nextButton.classList.add('hide');
    } else {
        showResults();
    }
});
