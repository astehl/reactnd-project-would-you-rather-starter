import Avatar from './Avatar';
import PropTypes from 'prop-types';

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