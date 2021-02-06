import {NavLink} from "react-router-dom";
import {Fragment} from "react";
import Avatar from "./Avatar";
import {connect} from "react-redux";

function NavBar(props) {
    const loggedIn = props.user !== null;
    return (
        <nav className='nav'>
            <ul>
                <li>
                    <NavLink to='/' exact activeClassName='active'>
                        Home
                    </NavLink>
                </li>
                <li>
                    <NavLink to='/add' activeClassName='active'>
                        New Question
                    </NavLink>
                </li>
                <li>
                    <NavLink to='/leaderBoard' activeClassName='active'>
                        LeaderBoard
                    </NavLink>
                </li>
                {loggedIn &&
                    <Fragment>
                        <li className='filler'/>
                        <li>
                            <span>Welcome, {props.user.name}</span>
                        </li>
                        <li className='no-pad-left'><Avatar user={props.user} type='small'/></li>
                        <li>
                            <NavLink to='/logout' activeClassName='active'>
                                Logout
                            </NavLink>
                        </li>
                    </Fragment>
                }
            </ul>
        </nav>
    )
}

function mapStateToProps({authedUser, users}) {
    return {
        user: authedUser ? users[authedUser] : null
    }
}

export default connect(mapStateToProps)(NavBar)