import {connect} from "react-redux";
import PropTypes from 'prop-types';

/**
 * @description Option component
 * Renders a poll option with all details.
 * - option text
 * - how many users voted this option and the percentage of all votes
 * - info, if authed user voted this option
 *
 * @param {object} question - the question contaning the option to render
 * @param {string} option - key, which option should be rendered. Can be 'optionOne' or 'optionTwo'.
 * @param {string} authedUser - the authed user's id
 */
function Option(props) {

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
                <h4>{optionText}</h4>
                <div>{countVotesOption} out of {countVotesAll} votes ({percentVotesOption} %).</div>
            </div>
        </div>
    )
}

Option.propTypes = {
    question: PropTypes.object.isRequired,
    option: PropTypes.string.isRequired,
    authedUser: PropTypes.string
};

function mapStateToProps({authedUser, questions}, {qid, option}) {
    return {
        question: questions[qid],
        authedUser,
        option
    }
}

export default connect(mapStateToProps)(Option)
