import React, {Component, Fragment} from "react";
import {handleInitialData} from "../actions/shared";
import {connect} from "react-redux";
import NewQuestion from "./NewQuestion";
import Login from "./Login";
import NavBar from "./NavBar";
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import Home from "./Home";
import LeaderBoard from "./LeaderBoard";
import Poll from "./Poll";
import Logout from "./Logout";
import NotFound from "./NotFound";

class App extends Component {

    componentDidMount() {
        this.props.dispatch(handleInitialData());
    }

    render() {
        const {loadingReady, authedUser} = this.props;
        const loggedIn = authedUser !== null;
        let content;
        if (!loadingReady) {
            content = <h3>Loading...</h3>;
        } else {
            if (!loggedIn) {
                content = <Login/>;
            } else {
                content = (
                    <Switch>
                        <Route path='/' exact component={Home}/>
                        <Route path='/add' component={NewQuestion}/>
                        <Route path='/leaderBoard' component={LeaderBoard}/>
                        <Route path='/questions/:question_id' render={() => (<Poll mode='voteOrDetail'/>)}/>
                        <Route path='/logout' component={Logout}/>
                        <Route component={NotFound}/>
                    </Switch>
                )
            }
        }
        return (
            <Router>
                <Fragment>
                    <div className='center container bg-green'>
                        <h3>'Would You Rather' App</h3>
                    </div>
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
