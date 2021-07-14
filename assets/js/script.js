var pageContentEl = document.querySelector("#page-content");

var beginQuiz = function (){

};

var nextQuestion = function () {

};

//a button is pressed
var buttonHandler = function(event) {
    //get target from event
    var targetEl = event.target;

    if(targetEl.matches(".begin-btn")){
       beginQuiz();
       nextQuestion();
    }
    
    if(targetEl.matches("1")){
     //add point
     nextQuestion();
    }

    if(targetEl.matches("0"))
    //subtract time
    nextQuestion();
}


//event listener for button clicks
pageContentEl.addEventListener("click", buttonHandler)


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


create objects for each question. question in text content. answer1,...,answer4 are properties.
*/