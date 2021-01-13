import {ANSWER_QUESTION, LOAD_QUESTIONS, NEW_QUESTION} from "../actions/questions";

export default function questions(state = {}, action) {
    switch (action.type) {
        case LOAD_QUESTIONS:
            return {
                ...state,
                ...action.questions
            }
        case ANSWER_QUESTION:
            return {
                ...state,
                [action.id]: {
                    ...state[action.id],
                    [action.option]: {
                        ...state[action.id][action.option],
                        votes: state[action.id][action.option].votes.concat([action.authedUser])
                    }
                }
            }
        case NEW_QUESTION:
            return {
                ...state,
                [action.question.id]: action.question
            }
        default:
            return state;
    }
}
