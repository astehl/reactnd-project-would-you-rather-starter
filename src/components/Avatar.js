import PropTypes from 'prop-types';

/**
 * @description Avatar component
 * Renders the Avatar portion in user's info
 *
 * @param {object} user - the user to render avatar from
 * @param {string} type - drives the css class to select. if "small", the small avatar version will be used. Otherwise the normal one.
 */
function Avatar(props) {

    const {user, type} = props;

    const className = (type === 'small') ? 'avatar-small' : 'avatar';
    return (
        <img
            src={process.env.PUBLIC_URL + user.avatarURL}
            alt={`Avatar of ${user.name}`}
            className={className}
        />
    )
}

Avatar.propTypes = {
    user: PropTypes.object.isRequired,
    type: PropTypes.string
};

export default Avatar