import {LOAD_USERS} from "../actions/users";
import {ANSWER_QUESTION, NEW_QUESTION} from "../actions/questions";

export default function users(state = {}, action) {
    switch (action.type) {
        case LOAD_USERS:
            return {
                ...state,
                ...action.users
            }
        case ANSWER_QUESTION:
            return {
                ...state,
                [action.authedUser]: {
                    ...state[action.authedUser],
                    answers: {
                        ...state[action.authedUser].answers,
                        [action.id]: action.option
                    }
                }
            }
        case NEW_QUESTION:
            const question = action.question;
            const authedUser = question.author;
            return {
                ...state,
                [authedUser]: {
                    ...state[authedUser],
                    questions: state[authedUser].questions.concat([question.id])
                }
            }
        default:
            return state;
    }
}
