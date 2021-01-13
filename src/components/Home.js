import {connect} from "react-redux";
import {Component} from "react";

class Home extends Component {
    render() {
        return (
            <div>Home</div>
        )
    }
}

export default connect()(Home)