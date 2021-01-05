import {loadInitialData} from "../utils/api";
import {loadUsers} from "./users";
import {loadQuestions} from "./questions";

export function handleInitialData() {
    return (dispatch) => {
        loadInitialData()
            .then(({users, questions}) => {
                dispatch(loadUsers(users));
                dispatch(loadQuestions(questions));
            })
            .catch((e) => {
                console.warn('error while loading initial data', e);
                alert('An error occurred while loading initial data. Try it once more');
            })
    }
}