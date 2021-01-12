import React, {Component} from "react";
import {connect} from "react-redux";
import Option from "./Option";

class OptionsView extends Component {
    render() {
        const {question, authedUser} = this.props;
        const votesOptionOne = question.optionOne.votes.length;
        const authedUserVotedOptionOne = question.optionOne.votes.includes(authedUser);
        const votesOptionTwo = question.optionTwo.votes.length;
        const authedUserVotedOptionTwo = question.optionTwo.votes.includes(authedUser);
        return (
            <div>
                <h3>OptionView</h3>
                <Option
                    optionText={question.optionOne.text}
                    votesOption={votesOptionOne}
                    votesAll={votesOptionOne+votesOptionTwo}
                    authedUserVote={authedUserVotedOptionOne}
                />
                <Option
                    optionText={question.optionTwo.text}
                    votesOption={votesOptionTwo}
                    votesAll={votesOptionOne+votesOptionTwo}
                    authedUserVote={authedUserVotedOptionTwo}
                />
            </div>
        )
    }
}

function mapStateToProps({questions, authedUser}, {questionId}) {
    const question = questions[questionId];
    return ({
        question,
        authedUser
    })
}

export default connect(mapStateToProps)(OptionsView)
