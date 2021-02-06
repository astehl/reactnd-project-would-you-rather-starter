/**
 * @description NotFound component
 * NotFound info which rendered whenever a not existing link or route is requested by the user.
 */
export default function NotFound({location}) {
    return <h3>Sorry, but nothing found under route <code>{location.pathname} :-(</code></h3>
}
