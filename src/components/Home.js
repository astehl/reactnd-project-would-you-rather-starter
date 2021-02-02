import {connect} from "react-redux";
import {Component} from "react";
import Poll from "./Poll";

/**
 * @description Home component
 * renders the Home screen / Landing page.
 * Presents all answered and unanswered questions for the currently authed user.
 */
class Home extends Component {

    state = {
        showAnswered: false
    }

    onSwitchQuestionFilter = (e, shouldShowAnswered) => {
        e.preventDefault();
        if (shouldShowAnswered !== this.state.showAnswered) {
            this.setState(() => ({
                showAnswered: shouldShowAnswered
            }));
        }
    }

    filterAnswerToggle = (question, authedUser) => {
        const hasVoted = question.optionOne.votes.includes(authedUser) || question.optionTwo.votes.includes(authedUser);
        return this.state.showAnswered && hasVoted;
    }

    render() {
        const {questions, user} = this.props;
        const userAnswers = Object.keys(user.answers);
        const pollIds = Object.values(questions)
            .filter((question) => this.state.showAnswered ? userAnswers.includes(question.id) : !userAnswers.includes(question.id))
            .sort((a, b) => b.timestamp - a.timestamp)
            .map((question) => question.id);
        const toggle = this.state.showAnswered;
        return (
            <div>
                <div className='center'>
                    <button className={'btn' + (!toggle ? ' selected' : '')} onClick={(e) => this.onSwitchQuestionFilter(e, false)}>Unanswered Questions</button>
                    <button className={'btn' + (toggle ? ' selected' : '')} onClick={(e) => this.onSwitchQuestionFilter(e, true)}>Answered Questions</button>
                </div>
                <ul className='dashboard-list'>
                    {pollIds.map((id) => (
                        <li key={id}>
                            <Poll id={id}/>
                        </li>
                    ))}
                </ul>
            </div>
        )
    }
}

function mapStateToProps({questions, authedUser, users}) {
    return {
        questions,
        user: users[authedUser]
    }
}

export default connect(mapStateToProps)(Home)