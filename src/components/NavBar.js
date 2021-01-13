import {NavLink} from "react-router-dom";
import {connect} from "react-redux";
import {Fragment} from "react";

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
                            Current user: {props.user.name}
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