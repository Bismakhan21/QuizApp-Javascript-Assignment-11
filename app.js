var questions = [
    {
        question: "What is JavaScript primarily used for?",
        option1: "Styling web pages",
        option2: "Creating interactive web applications",
        option3: "Storing data on a server",
        correctAns: "Creating interactive web applications",
    },        
   {               
       question: " How do you comment a single line in JavaScript?",
       option1: "<!-- This is a comment --> ",
       option3: " // This is a comment",
       option4: "** This is a comment ** ",
       correctAns: " // This is a comment",
   },
   {
       question: "Which of the following is not a valid JavaScript data type? ",
       option1: "string ",
       option2: "undefined ",
       option3: "character",
       correctAns: "character",
   },         
   {
       question: "Which keyword is used to declare a variable in JavaScript?",
       option1: "define",
       option2: "var",
       option3: "int",
       correctAns: "var",
   },
   {
        question:"HTML stands for",
        option1:"Hyper Text markup language",
        option2:"Hyper Link markup language",
        option3:"Hyper Text makeup language",
        correctAns:"Hyper Text markup language"
    },
   {
       question:"CSS stands for",
       option1:"Cascading Style sheet",
       option2:"Cascading Styling sheet",
       option3:"Cascading super sheet",
       correctAns:"Cascading Style sheet"
   },
   {
       question:"In how many ways can CSS be written in?",
       option1:"1",
       option2:"2",
       option3:"3",
       correctAns:"3"
   },
   {
   question:"Which tag gives your the largest heading in html",
       option1:"<h6>",
       option2:"<h2>",
       option3:"<h1>",
       correctAns:"<h1>"
   },
   {
   question:"how many data types in js?",
       option1:"6",
       option2:"7",
       option3:"8",
       correctAns:"8"
   },
   {
       question:"how many days in febuary",
       option1:"30",
       option2:"28",
       option3:"29",
       correctAns:"28"
   }]
   
   var para = document.getElementById("ques");
   var opt1 = document.getElementById("opt1");
   var opt2 = document.getElementById("opt2");
   var opt3 = document.getElementById("opt3");
   var button = document.getElementById("btn");
   var timer = document.getElementById("timer");
   var feedback = document.getElementById("feedback");
   var progress = document.getElementById("progress-bar");
   var questionCount = questions.length;
   var index = 0;
   var score = 0;
   var min = 1;
   var sec = 59;
   
   // Shuffle the questions array using the Fisher-Yates algorithm
   function shuffleQuestions(array) {
       for (var i = array.length - 1; i > 0; i--) {
           var j = Math.floor(Math.random() * (i + 1));
           [array[i], array[j]] = [array[j], array[i]];
       }
   }
   
   // Shuffle the questions before starting the quiz
   shuffleQuestions(questions);
   
   // Countdown timer
   setInterval(function() {
       timer.innerHTML = `${min}:${sec}`;
       sec--;
       if (sec < 0) {
           min--;
           sec = 59;
       }
       if (min < 0) {
           min = 1;
           sec = 59;
           nextQuestion();
       }
   }, 1000);
   
   // Function to update and display the high score 
   function updateHighScore(score) {
       var highScore = localStorage.getItem("highScore");
   
       if (highScore === null || score > highScore) {
           localStorage.setItem("highScore", score);
           highScore = score;
       }
   
       var highScoreElement = document.getElementById("high-score");
       highScoreElement.innerText = "Your Score is: " + score;
       timer = 0;
   }
   
   // Function to handle next question
   function nextQuestion() {
       var getOptions = document.getElementsByName("options");
   
       for (var i = 0; i < getOptions.length; i++) {
           if (getOptions[i].checked) {
               var selectedValue = getOptions[i].value;
               var selectedAns = questions[index - 1][`option${selectedValue}`];
               var correctAns = questions[index - 1]["correctAns"];
               if (selectedAns === correctAns) {
                   score++;
               }
           }
           getOptions[i].checked = false;
       }
   
       button.disabled = true;
       min = 1;
       sec = 59;
   
       if (index > questions.length - 1) {
           var percentage = ((score / questions.length) * 100).toFixed(2);
           var feedbackText = `Your percentage is ${percentage}%`;
           updateHighScore(score);
           feedback.innerHTML = feedbackText;  
           
       } else {
           para.innerHTML = questions[index].question;
           opt1.innerText = questions[index].option1;
           opt2.innerText = questions[index].option2;
           opt3.innerText = questions[index].option3;
           index++;
       }
   }
   
   // Function to enable the "Next" button
   function clicked() {
       button.disabled = false;
   }
   