import React, {Component, Fragment} from "react";
import {connect} from "react-redux";
import {Redirect, withRouter} from "react-router-dom";
import {handleAnswerQuestion} from "../actions/questions";
import Option from "./Option";
import Avatar from "./Avatar";

class Poll extends Component {

    state = {
        toViewPoll: false,
        option: ''
    }

    handleViewPoll = (evt) => {
        evt.preventDefault();
        this.setState({
            toViewPoll: true
        });
    }

    onVoteOptionChange = (evt) => {
        const newOption = evt.target.value === 'opt1' ? 'optionOne' : 'optionTwo';
        this.setState(() => ({
            option: newOption
        }));
    }

    onSubmitVote = (evt) => {
        evt.preventDefault();
        const {question, user, dispatch} = this.props;
        const info = {
            id: question.id,
            option: this.state.option,
            authedUser: user.id
        }
        dispatch(handleAnswerQuestion(info));
    }

    authorIsCurrentUser = () => {
        const {question, user} = this.props;
        return question.author === user.id;
    }

    render() {
        const {question, author, mode, user} = this.props;
        const qid = question.id;
        if (this.state.toViewPoll) {
            return <Redirect to={`/questions/${qid}`}/>
        }
        let content;
        let viewMode = mode;
        if (mode === 'voteOrDetail') {
            viewMode = Object.keys(user.answers).includes(qid) ? 'detail' : 'vote';
        }
        let ask = this.authorIsCurrentUser() ?  "You ask" : author.name + ' asks';
        switch (viewMode) {
            case 'detail':
                ask = 'asked by ' + (this.authorIsCurrentUser() ?  "you" : author.name);
                content = (
                    <Fragment>
                        <Option question={question} option='optionOne' authedUser={user.id}/>
                        <Option question={question} option='optionTwo' authedUser={user.id}/>
                    </Fragment>
                )
                break;
            case 'vote':
                content = (
                    <form onSubmit={this.onSubmitVote}>
                        <div>
                            <input type="radio" id='opt1' name="option" value="opt1" onChange={this.onVoteOptionChange}/>
                            <label htmlFor='opt1'>{question.optionOne.text}</label>
                        </div>
                        <div>
                            <input type="radio" id='opt2' name="option" value="opt2" onChange={this.onVoteOptionChange}/>
                            <label htmlFor='opt1'>{question.optionTwo.text}</label>
                        </div>
                        <button
                            className='btn'
                            type='submit'>
                            Submit
                        </button>
                    </form>
                )
                break;
            default:
                const optionOneText = question['optionOne'].text;
                const optionTeaser = optionOneText.length > 40 ? optionOneText.slice(0, 37) + '...' : optionOneText;
                content = (
                    <div>
                        <p>{optionTeaser}</p>
                        <button className='btn' onClick={this.handleViewPoll}>View Poll</button>
                    </div>
                );
        }
        return (
            <div className='poll'>
                <Avatar user={author}/>
                <div className='poll-info'>
                    <span>{ask}</span>
                    <h3>Would you rather ...</h3>
                    {content}
                </div>
            </div>
        )
    }
}

function mapStateToProps({questions, authedUser, users}, props) {
    const {question_id} = props.match.params
    const theId = props.id || question_id;
    const question = questions[theId];
    const author = users[question.author];
    const user = users[authedUser];
    return ({
        question,
        user,
        author,
        mode: props.mode
    })
}

export default withRouter(connect(mapStateToProps)(Poll))
