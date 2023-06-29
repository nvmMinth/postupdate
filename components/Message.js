export default function Message({ children, avatar, username, description, timestamp }) {
    const time =
        new Date(
            timestamp?.seconds * 1000 +
            timestamp?.nanoseconds / 1000
        ).toLocaleString()

    return (
        <div className="bg-white p-8 drop-shadow-lg rounded-lg mb-4">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <img src={avatar} alt='avatar' className="rounded-full w-10" />
                    <h2 className="font-bold">{username}</h2>
                </div>
                <div>
                    {time && <small>{time}</small>}
                </div>
            </div>
            <div className="pt-4">
                <p>{description}</p>
            </div>
            {children}
        </div>
    )
}