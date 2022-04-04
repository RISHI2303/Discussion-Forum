let submitQuestionNode = document.getElementById('submitBtn');
let questionTitleNode = document.getElementById('subject');
let questionDescriptionNode = document.getElementById('question');

// listen for submit button to create a new question

submitQuestionNode.addEventListener('click', onQuestionSubmit);

function onQuestionSubmit() {
    let question = {
        title: "",
        description: ""
    }
    saveQuestion();
    addQuestionToPanel();
}

// save question to storage

function saveQuestion() {

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