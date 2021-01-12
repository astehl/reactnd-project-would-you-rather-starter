import {loadInitialData} from "../utils/api";
import {loadUsers} from "./users";
import {loadQuestions} from "./questions";
import {hideLoading, showLoading} from "react-redux-loading";
import {setAuthedUser} from "./authedUser";

export function handleInitialData() {
    return (dispatch) => {
        dispatch(showLoading());
        dispatch(setAuthedUser('sarahedo'))
        loadInitialData()
            .then(({users, questions}) => {
                dispatch(loadUsers(users));
                dispatch(loadQuestions(questions));
                dispatch(hideLoading());
            })
            .catch((e) => {
                console.warn('error while loading initial data', e);
                alert('An error occurred while loading initial data. Try it once more');
            })
    }
}