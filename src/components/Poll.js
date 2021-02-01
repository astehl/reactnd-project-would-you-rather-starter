import React, {Component, Fragment} from "react";
import {connect} from "react-redux";
import {Redirect, withRouter} from "react-router-dom";
import {handleAnswerQuestion} from "../actions/questions";

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
        console.log('submitting vote', info);
        dispatch(handleAnswerQuestion(info));
    }

    render() {
        const {question, author, mode, user} = this.props;
        console.log('render', question, mode);
        const {id, optionOne, optionsTwo} = question;
        if (this.state.toViewPoll) {
            return <Redirect to={`/questions/${id}`}/>
        }
        let content;
        let viewMode = mode;
        if (mode === 'voteOrDetail') {
            viewMode = Object.keys(user.answers).includes(question.id) ? 'detail' : 'vote';
        }
        switch (viewMode) {
            case 'detail':
                content = (
                    <Fragment>
                        <div className='poll-option'>
                            <div>Vote Option1</div>
                            <div>Details Option1</div>
                        </div>
                        <div className='poll-option'>
                            <div>Vote Option2</div>
                            <div>Details Option2</div>
                        </div>
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
                const optionTeaser = optionOne.text.length > 40 ? optionOne.text.slice(0, 37) + '...' : optionOne.text;
                content = (
                    <div>
                        <p>{optionTeaser}</p>
                        <button className='btn' onClick={this.handleViewPoll}>View Poll</button>
                    </div>
                );
        }
        return (
            <div className='poll'>
                <img
                    src={process.env.PUBLIC_URL + '/logo192.png'}
                    alt={`Avatar of ${author.name}`}
                    className='avatar'
                />
                <div className='poll-info'>
                    <span>{author.name} asks</span>
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
