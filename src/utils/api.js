import {_getQuestions, _getUsers, _saveQuestionAnswer} from "./_DATA";

export function loadInitialData() {
    return Promise.all([
        _getUsers(),
        _getQuestions()
    ]).then(([users, questions]) => ({
        users,
        questions
    }))
}

export function saveQuestionAnswer(info) {
    return _saveQuestionAnswer(info);
}

