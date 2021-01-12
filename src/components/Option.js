export default function Option (props) {
    const {optionText, votesOption, votesAll, authedUserVote, onClick} = props;
    return (
        <div className='option' onClick={onClick}>
            <div>Would you rather {optionText}</div>
            <div># {votesOption} out of {votesAll} votes</div>
            {authedUserVote && <div># myVote</div>}
        </div>
    )
}