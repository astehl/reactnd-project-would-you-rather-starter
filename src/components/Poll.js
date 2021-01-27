import React, {Component} from "react";
import {connect} from "react-redux";
import {Link, withRouter} from "react-router-dom";

class Poll extends Component {

    render() {
        const {question, author} = this.props;
        const {id, optionOne, optionsTwo} = question;
        const optionTeaser = optionOne.text.length > 20 ? optionOne.text.slice(0, 17) + '...' : optionOne.text;
        return (
            <Link to={`/questions/${id}`} className='poll'>
                <img
                    src={process.env.PUBLIC_URL + '/logo192.png'}
                    alt={`Avatar of ${author.name}`}
                    className='avatar'
                />
                <div className='poll-info'>
                    <div>
                        <span>{author.name} asks</span>
                        <div>Would you rather ...</div>
                        <p>{optionTeaser}</p>
                    </div>
                </div>
            </Link>
        )
    }
}

function mapStateToProps({questions, authedUser, users}, {id}) {
    const question = questions[id];
    const author = users[question.author];
    return ({
        question,
        authedUser,
        author
    })
}

export default withRouter(connect(mapStateToProps)(Poll))
