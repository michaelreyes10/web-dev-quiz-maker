// getting all required elements
const start_button = document.querySelector(".start_button");
const instruction_box = document.querySelector(".instruction_box");
const restart = instruction_box.querySelector(".buttons .restart");
const continue_button = document.querySelector(".buttons .continue");
const quiz_box = document.querySelector(".quiz_box");
const timeCount = quiz_box.querySelector(".timer .timer_sec");
const timeLine = quiz_box.querySelector(".timer .timeline");

const question_ans_list = document.querySelector(".question_ans_list");

//If Start Quiz Button is Clicked
start_button.onclick = ()=>{
    instruction_box.classList.add("activeInfo");//show info box
}
//If Exit Button is Clicked
restart.onclick = ()=>{
    instruction_box.classList.remove("activeInfo");//hide info box
}
//If Continue Button is Clicked
continue_button.onclick = ()=>{
    instruction_box.classList.remove("activeInfo");//hide info box
    quiz_box.classList.add("activeQuiz"); //show the quiz box
    showQuestions(0);
    queCounter(1);
    startTimer(15);
}

let que_count = 0;
let que_numb = 1;
let counter;
let timeValue = 15;
let userScore = 0;

const footer_button = quiz_box.querySelector(".footer_button");
const result_box = document.querySelector(".result_box");
const replay_quiz = result_box.querySelector(".result_replay_button");
const exit_quiz = result_box.querySelector(".result_exit_button");

exit_quiz.onclick = ()=>{
    window.location.reload();
}

//If Clicked Next Button is Clicked
footer_button.onclick = ()=>{
   if (que_count < questions.length - 1){
        que_count++;
        que_numb++;
        showQuestions(que_count);
        queCounter(que_numb);
        clearInterval(counter);
        startTimer(timeValue);
        footer_button.style.display = "none";
   }
   else {
    console.log("Completed Qs");
    showResultBox();
   }  
}

// getting questions and options from array
function showQuestions(index){
    const question_text = document.querySelector(".question_text");
    
    let question_tag = '<span>'+ questions[index].numb + ". " + questions[index].question +'</span>';
    let question_ans_tag = '<div class="question_ans">'+ questions[index].options[0] + '<span></span></div>'
    + '<div class="question_ans">' + questions[index].options[1] + '<span></span></div>'
    + '<div class="question_ans">' + questions[index].options[2] + '<span></span></div>'
    + '<div class="question_ans">' + questions[index].options[3] + '<span></span></div>';

    question_text.innerHTML = question_tag;
    question_ans_list.innerHTML = question_ans_tag;
    
    const question_ans = question_ans_list.querySelectorAll(".question_ans");
    
    for (let i = 0; i < question_ans.length; i++) {
        question_ans[i].setAttribute("onclick", "question_Ans_Selected(this)");
        
    }
}

let tickIcon = '<div class="question_check"><i class="fas fa-check"></i></div>'
let crossIcon = '<div class="question_x"><i class="fas fa-times"></i></div>'

function question_Ans_Selected(answer){
    let  userAns = answer.textContent;
    clearInterval(counter);
    let correctAns = questions[que_count].answer;
    let allOptions = question_ans_list.children.length;
    
    
    if(userAns == correctAns){
        userScore += 1;
        console.log(userScore);
        answer.classList.add("correct");
        console.log("Answer is correct");
        answer.insertAdjacentHTML("beforeend", tickIcon);
        
    }
    else{
        answer.classList.add("incorrect")
        console.log("Answer is wrong")
        answer.insertAdjacentHTML("beforeend", crossIcon);
    
        //if answer is incorrect, show correct answer
        for (let i = 0; i < allOptions; i++) {
            if(question_ans_list.children[i].textContent == correctAns) {
                question_ans_list.children[i].setAttribute("class", "question_ans correct");
                question_ans_list.children[i].insertAdjacentHTML("beforeend", tickIcon);
            }
            
        }

    }

        

    //once user selects an answer, disable options
    for (let i = 0; i < allOptions; i++) {
        question_ans_list.children[i].classList.add("disabled");
        
    }
    footer_button.style.display = "block";
}

function showResultBox(){
    instruction_box.classList.remove("activeInfo");//hide info box
    quiz_box.classList.remove("activeQuiz"); //hide the quiz box
    result_box.classList.add("activeResult"); //show the result box
    const scoreText = result_box.querySelector(".result_score");
    if(userScore > 3){
      let scoreTag = '<span>You earned a score of <p>'+ userScore + '</p> out of<p>'+ questions.length + '</p></span>';
      scoreText.innerHTML = scoreTag;
    }
    else if(userScore > 1){
        let scoreTag = '<span>You earned a score of <p>'+ userScore + '</p> out of<p>'+ questions.length + '</p></span>';
        scoreText.innerHTML = scoreTag;
      }
    else{
        let scoreTag = '<span> You earned a score of <p>'+ userScore + '</p> out of<p>'+ questions.length + '</p></span>';
        scoreText.innerHTML = scoreTag;
      }
}

    function startTimer(time){
        counter = setInterval(timer, 1000);
        function timer(){
            timeCount.textContent = time;
            time--;
        if(time < 0){
            clearInterval(counter);
            timeCount.textContent = "00"
        }
        }
    }

function queCounter (index){
    const bottom_que_counter = quiz_box.querySelector(".total_que");
    let totalQueCountTag = '<span><p>' + index + '</p>of<p>' + questions.length + '</p>Questions</span>';
    bottom_que_counter.innerHTML = totalQueCountTag;

}