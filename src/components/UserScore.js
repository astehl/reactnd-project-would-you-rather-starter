import Avatar from './Avatar';
import PropTypes from 'prop-types';

/**
 * @description Userscore component
 * Renders the score details of a user. These are
 * - count of asked questions
 * - count of voted questions
 * - the sum of both as the user's score
 *
 * @param {object} user - the user object to render the score values for.
 */
function UserScore(props) {

    const {user} = props;
    const countQuestions = user.questions.length;
    const countAnswers = Object.keys(user.answers).length;
    const score = countAnswers + countQuestions;

    return (
        <div className='user'>
            <Avatar user={user}/>
            <div className='user-info'>
                <h4>{user.name}</h4>
                <div>Questions asked: {countQuestions}</div>
                <div>Answers given: {countAnswers}</div>
                <span className='user-score'>Score: {score}</span>
            </div>
        </div>
    )
}

UserScore.propType = {
    user: PropTypes.object.isRequired,
}

export default UserScore