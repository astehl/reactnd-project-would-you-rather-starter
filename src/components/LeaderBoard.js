import {connect} from "react-redux";
import {Component} from "react";
import UserScore from "./UserScore";

class LeaderBoard extends Component {

    computeScore = (user) => {
        const countQuestions = user.questions.length;
        const countAnswers = Object.keys(user.answers).length;
        return countAnswers + countQuestions;
    }

    render() {
        const {users} = this.props;
        const orderedUsers = Object.values(users)
            .sort((a, b) => this.computeScore(b) - this.computeScore(a));
        return (
            <div>
                <h3>Leader Board</h3>
                <ul className='dashboard-list'>
                    {orderedUsers.map((user) => (
                        <li key={user.id}>
                            <UserScore user={user}/>
                        </li>
                    ))}
                </ul>
            </div>
        )
    }

}

function mapStateToProps({users}) {
    return {
        users
    }
}

export default connect(mapStateToProps)(LeaderBoard)