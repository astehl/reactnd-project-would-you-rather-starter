import {Component} from "react";
import {connect} from "react-redux";
import PropTypes from "prop-types";

class User extends Component {
    static propTypes = {
        id: PropTypes.string.isRequired,
        onUserClicked: PropTypes.func
    }

    onClick(evt, uid) {
        evt.preventDefault();
        const handler = this.props.onUserClicked;
        if (handler) {
            handler(uid);
        }
    }

    render() {
        const {user} = this.props;
        return (
            <li
                className='option'
                onClick={(evt) => this.onClick(evt, user.id)}
            >{user.name}</li>
        )
    }
}

function mapStateToProps({users}, props) {
    const user = users[props.id];
    return {
        user
    }
}

export default connect(mapStateToProps)(User)