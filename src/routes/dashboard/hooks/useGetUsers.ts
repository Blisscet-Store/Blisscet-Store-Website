import { useQuery } from "@tanstack/react-query"
import APIClient from "../../../services/UsersAPIClient"
import { user } from "../../../dto"

const apiClient = new APIClient<user>("/dashboard/users")

const useGetUsers = () => {
    return useQuery<user[], Error>({
        queryKey: ["users"],
        queryFn: apiClient.getAll,
    })
}

export default useGetUsers
