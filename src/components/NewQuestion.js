import {Component} from "react";
import {connect} from "react-redux";
import {handleNewQuestion} from "../actions/questions";

class NewQuestion extends Component {

    state = {
        optionOne: '',
        optionTwo: ''
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

    submit = (event) => {
        event.preventDefault();
        this.props.dispatch(handleNewQuestion(this.state.optionOne, this.state.optionTwo));
        this.doInit();
    }

    render() {
        const {optionOne, optionTwo} = this.state;
        return (
            <div>
                <h3>Create new Question</h3>
                <h4>Would you rather ...</h4>
                <form onSubmit={this.submit}>
                    <input className='option'
                        type='text'
                        onChange={(evt) => this.onTextChange(evt, this.options.ONE)}
                        value={optionOne}
                    />
                    <div>or</div>
                    <input className='option'
                        type='text'
                        onChange={(evt) => this.onTextChange(evt, this.options.TWO)}
                        value={optionTwo}
                    />
                    <button
                        type='submit'
                        disabled={!this.bothOptionsSet()}>
                        Submit
                    </button>
                </form>
            </div>
        )
    }

    doInit() {
        this.setState({
            optionOne: '',
            optionTwo: ''
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