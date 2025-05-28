import { useMutation, useQueryClient } from "@tanstack/react-query"
import UserAPIClient from "../../services/UsersAPIClient"
import { login } from "../../dto"

interface CustomError extends Error {
    response?: {
        data: {
            message: string
        }
    }
}

const apiClient = new UserAPIClient<login>("/login")

const useLogin = () => {
    const querClient = useQueryClient()
    return useMutation<login, CustomError, login>({
        mutationFn: apiClient.post,
        onSuccess: () => {
            querClient.invalidateQueries({
                queryKey: ["users"],
            })
        },
    })
}

export default useLogin
