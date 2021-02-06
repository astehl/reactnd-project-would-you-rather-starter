import React, {Component, Fragment} from "react";
import {connect} from "react-redux";
import {Redirect, withRouter} from "react-router-dom";
import {handleAnswerQuestion} from "../actions/questions";
import Option from "./Option";
import Avatar from "./Avatar";
import PropTypes from 'prop-types';

class Poll extends Component {

    static propTypes = {
        id: PropTypes.string
    }

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
        const {question, author, mode, user, notFound, question_id} = this.props;
        if (notFound) {
            return <h3>Sorry, a question with id {question_id} can't be found :-(</h3>
        }
        const qid = question.id;
        if (this.state.toViewPoll) {
            return <Redirect to={`/questions/${qid}`}/>
        }
        let content;
        let headerText;
        let viewMode = mode;
        if (mode === 'voteOrDetail') {
            viewMode = Object.keys(user.answers).includes(qid) ? 'detail' : 'vote';
        }
        let ask = this.authorIsCurrentUser() ?  "You ask" : author.name + ' asks';
        switch (viewMode) {
            case 'detail':
                headerText = 'Poll results';
                ask = 'asked by ' + (this.authorIsCurrentUser() ?  "you" : author.name);
                content = (
                    <Fragment>
                        <Option question={question} option='optionOne' authedUser={user.id}/>
                        <Option question={question} option='optionTwo' authedUser={user.id}/>
                    </Fragment>
                )
                break;
            case 'vote':
                headerText = 'Please vote ...';
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
                headerText = '';
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
            <Fragment>
                <h3 className='center'>{headerText}</h3>
                <div className='poll'>
                    <Avatar user={author}/>
                    <div className='poll-info'>
                        <span>{ask}</span>
                        <h3>Would you rather ...</h3>
                        {content}
                    </div>
                </div>
            </Fragment>
        )
    }
}

function mapStateToProps({questions, authedUser, users}, props) {
    const {question_id} = props.match.params
    const theId = props.id || question_id;
    const question = questions[theId];
    const author = question ? users[question.author] : null;
    const user = question ? users[authedUser] : null;
    const notFound = !question;
    return ({
        question,
        user,
        author,
        mode: props.mode,
        notFound,
        question_id
    })
}

export default withRouter(connect(mapStateToProps)(Poll))
