let submitQuestionNode = document.getElementById('submitBtn');
let questionTitleNode = document.getElementById('subject');
let questionDescriptionNode = document.getElementById('question');

// listen for submit button to create a new question

submitQuestionNode.addEventListener('click', onQuestionSubmit);

function onQuestionSubmit() {
    let question;
    if (questionTitleNode.value != null || questionDescriptionNode.value != null) {
        question = {
            title: questionTitleNode.value,
            description: questionDescriptionNode.value
        }
    }
    saveQuestion(question);
    addQuestionToPanel();
}

// save question to storage

function saveQuestion(question) {
    // get all questions from local storage first and push new question to it
    // then save it back to local storage

    let allQuestions = localStorage.getItem('questions');

    if(allQuestions) {
        allQuestions = JSON.parse(allQuestions);
    } else {
        allQuestions = [];
    }

    allQuestions.push(question);

    localStorage.setItem('questions', JSON.stringify(allQuestions));
}

// append question to the left panel

function addQuestionToPanel() {

}

// listen for click on question and display in right panel

function onQuestionClick() {

}

// listen for click on submit response button

function onResponseSubmit() {

}

// display response in response section

function addResponseInPanel() {

}