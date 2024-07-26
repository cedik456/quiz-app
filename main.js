const questions = [
    {
      question:'What is the correct syntax for referring to an external script called "app.js"?',
      answers: [
          {text:'<script src="app.js"></script>', correct: true},
          {text:'<script href="app.js"></script>', correct: false},
          {text:'<script ref="app.js"></script>', correct: false},
          {text:'<script link="app.js"></script>', correct: false}
      ]
    },

    {
      question:'How do you create a function in JavaScript?',
      answers: [
          {text:'function = myFunction()', correct: false},
          {text:'function:myFunction()', correct: false},
          {text:'function myFunction()', correct: true},
          {text:'createFunction myFunction()', correct: false}
      ]
    },

    {
      question:'How do you call a function named "myFunction"',
      answers: [
          {text:'call myFunction()', correct: false},
          {text:'myFunction()', correct: true},
          {text:'call function myFunction()', correct: false},
          {text:'execute myFunction()', correct: false}
      ]
    },

    {
      question:'Which event occurs when the user clicks on an HTML element?',
      answers: [
          {text:'onchange', correct: false},
          {text:'onmouseover', correct: false},
          {text:'onmouseclick', correct: false},
          {text:'onclick', correct: true}
      ]
    },

    {
      question:'How do you write an IF statement in JavaScript?',
      answers: [
          {text:'if i = 5', correct: false},
          {text:'if i == 5 then', correct: false},
          {text:'if (i == 5)', correct: true},
          {text:'if i = 5 then', correct: false}
      ]
    }
];

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

// const app = document.querySelector(".app");
// const quiz = document.querySelector(".quiz");
// const button = document.querySelectorAll(".btn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz(){
  
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    showQuestion();
}

function showQuestion(){

    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.textContent = questionNo + ". " + currentQuestion.  question;

    currentQuestion.answers.forEach(answer => {
      const buttons = document.createElement("button");
      buttons.textContent = answer.text;
      buttons.classList.add("btn");
      answerButtons.appendChild(buttons); 
      if(answer.correct){
        buttons.dataset.correct = answer.correct;
      }
      buttons.addEventListener("click", selectAnswer)
    });

}

function resetState(){

    nextButton.style.display = "none";
    while(answerButtons.firstChild){
      answerButtons.removeChild(answerButtons.firstChild);
    }

}

function selectAnswer(e){

    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if(isCorrect){
      selectedBtn.classList.add("correct");
      score++;
    }
    else{
      selectedBtn.classList.add("incorrect");
    }
    Array.from(answerButtons.children).forEach(buttons =>{
      if(buttons.dataset.correct === "true"){
        buttons.classList.add("correct");
      }
      buttons.disabled = true;
    });
    nextButton.style.display = "block";
}

function showScore(){

    resetState();
    questionElement.innerHTML = `You scored ${score} out of ${questions.length}`;
    nextButton.innerHTML = "Play again";
    nextButton.style.display = "block";
}

function handleNextButton(){

    currentQuestionIndex++;
    if(currentQuestionIndex < questions.length){
      showQuestion();
    }
    else{
      showScore();
    }
}

nextButton.addEventListener("click", () => {
    if(currentQuestionIndex < questions.length){
      handleNextButton();
    }
    else{
      startQuiz();
    }

});

startQuiz(); 