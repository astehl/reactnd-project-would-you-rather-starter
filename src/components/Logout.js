import {Component} from "react";
import {connect} from "react-redux";
import {logoutUser} from "../actions/authedUser";
import {Redirect} from "react-router-dom";

/**
 * @description Logout component
 * Removes the "authedUser" from app store and redirects to home screen.
 */
class Logout extends Component {

    componentDidMount() {
        this.props.dispatch(logoutUser());
    }

    render() {
        return <Redirect to='/'/>
    }
}

export default connect()(Logout)