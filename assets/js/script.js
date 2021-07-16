let pageContentEl = document.querySelector("#page-content");
let buttonCollectEl = document.querySelector("#button-collection")
let questionCounter = 0;
let playerScore = 0;
 

let questionList = [
  {
    question: "question 1 text ",
    answers: ["answer 1 text", "answer 2 text","answer 3 text","answer 4 text"],
    answerStat: [true, false, false, false],
  },
  
  {
    question: "question 2 text ",
    answers: ["q2 answer 1 text", "q2 answer 2 text","q2 answer 3 text","q2 answer 4 text"],
    answerStat: [false, true, false, false],
  },
  
  {
    question: "question 3 text ",
    answers: ["q3 answer 1 text", "q3 answer 2 text","q3 answer 3 text","q3 answer 4 text"],
    answerStat: [false, false, true, false],
  },
];

function startTime () {
  let gameTime = 75;

  let gameTimer = setInterval(function() {
    
    if (gameTime > 1) {
      document.querySelector("#time-display").textContent = "Time remaining: " + gameTime + " seconds";
      gameTime--;
    } else if  (gameTime === 1) {
      document.querySelector("#time-display").textContent = "Time remaining: " + gameTime + " second";
      gameTime--;
    } else {
      alert("Time is up!");
      clearInterval(gameTimer);
      endGame();
    }
  }, 1000);
};

let removeQuestion = function() {
  for (let i = 0; i < questionList[questionCounter].answers.length; i++) {
    let removedQuest = document.querySelector(".ans-btn");
    removedQuest.remove();
  }
  questionCounter++;
};

let beginQuiz = function (){
  //remove p element
  let removeP = document.querySelector("#begin-text");
  let removeBtn = document.querySelector("#start-game");
  removeP.remove();
  removeBtn.remove();
  //Begin timer
  startTime();
  //Load question
  nextQuestion();
};

let nextQuestion = function () {

if (questionCounter < questionList.length) {
 document.querySelector("#main-text").textContent = questionList[questionCounter].question;

 for (let i = 0; i < questionList[questionCounter].answers.length; i++) {
  let buttonEl = document.createElement("button");
  buttonEl.textContent = questionList[questionCounter].answers[i];
  buttonEl.setAttribute("validate-answer", questionList[questionCounter].answerStat[i]);
  buttonEl.className =  "btn ans-btn";
  buttonCollectEl.appendChild(buttonEl);
  } 
} 
else {
  endGame();
}
};

//a button is pressed
let buttonHandler = function(event) {
    //get target from event
    let targetEl = event.target;

    if(targetEl.matches(".begin-btn")){
       beginQuiz();
    }
    
    else if(targetEl.getAttribute("validate-answer")){
     playerScore++;
     removeQuestion();
     nextQuestion();
    }

    else if (!targetEl.getAttribute("validate-answer")) {
    //remove 10 sec
    removeQuestion();
    nextQuestion();
    }
};


//event listener for button clicks
buttonCollectEl.addEventListener("click", buttonHandler);

let endGame = function (){
  alert("game end");
}

/* when you click start, quiz begins
quiz begin
  - empty p text
  - begin timer 75 sec
    load question function 
      -load question in h1 element
      -delete start button (or previous solution)
      -add four buttons

eventlistener for solutions/button
question submit function
  - checks answer
  - tells player correct/incorrect
  - keeps score adds a point or subtracts 10s time
  - load question function


when time is 0 or all questions answered, end game
- insert h1 "That's All Folks!" and p text "Enter your initials"
- input
- submit button

High Score screen
- go back button
- clear high scores button


 */