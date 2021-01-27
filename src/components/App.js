import React, {Component, Fragment} from "react";
import {handleInitialData} from "../actions/shared";
import {connect} from "react-redux";
import OptionsView from "./OptionsView";
import NewQuestion from "./NewQuestion";
import Login from "./Login";
import NavBar from "./NavBar";
import {BrowserRouter as Router, Route} from "react-router-dom";
import Home from "./Home";
import LeaderBoard from "./LeaderBoard";

class App extends Component {

    componentDidMount() {
        this.props.dispatch(handleInitialData());
    }

    render() {
        const {loadingReady, authedUser} = this.props;
        const loggedIn = authedUser !== null;
        console.log(`app render. loadingReady=${loadingReady} loggedIn=${loggedIn}`);
        let content = '';
        if (!loadingReady) {
            content = <h3>Loading...</h3>;
        } else {
            if (!loggedIn) {
                content = <Login/>;
            } else {
                content = (
                    <Fragment>
                        <Route path='/' exact component={Home}/>
                        <Route path='/add' component={NewQuestion}/>
                        <Route path='/leaderBoard' component={LeaderBoard}/>
                        <Route path='/questions/:question_id' component={OptionsView}/>
                    </Fragment>
                )
            }
        }
        return (
            <Router>
                <Fragment>
                    <div className='container'>
                        <NavBar/>
                        {content}
                    </div>
                </Fragment>
            </Router>
        );
    }
}

function mapStateToProps({loadingBar, authedUser}) {
    return {
        loadingReady: loadingBar && loadingBar.default === 0,
        authedUser
    }
}

export default connect(mapStateToProps)(App)
