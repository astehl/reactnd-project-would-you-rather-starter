import {saveQuestionAnswer} from "../utils/api";

export const LOAD_QUESTIONS = 'LOAD_QUESTIONS';
export const ANSWER_QUESTION = 'ANSWER_QUESTION';

export function loadQuestions(questions) {
    return {
        type: LOAD_QUESTIONS,
        questions
    }
}

function answerQuestion({id, option, authedUser}) {
    return {
        type: ANSWER_QUESTION,
        id,
        option,
        authedUser
    }
}

export function handleAnswerQuestion(info) {
    const {id, option, authedUser} = info;
    return (dispatch) => {
        dispatch(answerQuestion(info));
        return saveQuestionAnswer({
            qid: id,
            answer: option,
            authedUser
        })
            .catch((e) => {
                console.warn('error while calling saveQuestionAnswer', e);
                // TODO: dispatch redo action
                alert('Something went wrong. Please try again');
            })
    }
}