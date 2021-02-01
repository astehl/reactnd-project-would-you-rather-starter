export default function Avatar(props) {

    const {user} = props;

    return (
        <img
            src={process.env.PUBLIC_URL + user.avatarURL}
            alt={`Avatar of ${user.name}`}
            className='avatar'
        />
    )
}
