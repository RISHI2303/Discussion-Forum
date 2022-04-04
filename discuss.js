let submitQuestionNode = document.getElementById('submitBtn');
let questionTitleNode = document.getElementById('subject');
let questionDescriptionNode = document.getElementById('question');
let allQuestionsListNode = document.getElementById('dataList');

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
    addQuestionToPanel(question);
    clearQuestionForm();
}

// clear question form
function clearQuestionForm() {
    questionTitleNode.value = '';
    questionDescriptionNode.value = '';
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

function addQuestionToPanel(question) {
    let questionContainer = document.createElement('div');

    let newQuestionTitleNode = document.createElement('h4');
    newQuestionTitleNode.innerHTML = question.title;
    questionContainer.appendChild(newQuestionTitleNode);

    let newQuestionDescriptionNode = document.createElement('p');
    newQuestionDescriptionNode.innerHTML = question.description;
    questionContainer.appendChild(newQuestionDescriptionNode);

    allQuestionsListNode.appendChild(questionContainer);
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