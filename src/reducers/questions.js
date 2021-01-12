import {ANSWER_QUESTION, LOAD_QUESTIONS} from "../actions/questions";

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
        default:
            return state;
    }
}
