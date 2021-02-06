import {Component} from "react";
import {connect} from "react-redux";
import {handleNewQuestion} from "../actions/questions";
import {Redirect} from "react-router-dom";

/**
 * @description NewQuestion component
 * Provides form to add a new poll question to the system.
 * Author is the authed user provided by app store.
 *
 */
class NewQuestion extends Component {

    state = {
        optionOne: '',
        optionTwo: '',
        goHome: false
    }

    options = {
        ONE: 'ONE',
        TWO: 'TWO'
    }

    onTextChange(event, option) {
        const text1 = option === this.options.ONE ? event.target.value : this.state.optionOne;
        const text2 = option === this.options.TWO ? event.target.value : this.state.optionTwo;
        this.setState({
            optionOne: text1,
            optionTwo: text2
        })
    }

    handleSubmit = (event) => {
        event.preventDefault();
        this.props.dispatch(handleNewQuestion(this.state.optionOne, this.state.optionTwo));
        this.prepGoHome();
    }

    render() {
        const {optionOne, optionTwo, goHome} = this.state;
        if (goHome) {
            return <Redirect to='/'/>
        }
        return (
            <div>
                <h3 className='center'>Create new Question</h3>
                <h4 className='center'>Would you rather ...</h4>
                <form className='new-question' onSubmit={this.handleSubmit}>
                    <textarea
                        placeholder="Text for option one"
                        value={optionOne}
                        onChange={(evt) => this.onTextChange(evt, this.options.ONE)}
                        className='textarea'
                        maxLength={100}
                    />
                    <h4>OR</h4>
                    <textarea
                        placeholder="Text for option two"
                        value={optionTwo}
                        onChange={(evt) => this.onTextChange(evt, this.options.TWO)}
                        className='textarea'
                        maxLength={100}
                    />
                    <button
                        className='btn'
                        type='submit'
                        disabled={!this.bothOptionsSet()}>
                        Submit
                    </button>
                </form>
            </div>
        )
    }

    prepGoHome() {
        this.setState({
            goHome: true
        })
    }

    bothOptionsSet() {
        const {optionOne, optionTwo} = this.state;
        return optionOne.trim().length > 0 && optionTwo.trim().length > 0;
    }
}

function mapStateToProps({authedUser}) {
    return {
        authedUser
    }
}

export default connect(mapStateToProps)(NewQuestion)