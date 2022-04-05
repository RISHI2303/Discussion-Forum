let submitQuestionNode = document.getElementById('submitBtn');
let questionTitleNode = document.getElementById('subject');
let questionDescriptionNode = document.getElementById('question');
let allQuestionsListNode = document.getElementById('dataList');
let createQuestionNode = document.getElementById("toggleDisplay");
let questionDetailContainerNode = document.getElementById("respondQue");
let resolveQuestionContainerNode = document.getElementById("resolveHolder");
let resolveQuestion = document.getElementById("resolveQuestion");
let responseContainerNode = document.getElementById("respondAns");
let commentContainerNode = document.getElementById("commentHolder");
let commentatorNameNode = document.getElementById("pickName");
let commentNode = document.getElementById("pickComment");
let submitCommentNode = document.getElementById("commentBtn");

// display all existing questions
function onLoad() {
    // get all functions from storage
    let allQuestions = getAllQuestions();
    allQuestions.forEach(function (question) { 
        addQuestionToPanel(question);
    });
}

onLoad();

// listen for submit button to create a new question
submitQuestionNode.addEventListener('click', onQuestionSubmit);
function onQuestionSubmit() {
    let question;
    if (questionTitleNode.value != null || questionDescriptionNode.value != null) {
        question = {
            title: questionTitleNode.value,
            description: questionDescriptionNode.value,
            responses: []
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
    // get all questions from storage first and push new question to it
    // then save it back to storage

    let allQuestions = getAllQuestions();

    allQuestions.push(question);

    localStorage.setItem('questions', JSON.stringify(allQuestions));
}

// append question to the left panel
function addQuestionToPanel(question) {
    let questionContainer = document.createElement('div');
    questionContainer.style.background = "grey";

    let newQuestionTitleNode = document.createElement('h4');
    newQuestionTitleNode.innerHTML = question.title;
    questionContainer.appendChild(newQuestionTitleNode);

    let newQuestionDescriptionNode = document.createElement('p');
    newQuestionDescriptionNode.innerHTML = question.description;
    questionContainer.appendChild(newQuestionDescriptionNode);

    allQuestionsListNode.appendChild(questionContainer);

    questionContainer.onclick = onQuestionClick(question);
}

// get all functions from storage
function getAllQuestions() {
    let allQuestions = localStorage.getItem('questions');

    if(allQuestions) {
        allQuestions = JSON.parse(allQuestions);
    } else {
        allQuestions = [];
    }

    return allQuestions;
}

// listen for click on question and display in right panel
function onQuestionClick(question) {

    // through closure, we can access question object
    return function () { 
        // hide question panel
        hideQuestionPanel();

        // clear last details
        clearQuestionDetails();
        clearResponsePanel();

        // show clicked question
        showDetails();

        // create question details
        addQuestionToRight(question);

        // show all previous responses
        question.responses.forEach(function (response) { 
            addResponseInPanel(response);
        });

        // listen for submit response button
        // submitCommentNode.addEventListener('click', onResponseSubmit(question), {once: true});
        submitCommentNode.onclick = onResponseSubmit(question);
    }
}

// listen for click on submit response button
function onResponseSubmit(question) {
    return function () {
        let response = {
            name: commentatorNameNode.value,
            description: commentNode.value
        }
        saveResponse(question, response);
        addResponseInPanel(response);
    }
}

// display response in response section
function addResponseInPanel(response) {
    let userNameNode = document.createElement("h4");
    userNameNode.innerHTML = response.name;

    let userCommentNode = document.createElement("p");
    userCommentNode.innerHTML = response.description;

    let responseContainer = document.createElement("div");
    responseContainer.appendChild(userNameNode);
    responseContainer.appendChild(userCommentNode);

    responseContainerNode.appendChild(responseContainer);
}

// hide question panel
function hideQuestionPanel() {
    createQuestionNode.style.display = "none";
}

// show question panel
function showDetails() {
    questionDetailContainerNode.style.display = "block";
    resolveQuestionContainerNode.style.display = "block";
    responseContainerNode.style.display = "block";
    commentContainerNode.style.display = "block";
}

function addQuestionToRight(question) {
	let titleNode = document.createElement("h3");
	titleNode.innerHTML = question.title;

	let descriptionNode = document.createElement("p");
	descriptionNode.innerHTML = question.description;

	questionDetailContainerNode.appendChild(titleNode);
	questionDetailContainerNode.appendChild(descriptionNode);
}

function saveResponse(updatedQuestion, response) {
    if (commentatorNameNode.value == "" || commentNode.value == "") {
        alert("Name and comment cannot be empty");
    }
    
    else {
        let allQuestions = getAllQuestions();

        let revisedQuestion = allQuestions.map(function (question) {
            if (updatedQuestion.title === question.title) {
                question.responses.push(response);
            }
            return question;
        });

        localStorage.setItem('questions', JSON.stringify(revisedQuestion));
    }
}

function clearQuestionDetails() {
    questionDetailContainerNode.innerHTML = "";
}

function clearResponsePanel() {
    responseContainerNode.innerHTML = "";
}