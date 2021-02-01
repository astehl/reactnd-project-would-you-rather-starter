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
                <div>{isAuthedUserVote && 'Your VOTE!'}</div>
            </div>
            <div className='option-details'>
                <div>{optionText}</div>
                <div>{countVotesOption} out of {countVotesAll} votes ({percentVotesOption} %).</div>
            </div>
        </div>
    )
}
