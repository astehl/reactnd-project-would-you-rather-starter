export default function UserScore(props) {

    const {user} = props;
    const countQuestions = user.questions.length;
    const countAnswers = Object.keys(user.answers).length;
    const score = countAnswers + countQuestions;

    return (
        <div className='user'>
            <img
                src={process.env.PUBLIC_URL + '/logo192.png'}
                alt={`Avatar of ${user.name}`}
                className='avatar'
            />
            <div className='user-info'>
                <h4>{user.name}</h4>
                <div>Questions asked: {countQuestions}</div>
                <div>Answers given: {countAnswers}</div>
                <span className='user-score'>Score: {score}</span>
            </div>
        </div>
    )
}
