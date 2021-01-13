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

    submit(event) {
        event.preventDefault();
        this.props.dispatch(handleNewQuestion(this.state.optionOne, this.state.optionTwo));
        this.doInit();
    }

    render() {
        const {optionOne, optionTwo} = this.state;
        return (
            <div>
                <h3>New Question</h3>
                <div className='option'>
                    <div>Would you rather ...</div>
                    <input
                        type='text'
                        onChange={(evt) => this.onTextChange(evt, this.options.ONE)}
                        value={optionOne}
                    />
                </div>
                <div>or</div>
                <div className='option'>
                    <div>Would you rather ...</div>
                    <input
                        type='text'
                        onChange={(evt) => this.onTextChange(evt, this.options.TWO)}
                        value={optionTwo}
                    />
                </div>
                <button
                    type='submit'
                    onClick={(evnt) => this.submit(evnt)}
                    disabled={!this.bothOptionsSet()}
                >Submit</button>
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