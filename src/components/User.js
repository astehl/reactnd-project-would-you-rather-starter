import {Component} from "react";
import {connect} from "react-redux";
import PropTypes from "prop-types";
import Avatar from "./Avatar";

class User extends Component {
    static propTypes = {
        id: PropTypes.string.isRequired,
        selected: PropTypes.bool,
        onSelect: PropTypes.func
    }

    onClick = (evt, uid) => {
        evt.preventDefault();
        if (this.props.selected) {
            return;
        }
        const handler = this.props.onSelect;
        if (handler) {
            handler(uid);
        }
    }

    render() {
        const {user, selected} = this.props;

        return (
            <div className={'user' + (selected ? ' selected' : '')}
                 onClick={(evt) => this.onClick(evt, user.id)}>
                <Avatar user={user}/>
                <div className='user-info'>
                    <h4>{user.name}</h4>
                </div>
            </div>
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