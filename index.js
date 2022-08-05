var url = 'https://opentdb.com/api.php?amount=10'
var questions
var questionNumber = 0
var correctQuestions = 0

async function fetchQuestions() 
{
    const response = await fetch(url);
    const names = await response.json();
    console.log(names); 
    questions = names;
    document.getElementById("quest").innerHTML = questions.results[0].question;
    document.getElementById("ans0").innerHTML = questions.results[0].incorrect_answers[0];
    document.getElementById("ans1").innerHTML = questions.results[0].incorrect_answers[1];
    document.getElementById("ans2").innerHTML = questions.results[0].incorrect_answers[2];
}

function fetchQuestions2(dID)
{
    // Get the child element node 
    var child = document.getElementById(dID);

    // Remove the child element from the document
    child.parentNode.removeChild(child);
    fetchQuestions()
}

function ResetQuiz()
{
    var tag = document.createElement("p");
    var text = document.createTextNode("You ended the quiz");
    tag.appendChild(text);
    var element = document.getElementById("full");
    element.appendChild(tag);
    questionNumber = 0
    correctQuestions = 0
}

function CreateButton()
{
    var button = document.createElement('button');
    button.innerHTML = "Play 1 more time";
    button.id = "deletableButton"
    let dID = button.id
    button.onclick = fetchQuestions2(dID)
    // where do we want to have the button to appear?
    // you can append it to another element just by doing something like
    // document.getElementById('foobutton').appendChild(button);
    var element = document.getElementById("full");
    element.appendChild(button);
    // document.body.appendChild(button);
}

function AnswerCompare(num)
{
    if (questions.results[questionNumber].correct_answer === btn[num].value)
    {
        correctQuestions++
        return true
    }
    return false
}

function AssignQuestions()
{
    document.getElementById("quest").innerHTML = questions.results[questionNumber].question;
    document.getElementById("ans0").innerHTML = questions.results[questionNumber].incorrect_answers[0];
    document.getElementById("ans1").innerHTML = questions.results[questionNumber].incorrect_answers[1];
    document.getElementById("ans2").innerHTML = questions.results[questionNumber].incorrect_answers[2];
}

fetchQuestions();

var btn = new Array(3);
btn[0] = document.getElementById("ans0");
btn[1] = document.getElementById("ans1");
btn[2] = document.getElementById("ans2");

btn[0].addEventListener("click", ()=>{
    console.log(questionNumber);
    console.log(correctQuestions);
    if (questionNumber >= 9)
    {
        ResetQuiz()
        CreateButton()
        return
    }
    AnswerCompare(0)
    questionNumber++
    AssignQuestions()
});

btn[1].addEventListener("click", ()=>{
    console.log(questionNumber);
    console.log(correctQuestions);
    if (questionNumber >= 9)
    {
        ResetQuiz()
        CreateButton()
    }
    AnswerCompare(1)
    questionNumber++
    AssignQuestions()
});

btn[2].addEventListener("click", ()=>{
    console.log(questionNumber);
    console.log(correctQuestions);
    if (questionNumber >= 9)
    {
        ResetQuiz()
        CreateButton()
    }
    AnswerCompare(2)
    questionNumber++
    AssignQuestions()
});