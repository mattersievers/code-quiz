let pageContentEl = document.querySelector("#page-content");
let buttonCollectEl = document.querySelector("#button-collection")
let gameTime = 75;
let questionCounter = 0;
let playerScore = 0; 
let adjustTime = false;
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
  let gameTimer = setInterval(function() {
    //wrong answer and time left
    if (gameTime > 1 && adjustTime) {
      document.querySelector("#time-display").textContent = "Time remaining: " + gameTime + " seconds";
      gameTime = gameTime - 10;
      adjustTime = false;
      //time left
    } else if (gameTime > 1 && !adjustTime) {
      document.querySelector("#time-display").textContent = "Time remaining: " + gameTime + " seconds";
      gameTime--;
      // one second left
    } else if  (gameTime === 1) {
      document.querySelector("#time-display").textContent = "Time remaining: " + gameTime + " second";
      gameTime--;
      //no time left and questions still remain
    } else if (questionCounter < questionList.length) {
      alert("Time is up!");
      clearInterval(gameTimer);
      endGame();
      //no time and no questions remain
    } else {
      document.querySelector("#time-display").textContent = "Time remaining: " + gameTime + " seconds";
      clearInterval(gameTimer)
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
  let emptyP = document.querySelector("#begin-text");
  let removeBtn = document.querySelector("#start-game");
  emptyP.textContent = "";
  removeBtn.remove();
  //Begin timer
  startTime();
  //Load question
  nextQuestion();
};

let nextQuestion = function () {
  //check for questions left. If no more questions, endGame.
  if (questionCounter < questionList.length) {
  
    //Question text changed
  document.querySelector("#main-text").textContent = questionList[questionCounter].question;
  
  //Buttons generated for answers
  for (let i = 0; i < questionList[questionCounter].answers.length; i++) {
    let buttonEl = document.createElement("button");
    buttonEl.textContent = questionList[questionCounter].answers[i];
    buttonEl.setAttribute("validate-answer", questionList[questionCounter].answerStat[i]);
    buttonEl.className =  "btn ans-btn";
    buttonCollectEl.appendChild(buttonEl);
    } 
  } 
  
  //No more questions left
  else {
    endGame();
  }
};

//a button is pressed
let buttonHandler = function(event) {
    //get target from event
    let targetEl = event.target;
    // Click start button
    if(targetEl.matches(".begin-btn")){
       beginQuiz();
    }
    //Click correct solution
     else if(targetEl.getAttribute("validate-answer") === "true"){
     playerScore++;
     removeQuestion();
     nextQuestion();
    }
    //Click incorrect solution
    else if (targetEl.getAttribute("validate-answer") === "false") {
    //Adjust time by 10 sec
    adjustTime = true;
    removeQuestion();
    nextQuestion();
    }
};


//event listener for button clicks
buttonCollectEl.addEventListener("click", buttonHandler);

let endGame = function (){
  //Load final screen text
  document.querySelector("#main-text").textContent = "The Quiz Is Done!";
  document.querySelector("#begin-text").textContent = "Your final score is: " + playerScore + "!";
  
  //Build form
  let formEl = document.createElement("form");
  let labelEl = document.createElement("label");
  labelEl.textContent = "Input initials:";
  let inputEl = document.createElement("input");
  inputEl.textContent = "Your initials";
  inputEl.setAttribute("type","text");
  inputEl.setAttribute("maxlength",2);
  let buttonEl = document.createElement("button");
  buttonEl.setAttribute("type", "submit");
  buttonEl.className = "btn initial-btn";
  buttonEl.textContent = "Submit Initials";

  //Append elements to form and append form to page-content
  formEl.appendChild(labelEl);
  formEl.appendChild(inputEl);
  formEl.appendChild(buttonEl);

  pageContentEl.appendChild(formEl);
  removeQuestion();

}

/* 

input initials and save to localStorage

High Score screen
- go back button
- retrieves localStorage scores
- clear high scores button


 */