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

let removeQuestion = function() {
  for (var i = 0; i < questionList[questionCounter].answers.length; i++) {
    var removedQuest = document.querySelector(".ans-btn");
    removedQuest.remove();
  }
  questionCounter++;
};

let beginQuiz = function (){
  //remove p element
  var removeP = document.querySelector("#begin-text");
  var removeBtn = document.querySelector("#start-game");
  removeP.remove();
  removeBtn.remove();
  //Begin timer

  //Load question
  nextQuestion();
};

let nextQuestion = function () {

 document.querySelector("#main-text").textContent = questionList[questionCounter].question;

 for (var i = 0; i < questionList[questionCounter].answers.length; i++) {
  let buttonEl = document.createElement("button");
  buttonEl.textContent = questionList[questionCounter].answers[i];
  buttonEl.setAttribute("validate-answer", questionList[questionCounter].answerStat[i]);
  buttonEl.className =  "btn ans-btn";
  buttonCollectEl.appendChild(buttonEl);
  } 
  ;
};

//a button is pressed
var buttonHandler = function(event) {
    //get target from event
    var targetEl = event.target;

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
}


//event listener for button clicks
buttonCollectEl.addEventListener("click", buttonHandler)

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
    alert("Sorry. You did not make the High Score List. Study a bit and try again.")
    localStorage.setItem("savedInfo", JSON.stringify(savedInfo)); 
  }
};

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