const startButton = document.getElementById('start-btn');
const nextButton = document.getElementById('next-btn');
const questionContainerElement = document.getElementById('question-container');
const questionElement = document.getElementById('question');
const btn1 = document.getElementById('btn1');
const btn2 = document.getElementById('btn2');
const btn3 = document.getElementById('btn3');
const btn4 = document.getElementById('btn4');
const answerButtons = [btn1, btn2, btn3, btn4];
const timerElement = document.getElementById('timer');
const progressBar = document.getElementById('progress-bar');

let shuffledQuestions, currentQuestionIndex, score, timer, timeLeft;

startButton.addEventListener('click', startGame);
nextButton.addEventListener('click', () => {
  currentQuestionIndex++;
  setNextQuestion();
});

function startGame() {
  startButton.classList.add('hide');
  shuffledQuestions = questions.sort(() => Math.random() - 0.5);
  currentQuestionIndex = 0;
  score = 0;
  questionContainerElement.classList.remove('hide');
  setNextQuestion();
}

function setNextQuestion() {
  resetState();
  if (currentQuestionIndex < shuffledQuestions.length) {
    showQuestion(shuffledQuestions[currentQuestionIndex]);
    updateProgressBar();
    startTimer();
    changeBackground();
  } else {
    showScore();
  }
}

function showQuestion(question) {
  questionElement.innerText = question.question;
  let shuffledAnswers = question.answers.sort(() => Math.random() - 0.5);
  answerButtons.forEach((button, index) => {
    button.innerText = shuffledAnswers[index].text;
    button.classList.remove('correct', 'wrong');
    button.disabled = false;
    button.onclick = () => selectAnswer(button, shuffledAnswers[index].correct);
  });
}

function resetState() {
  answerButtons.forEach(button => {
    button.classList.remove('correct', 'wrong');
    button.disabled = false;
  });
  nextButton.classList.add('hide');
  clearInterval(timer);
}

function selectAnswer(selectedButton, isCorrect) {
  setStatusClass(selectedButton, isCorrect);
  if (isCorrect) score++;
  answerButtons.forEach(button => button.disabled = true);
  nextButton.classList.remove('hide');
}

function setStatusClass(element, correct) {
  clearStatusClass(element);
  if (correct) {
    element.classList.add('correct');
  } else {
    element.classList.add('wrong');
  }
}

function clearStatusClass(element) {
  element.classList.remove('correct');
  element.classList.remove('wrong');
}

function showScore() {
  questionElement.innerText = `🎉 You scored ${score}/${questions.length}!`;
  answerButtons.forEach(button => button.classList.add('hide'));
  nextButton.classList.add('hide');
  startButton.innerText = 'Restart Quiz';
  startButton.classList.remove('hide');
  progressBar.style.width = `100%`;
  clearInterval(timer);
  timerElement.innerText = '';
}

function startTimer() {
  clearInterval(timer);
  timeLeft = 10;
  timerElement.innerText = `Time left: ${timeLeft}s`;
  timer = setInterval(() => {
    timeLeft--;
    timerElement.innerText = `Time left: ${timeLeft}s`;
    if (timeLeft <= 0) {
      clearInterval(timer);
      answerButtons.forEach(button => button.disabled = true);
      nextButton.classList.remove('hide');
    }
  }, 1000);
}

function updateProgressBar() {
  let progress = ((currentQuestionIndex) / questions.length) * 100;
  progressBar.style.width = `${progress}%`;
}

function changeBackground() {
  const colors = ['#f2f6ff', '#d4ebf2', '#ffe5ec', '#e5f4dc', '#fff7d5', '#d6e4ff', '#e2f0cb', '#fce2db'];
  const randomColor = colors[Math.floor(Math.random() * colors.length)];
  document.body.style.background = randomColor;
}

// Your 10 Questions array (use your existing 10-question array here)
const questions = [
  {
    question: "Gateway of India is in which city?",
    answers: [
      { text: "Mumbai", correct: true },
      { text: "Pune", correct: false },
      { text: "Nagpur", correct: false },
      { text: "Indore", correct: false }
    ]
  },
  {
    question: "Meenakshi Temple is located in?",
    answers: [
      { text: "Madurai", correct: true },
      { text: "Chennai", correct: false },
      { text: "Tirunelveli", correct: false },
      { text: "Kanyakumari", correct: false }
    ]
  },
  {
    question: "Which city is known as the Pink City of India?",
    answers: [
      { text: "Jaipur", correct: true },
      { text: "Jodhpur", correct: false },
      { text: "Udaipur", correct: false },
      { text: "Surat", correct: false }
    ]
  },
  {
    question: "The Golden Temple is located in?",
    answers: [
      { text: "Amritsar", correct: true },
      { text: "Ludhiana", correct: false },
      { text: "Patiala", correct: false },
      { text: "Chandigarh", correct: false }
    ]
  },
  {
    question: "The Taj Mahal is situated in?",
    answers: [
      { text: "Agra", correct: true },
      { text: "Delhi", correct: false },
      { text: "Lucknow", correct: false },
      { text: "Jaipur", correct: false }
    ]
  },
  {
    question: "Charminar is located in?",
    answers: [
      { text: "Hyderabad", correct: true },
      { text: "Warangal", correct: false },
      { text: "Chennai", correct: false },
      { text: "Vijayawada", correct: false }
    ]
  },
  {
    question: "Where is the famous Jagannath Temple?",
    answers: [
      { text: "Puri", correct: true },
      { text: "Varanasi", correct: false },
      { text: "Patna", correct: false },
      { text: "Bhubaneswar", correct: false }
    ]
  },
  {
    question: "Which city is called the City of Lakes?",
    answers: [
      { text: "Udaipur", correct: true },
      { text: "Bhopal", correct: false },
      { text: "Jaisalmer", correct: false },
      { text: "Surat", correct: false }
    ]
  },
  {
    question: "Sun Temple is located at?",
    answers: [
      { text: "Konark", correct: true },
      { text: "Gaya", correct: false },
      { text: "Nashik", correct: false },
      { text: "Aurangabad", correct: false }
    ]
  },
  {
    question: "Which is India's highest motorable road destination?",
    answers: [
      { text: "Khardung La", correct: true },
      { text: "Rohtang Pass", correct: false },
      { text: "Sela Pass", correct: false },
      { text: "Zoji La", correct: false }
    ]
  }
];
