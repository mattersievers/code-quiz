var pageContentEl = document.querySelector("#page-content");
var buttonCollectEl = document.querySelector("#button-collection")
var questionCounter =0;

var questions = ["question 1", "question 2", "question 3"];
var answers = [
    "answer1a",
    "answer1b",
    "answer1c",
    "answer1d",

    "answer2a",
    "answer2b",
    "answer2c",
    "answer2d",

    "answer3a",
    "answer3b",
    "answer3c",
    "answer3d"]

var beginQuiz = function (){
  //remove p element
  var removeP = document.querySelector("#begin-text");
  var removeBtn = document.querySelector("#start-game");
  removeP.remove();
  removeBtn.remove();
  //Begin timer

  //Load question
  nextQuestion();
};

var nextQuestion = function () {

 document.querySelector("#main-text").textContent = questions[questionCounter];
 for (i=4*questionCounter; i< 4*questionCounter+4; i++) {
 var buttonEl = document.createElement("button");
 buttonEl.textContent = answers[i];
 buttonEl.className = "btn"
 buttonCollectEl.appendChild(buttonEl);

 }
 return buttonCollectEl;
};

//a button is pressed
var buttonHandler = function(event) {
    //get target from event
    var targetEl = event.target;

    if(targetEl.matches(".begin-btn")){
       beginQuiz();
    }
    
    if(targetEl.matches(".winner")){
     //add point
     nextQuestion();
    }

    if(targetEl.matches(".wrong"))
    //subtract time
    nextQuestion();
}


//event listener for button clicks
buttonCollectEl.addEventListener("click", buttonHandler)


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