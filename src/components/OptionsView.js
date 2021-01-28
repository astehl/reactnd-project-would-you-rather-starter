import React, {Component} from "react";
import {connect} from "react-redux";
import {handleAnswerQuestion} from "../actions/questions";
import {alreadyAnswered} from "../utils/utils";

class OptionsView extends Component {

    state = {
        option: 1
    }

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

    onSubmit = (evt) => {
        evt.preventDefault();
        console.log('you chose ' + this.state.option);
    }

    onOptionChange = (evt) => {
        const newOption = evt.target.value === 'opt1' ? 1 : 2;
        this.setState(() => {
            return {
                option: newOption
            }
        });
    }

    render() {
        const {question, user} = this.props;
        const votesOptionOne = question.optionOne.votes.length;
        const authedUserVotedOptionOne = question.optionOne.votes.includes(user.id);
        const votesOptionTwo = question.optionTwo.votes.length;
        const authedUserVotedOptionTwo = question.optionTwo.votes.includes(user.id);
        return (
            <div>
                <form onSubmit={this.onSubmit}>
                    <h3>Would you rather ...</h3>
                        <div>
                            <input type="radio" id='opt1' name="option" value="opt1" onChange={this.onOptionChange}/>
                            <label htmlFor='opt1'>{question.optionOne.text}</label>
                        </div>
                        <div>
                            <input type="radio" id='opt2' name="option" value="opt2" onChange={this.onOptionChange}/>
                            <label htmlFor='opt1'>{question.optionTwo.text}</label>
                        </div>
                        <button
                            className='btn'
                            type='submit'>
                            Submit
                        </button>
                </form>

            </div>

        )
    }
}

function mapStateToProps({questions, authedUser, users}, props) {
    const {question_id} = props.match.params
    const question = questions[question_id];
    const user = users[authedUser];
    return ({
        question,
        user
    })
}

export default connect(mapStateToProps)(OptionsView)
