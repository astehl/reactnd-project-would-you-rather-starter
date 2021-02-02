export default function Avatar(props) {

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
