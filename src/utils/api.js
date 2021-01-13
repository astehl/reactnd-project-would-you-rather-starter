import {_getQuestions, _getUsers, _saveQuestion, _saveQuestionAnswer} from "./_DATA";

export function loadInitialData() {
    return Promise.all([
        _getUsers(),
        _getQuestions()
    ]).then(([users, questions]) => ({
        users,
        questions
    }))
}

export function saveQuestionAnswer(answer) {
    return _saveQuestionAnswer(answer);
}

export function saveQuestion(question) {
    return _saveQuestion(question)
}
