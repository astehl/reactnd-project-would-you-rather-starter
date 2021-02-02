import {Component} from "react";
import {connect} from "react-redux";
import {logoutUser} from "../actions/authedUser";
import {Redirect} from "react-router-dom";

class Logout extends Component {

    componentDidMount() {
        this.props.dispatch(logoutUser());
    }

    render() {
        return <Redirect to='/'/>
    }
}

export default connect()(Logout)