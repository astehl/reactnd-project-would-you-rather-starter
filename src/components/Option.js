export default function Option(props) {

    const {question, option, authedUser} = props;
    const optionText = question[option].text;
    const isAuthedUserVote = question[option].votes.includes(authedUser);
    const countVotesOption = question[option].votes.length;
    const countVotesAll = question['optionOne'].votes.length + question['optionTwo'].votes.length;
    const percentVotesOption = Math.round(countVotesOption / countVotesAll * 10000) / 100;

    return (
        <div className='poll-option'>
            <div className='option-voted'>
                {isAuthedUserVote && <img
                        src={process.env.PUBLIC_URL + '/icons/icons8-vote-64.png'}
                        alt='YOUR VOTE!'
                        className='voted'
                        title='YOUR VOTE!'
                    />
                }
            </div>
            <div className='option-details'>
                <div>{optionText}</div>
                <div>{countVotesOption} out of {countVotesAll} votes ({percentVotesOption} %).</div>
            </div>
        </div>
    )
}
