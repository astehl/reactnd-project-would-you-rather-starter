import {Component} from "react";
import {connect} from "react-redux";
import PropTypes from "prop-types";

class User extends Component {
    static propTypes = {
        id: PropTypes.string.isRequired,
        selected: PropTypes.bool,
        onSelect: PropTypes.func
    }

    onClick(evt, uid) {
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
            <li
                className={!selected ? 'option' : 'option option-selected'}
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