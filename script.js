// Select DOM elements
const quizContainer = document.getElementById('quiz');
const resultsContainer = document.getElementById('results');
const nextButton = document.createElement('button');
nextButton.id = 'next-btn';
nextButton.textContent = 'Next';
nextButton.style.marginLeft = '20px';
nextButton.style.padding = '10px 20px';
nextButton.addEventListener('click', handleNextButton);

let currentQuestionIndex = 0;
let score = 0;
let correctAnswersCount = 0;  // To keep track of correct answers
let selectedAnswer = null;

const quizQuestions = [
    {
        question: "What is the capital of France?",
        answers: {
            a: "Paris",
            b: "London",
            c: "Berlin"
        },
        correctAnswer: "a"
    },
    {
        question: "Which language is primarily used for web development?",
        answers: {
            a: "Java",
            b: "Python",
            c: "JavaScript"
        },
        correctAnswer: "c"
    },
    {
        question: "What is the smallest unit of data in a computer?",
        answers: {
            a: "Bit",
            b: "Byte",
            c: "Kilobyte"
        },
        correctAnswer: "a"
    }
];

function showQuestion() {
    selectedAnswer = null;

    const currentQuestion = quizQuestions[currentQuestionIndex];
    const answers = Object.keys(currentQuestion.answers).map((letter) => ` 
        <div class="answer-option" data-value="${letter}" style="width: 500px; background-color: white; border-radius: 10px; cursor: pointer;">
            <span class="option-label" style="margin-right: 20px; background-color: #EDE8E3; padding: 10px; border-radius: 50%; display: flex; justify-content: center; align-items: center; width: 40px; height: 40px;">${letter}</span> 
            ${currentQuestion.answers[letter]}
        </div>
    `).join(''); 

    quizContainer.innerHTML = `
        <div class="quiz-content" style="display: flex; flex-direction: column; align-items: center; justify-content: center; height: 100vh;">
            <div class="question">${currentQuestion.question}</div>
            <div class="answers">${answers}</div>
            <div class="progress-container" style="display: flex; align-items: center; justify-content: center; width: 100%; margin-top: 20px;">
                <div class="progress-bar" style="width: 220px; background-color: #ddd; height: 20px; border-radius: 10px; overflow: hidden;">
                    <div class="progress" style="height: 100%; background-color: green; width: ${(currentQuestionIndex + 1) / quizQuestions.length * 100}%"></div>
                </div>
            </div>
        </div>
    `;
    quizContainer.querySelector('.progress-container').appendChild(nextButton);

    const questionElement = document.querySelector(".question");
    if (questionElement) {
        questionElement.style.fontSize = "40px";
        questionElement.style.color = "#191D63";
        questionElement.style.fontFamily = "liter";
        questionElement.style.textAlign = "center";
    }

    const answersElement = document.querySelector(".answers");
    if (answersElement) {
        answersElement.style.fontSize = "30px";
        answersElement.style.color = "#444";
        answersElement.style.fontFamily = "liter";
        answersElement.style.marginTop = "15px"; 
    }

    document.querySelectorAll(".answer-option").forEach(option => {
        option.style.display = "flex";
        option.style.alignItems = "center";
        option.style.margin = "10px 0";
        option.style.padding = "10px";
        option.style.border = "1px solid #ccc";
        option.style.borderRadius = "10px";
        option.style.gap = "20px";
        option.style.pointerEvents = "auto"; 

        option.addEventListener('click', function () {
            if (selectedAnswer !== null) return;

            selectedAnswer = option.getAttribute('data-value');
            const correctAnswer = quizQuestions[currentQuestionIndex].correctAnswer;

            document.querySelectorAll('.answer-option').forEach(opt => {
                opt.style.pointerEvents = 'none';
            });

            if (selectedAnswer === correctAnswer) {
                option.style.backgroundColor = "#c8e6c9";
                option.querySelector('.option-label').textContent = "✔";
                correctAnswersCount++; 
            } else {
                option.style.backgroundColor = "#ffcdd2";
                option.querySelector('.option-label').textContent = "✖";

                const correctOption = document.querySelector(`.answer-option[data-value="${correctAnswer}"]`);
                if (correctOption) {
                    correctOption.style.backgroundColor = "#c8e6c9";
                    correctOption.querySelector('.option-label').textContent = "✔";
                }
            }
        });
    });

    // Add media queries for responsiveness
    const style = document.createElement('style');
    style.textContent = `
        @media (max-width: 768px) { /* Tablet screens */
            .quiz-content {
                padding: 0px;
                padding-top:30px;
            }
            .question {
                font-size: 30px !important;
            }
            .answers {
                font-size: 24px !important;
            }
            .answer-option {
                width: 100% !important;
                max-width: 400px;
            }
        }

        @media (max-width: 480px) { /* Mobile screens */
            .quiz-content {
                padding: 0px;
                padding-top:0px;
            }
            .question {
                font-size: 24px !important;
            }
            .answers {
                font-size: 20px !important;
            }
            .answer-option {
                width: 100% !important;
                max-width: 300px;
                padding: 8px !important;
            }
            .option-label {
                width: 30px !important;
                height: 30px !important;
                font-size: 16px !important;
            }
            #next-btn {
                padding: 8px 16px !important;
                font-size: 14px;
            }
        }
    `;
    document.head.appendChild(style);
}

function showResults() {
    quizContainer.innerHTML = '';

    const totalQuestions = quizQuestions.length;
    const totalMarks = totalQuestions * 10;
    const score = correctAnswersCount * 10; 

    resultsContainer.innerHTML = `
        <div style="text-align: center; font-size: 30px; font-family: 'Arial', sans-serif;">
            <img src="Layer 1.png" alt="Quiz Image" style="width: 300px; margin-bottom: 20px;">
            <p>You answered ${correctAnswersCount} out of ${totalQuestions} questions correctly!</p>
            <p>Your score is: ${score} out of ${totalMarks} marks.</p>
        </div>
    `;
}

function handleNextButton() {
    if (selectedAnswer === null) {
        alert("Please select an answer!");
        return;
    }

    const correctAnswer = quizQuestions[currentQuestionIndex].correctAnswer;

    if (selectedAnswer === correctAnswer) {
        score++;
    }

    currentQuestionIndex++;
    selectedAnswer = null; 
    if (currentQuestionIndex < quizQuestions.length) {
        showQuestion();
    } else {
        showResults();
    }
}

showQuestion();