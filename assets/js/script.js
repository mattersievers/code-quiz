//Creater elements
let pageContentEl = document.querySelector("#page-content");
let buttonCollectEl = document.querySelector("#button-collection");
let formEl = document.createElement("form");
formEl.setAttribute("name","initials");
let headerEl = document.querySelector("#header");
let titleEl = document.querySelector("#large-text");
let textEl = document.querySelector("#small-text");
let scoreListEl = document.querySelector("#score-collection");
//Set initial parameters
let gameTime = 75;
let questionCounter = 0;
let playerScore = 0; 
let adjustTime = false;
let playerInfo = {
   initials: null,
   highScore: null,
};

let savedInfo = [];
for (let i = 0; i < 10 ; i++){
  savedInfo[i] = {
    initials: "__",
    highScore: 0
  }
};  

// List of questions. answerStat = true gives the correlating correct solution.
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
  {
    question: "question 4 text ",
    answers: ["q4 answer 1 text", "q4 answer 2 text","q4 answer 3 text","q4 answer 4 text"],
    answerStat: [false, false, false, true],
  },
];

//shuffle an array
var shuffle = function (array) {
  for (var i = 0; i < array.length; i++){
  var j = randomNumber(0,array.length-1)
  var temp = array[i];
  array[i] = array[j];
  array[j] = temp;
  }
  return array;
};
//random number generator
var randomNumber = function (min,max){
  var value = Math.floor(Math.random()*(max - min + 1) + min);
  
  return value;
};

//starts timer
function startTime () {
  let gameTimer = setInterval(function() {
    //wrong answer and time left
    if (gameTime > 1 && adjustTime) {
      document.querySelector("#time-display").textContent = "Time remaining: " + gameTime + " seconds";
      gameTime = gameTime - 11;
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
  let removeBtn = document.querySelector("#start-game");
  textEl.textContent = "";
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
  titleEl.textContent = questionList[questionCounter].question;
  
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
    shuffle(questionList);  
    beginQuiz();
  }
  //Click correct solution
  else if(targetEl.getAttribute("validate-answer") === "true"){
    //remove true property to prevent double click
    targetEl.setAttribute("validate-answer",false);
    //Increase score
    playerScore++;
    // Delayed confirmation response after player click
    setTimeout (function(){
      document.querySelector("#response-box").style.color = "#46eb34";
      document.querySelector("#response-box").textContent = "CORRECT!";
    },50);
    //Delayed deleting of text, so response stays up for 700 minus 50 or 650ms
    setTimeout(function(){ 
      document.querySelector("#response-box").textContent = "";
      removeQuestion();
      nextQuestion();
    }, 700);
  }
  //Click incorrect solution
  else if (targetEl.getAttribute("validate-answer") === "false") {
    //Adjust time by 10 sec
    adjustTime = true;
    // Delayed denial response after player click
    setTimeout (function(){ 
      document.querySelector("#response-box").style.color = "red";
      document.querySelector("#response-box").textContent = "ISN'T THAT CUTE? BUT IT'S WRONG!"
    },50);
      // Delayed deleting of response
      setTimeout(function(){ 
        document.querySelector("#response-box").textContent = ""
        removeQuestion();
        nextQuestion();
      }, 700);
  }
  //Click go back button
  else if(targetEl.matches(".go-back-btn")){
    window.location="./index.html";
  }

  //Click clear scores button
  else if(targetEl.matches(".reset-score-btn")){
    localStorage.clear();
  }
};


let endGame = function (){
  //Remove header
  headerEl.remove();
  //Load final screen text
  titleEl.textContent = "The Quiz Is Done!";
  textEl.textContent = "Your final score is: " + playerScore + "!";
  
  //Build form
  let labelEl = document.createElement("label");
  labelEl.textContent = "Input initials:";
  labelEl.setAttribute("name","initials");
  let inputEl = document.createElement("input");
  inputEl.textContent = "Your initials";
  inputEl.setAttribute("type","text");
  inputEl.setAttribute("maxlength",2);
  inputEl.setAttribute("name","initials");
  let linebreak = document.createElement("br");
  let buttonEl = document.createElement("button");
  buttonEl.setAttribute("type", "submit");
  buttonEl.className = "btn initial-btn";
  buttonEl.textContent = "Submit Initials";

  //Append elements to form and append form to page-content
  formEl.appendChild(labelEl);
  formEl.appendChild(inputEl);
  formEl.appendChild(linebreak);
  formEl.appendChild(buttonEl);

  buttonCollectEl.appendChild(formEl);
  removeQuestion();
  

  saveGame();
};

let highScoreScreen = function(){
  //Remove header if it's there
  if (headerEl){
    headerEl.remove();
  }
  if (localStorage.getItem("savedInfo")){
    savedInfo = localStorage.getItem("savedInfo");
    savedInfo = JSON.parse(savedInfo);
  }
  titleEl.textContent ="High Scores"
  
  // create list elements for stats and append to p element
  let highListEl = document.createElement("ul");

  //Create list, add each person and their score to the list
  for (let i=0; i < 10; i++){
    let listEl = document.createElement("li");
    listEl.innerHTML = 
    (i+1) + ". Player intials: " + savedInfo[i].initials + "<span>" + "Score: " + savedInfo[i].highScore + "</span>";
    highListEl.appendChild(listEl);
  }  
  scoreListEl.appendChild(highListEl);
  
  //Create go back and reset scores buttons and append to button collection
  let goBackBtn = document.createElement("button");
  goBackBtn.textContent = "Go Back";
  goBackBtn.className = "btn go-back-btn"
  let resetScoreBtn = document.createElement("button");
  resetScoreBtn.textContent = "Reset High Scores";
  resetScoreBtn.className = "btn reset-score-btn"
  buttonCollectEl.style.flexDirection = "row";
  buttonCollectEl.appendChild(goBackBtn);
  buttonCollectEl.appendChild(resetScoreBtn);
  

};

let highScoreScreenHandler = function(event){
  //Player clicks the high score screen button
  if(event.target.matches("#high-score-btn")){
    //Remove elements. One button if at start, three more if in questions
    textEl.remove();
    let removeBtn = document.querySelector(".btn");
    removeBtn.remove();
    if (document.querySelector(".ans-btn")){ 
      for(var i=0; i<3; i++) {
        let removeAnsBtn = document.querySelector(".ans-btn");
        removeAnsBtn.remove();
      }  
    }  
    highScoreScreen();
  }  
}

let saveGame = function (event) {
  event.preventDefault();
  //Get info from storage if it exists
  if (localStorage.getItem("savedInfo")){
  savedInfo = localStorage.getItem("savedInfo");
  savedInfo = JSON.parse(savedInfo);
  }
 
  //Check to see if player score beats lowest highScore out of the 10 scores
  if (playerScore > savedInfo[9].highScore) {
    alert("Congratulation! You made the High Score List!")
    //Retrieve intials from input and highScore from player score
    playerInfo.initials = document.querySelector("input[name='initials']").value;
    playerInfo.initials = playerInfo.initials.toUpperCase();
    // Reject blank submissions.
    if (!playerInfo.initials){
      alert("Please enter intials to continue.");
      return false;
    }
    playerInfo.highScore = playerScore;  
    //push player stats into saves stats
    savedInfo.push(playerInfo);
    //Sort by highScore
    savedInfo.sort(function(a, b) {return b.highScore - a.highScore});
    //Reject the 11th so it saves 10 entries
    savedInfo.splice(10,1);
    //Save the new stat list
    console.log(savedInfo); 
    console.log(JSON.stringify(savedInfo));
    localStorage.setItem("savedInfo", JSON.stringify(savedInfo));  
  }
  else {
    alert("Sorry. You did not make the High Score List. Study a bit more and try again.")
    localStorage.setItem("savedInfo", JSON.stringify(savedInfo)); 
  }
  var removeForm = document.querySelector("form[name='initials']");
  removeForm.remove();
  highScoreScreen();
};

//event listener for button clicks
headerEl.addEventListener("click", highScoreScreenHandler);

buttonCollectEl.addEventListener("click", buttonHandler);

formEl.addEventListener("submit", saveGame);
/* 
- put in some real JS questions
 */