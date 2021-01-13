import React, {Component, Fragment} from "react";
import {handleInitialData} from "../actions/shared";
import {connect} from "react-redux";
import OptionsView from "./OptionsView";
import NewQuestion from "./NewQuestion";

class App extends Component {

    componentDidMount() {
        this.props.dispatch(handleInitialData());
    }

    render() {
        const {loadingReady} = this.props;
        return (
            <Fragment>
                {loadingReady === false
                    ? <h3>Loading...</h3>
                    :
                    <div>
                        <h3>App</h3>
                        {/*<OptionsView questionId='vthrdm985a262al8qx3do'/>*/}
                        <NewQuestion/>
                    </div>
                }
            </Fragment>
        );
    }
}

function mapStateToProps({ loadingBar }) {
    return {
        loadingReady: loadingBar && loadingBar.default === 0
    }
}

export default connect(mapStateToProps)(App)
