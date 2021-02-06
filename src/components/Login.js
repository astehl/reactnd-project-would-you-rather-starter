import {Component} from "react";
import {connect} from "react-redux";
import User from "./User";
import {loginUser} from "../actions/authedUser";

/**
 * @description Login component
 * Renders a list of all users in the system. Each user item can be selected to login.
 * The so logged-in user will be set as the "authedUser" in app store.
 */
class Login extends Component {

    state = {
        uid: ''
    }

    selectAuthedUser(uid) {
        this.setState({
            uid
        })
    }

    doLogin() {
        this.props.dispatch(loginUser(this.state.uid));
    }

    render() {
        const {userIds} = this.props;
        const selectedUid = this.state.uid;
        return (
            <div className='center'>
                <h3>Login as ...</h3>
                <ul>
                    {userIds.map((uid) =>
                        <User
                            key={uid}
                            id={uid}
                            selected={selectedUid === uid}
                            onSelect={(uid) => this.selectAuthedUser(uid)}
                        />
                    )}
                </ul>
                <button
                    className='btn'
                    onClick={() => this.doLogin()}
                    disabled={selectedUid === ''}
                >Login</button>
            </div>
        )
    }
}

function mapStateToProps({users}) {
    return {
        userIds: Object.keys(users)
    }
}

export default connect(mapStateToProps)(Login)