import React, {Component} from "react";
import {connect} from "react-redux";
import Option from "./Option";
import {handleAnswerQuestion} from "../actions/questions";
import {alreadyAnswered} from "../utils/utils";

class OptionsView extends Component {

    handleOptionClick = (opt) => {
        const {question, authedUser} = this.props;
        if (alreadyAnswered(question, authedUser)) {
            // TODO implement toggle Answer
            return;
        }
        const option = opt === 'one' ? 'optionOne' : 'optionTwo';
        this.props.dispatch(handleAnswerQuestion({
            id: question.id,
            option,
            authedUser
        }));
    }

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
                    onClick={() => this.handleOptionClick("one")}
                />
                <Option
                    optionText={question.optionTwo.text}
                    votesOption={votesOptionTwo}
                    votesAll={votesOptionOne+votesOptionTwo}
                    authedUserVote={authedUserVotedOptionTwo}
                    onClick={() => this.handleOptionClick("two")}
                />
            </div>
        )
    }
}

function mapStateToProps({questions, authedUser}, props) {
    const {question_id} = props.match.params
    const question = questions[question_id];
    return ({
        question,
        authedUser
    })
}

export default connect(mapStateToProps)(OptionsView)
