import "../../tailwind.css"
import useGetUsers from "./hooks/useGetUsers"

const DashBoard = () => {
    const { data: users, isLoading, error } = useGetUsers()
    return (
        <>
            {error && <div>{error.message}</div>}
            {isLoading && <div>Loading...</div>}
            {users?.map((user) => (
                <div key={user._id}>
                    <div>username: {user.username}</div>
                    <div>email: {user.email}</div>
                </div>
            ))}
        </>
    )
}

export default DashBoard
