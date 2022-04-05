let submitQuestionNode = document.getElementById('submitBtn');
let questionTitleNode = document.getElementById('subject');
let questionDescriptionNode = document.getElementById('question');
let allQuestionsListNode = document.getElementById('dataList');
let createQuestionNode = document.getElementById("toggleDisplay");
let questionDetailContainerNode = document.getElementById("respondQue");
let resolveQuestionContainerNode = document.getElementById("resolveHolder");
let resolveQuestionNode = document.getElementById("resolveQuestion");
let responseContainerNode = document.getElementById("respondAns");
let commentContainerNode = document.getElementById("commentHolder");
let commentatorNameNode = document.getElementById("pickName");
let commentNode = document.getElementById("pickComment");
let submitCommentNode = document.getElementById("commentBtn");
var questionSearchNode = document.getElementById("questionSearch");
var upvote = document.getElementById("upvote");
var downvote = document.getElementById("downvote");

// listen to value change in search bar
questionSearchNode.addEventListener('keyup', function (event) { 
    // show filtered result
    filterResult(event.target.value);
});
 
// filter result
function filterResult(query) { 
    var allQuestions = getAllQuestions();

    if (query) {
        clearQuestionPanel();

        var filteredQuestions = allQuestions.filter(function (question) { 
            if(question.title.includes(query)) {
                return true;
            }
        });

        if(filteredQuestions.length > 0) {
            filteredQuestions.forEach(function (question) { 
                addQuestionToPanel(question);
            });
        }

        else {
            printNoMatchFound();
        }
    }

    else {
        clearQuestionPanel();
        allQuestions.forEach(function (question) { 
            addQuestionToPanel(question);
        });
    }
}

// clear all questions from panel
function clearQuestionPanel() { 
    allQuestionsListNode.innerHTML = "";
}

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
            responses: [],
            upvotes: 0,
            downvotes: 0
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
    questionContainer.setAttribute('id', question.title);
    questionContainer.style.background = "grey";

    let newQuestionTitleNode = document.createElement('h4');
    newQuestionTitleNode.innerHTML = question.title;
    questionContainer.appendChild(newQuestionTitleNode);

    let newQuestionDescriptionNode = document.createElement('p');
    newQuestionDescriptionNode.innerHTML = question.description;
    questionContainer.appendChild(newQuestionDescriptionNode);

    var upvoteTextNode = document.createElement('h4');
    upvoteTextNode.innerHTML = "Upvotes: " + question.upvotes;
    questionContainer.appendChild(upvoteTextNode);

    var downvoteTextNode = document.createElement('h4');
    downvoteTextNode.innerHTML = "Downvotes: " + question.downvotes;
    questionContainer.appendChild(downvoteTextNode);

    allQuestionsListNode.appendChild(questionContainer);

    questionContainer.onclick = onQuestionClick(question);
}

// get all functions from storage
function getAllQuestions() {
    var allQuestions = localStorage.getItem('questions');

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

        // listen for upvote button
        upvote.onclick = upvoteQuestion(question);

        // listen for downvote button
        downvote.onclick = downvoteQuestion(question);

        // listen for resolve button
        resolveQuestionNode.onclick = resolveQuestion(question);
    }
}

// resolve question
function resolveQuestion(question) {
    return function () {
        hideDetails();
        showQuestionPanel();
        deleteQuestion(question);
        clearQuestionPanel();
        onLoad();
    }
}

function deleteQuestion(selectedQuestion) { 
    var allQuestions = getAllQuestions();

    for (var i = 0; i < allQuestions.length; i++) {
        if (allQuestions[i].title == selectedQuestion.title) {
            allQuestions.splice(i, 1);
            break;
        }
    }

    localStorage.setItem('questions', JSON.stringify(allQuestions));
}

// upvotes
function upvoteQuestion(question) { 
    return function () { 
        question.upvotes++;
        updateQuestion(question);
        updateQuestionUI(question);
    }
}

// downvotes
function downvoteQuestion(question) { 
    return function () { 
        question.downvotes++;
        updateQuestion(question);
        updateQuestionUI(question);
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
function showQuestionPanel() {
    createQuestionNode.style.display = "block";
}

// show question panel
function showDetails() {
    questionDetailContainerNode.style.display = "block";
    resolveQuestionContainerNode.style.display = "block";
    responseContainerNode.style.display = "block";
    commentContainerNode.style.display = "block";
}

// hide question details
function hideDetails() { 
    questionDetailContainerNode.style.display = "none";
    resolveQuestionContainerNode.style.display = "none";
    responseContainerNode.style.display = "none";
    commentContainerNode.style.display = "none";
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

function printNoMatchFound() {
    let noMatchFoundNode = document.createElement("h1");
    noMatchFoundNode.innerHTML = "No match found :(";

    allQuestionsListNode.appendChild(noMatchFoundNode);
}

// update question
function updateQuestion(updatedQuestion) { 
    var allQuestions = getAllQuestions();

    var revisedQuestion = allQuestions.map(function (question) {
        if (updatedQuestion.title === question.title) {
            return updatedQuestion;
        }
        return question;
    });

    localStorage.setItem('questions', JSON.stringify(revisedQuestion));
}

function updateQuestionUI(question) {
    var questionContainerNode = document.getElementById(question.title);

    questionContainerNode.childNodes[2].innerHTML = "Upvotes: " + question.upvotes;
    questionContainerNode.childNodes[3].innerHTML = "Downvotes: " + question.downvotes;
    // console.log(questionContainerNode.childNodes);
}