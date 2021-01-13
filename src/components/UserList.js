import {Component} from "react";
import {connect} from "react-redux";
import User from "./User";
import {setAuthedUser} from "../actions/authedUser";

class UserList extends Component {

    selectAuthedUser(uid) {
        console.log('user was selected', uid);
        this.props.dispatch(setAuthedUser(uid));
    }

    render() {
        const {userIds} = this.props;
        return (
            <div>
                <h3>User List</h3>
                <ul>
                    {userIds.map((uid) =>
                        <User
                            key={uid}
                            id={uid}
                            onUserClicked={(uid) => this.selectAuthedUser(uid)}
                        />
                    )}
                </ul>
            </div>
        )
    }
}

function mapStateToProps({users}) {
    return {
        userIds: Object.keys(users)
    }
}

export default connect(mapStateToProps)(UserList)