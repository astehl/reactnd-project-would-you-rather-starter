import {NavLink} from "react-router-dom";
import {Fragment} from "react";
import Avatar from "./Avatar";
import {connect} from "react-redux";

function NavBar(props) {
    const loggedIn = props.user !== null;
    console.log('nav bar user:', props.user, 'loggedIn', loggedIn);
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
                    <li>
                        <span>User: {props.user.name}</span><Avatar user={props.user} type='small'/>
                    </li>
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