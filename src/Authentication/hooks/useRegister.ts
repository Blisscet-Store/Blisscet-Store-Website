import { useMutation, useQueryClient } from "@tanstack/react-query"
import UserAPIClient from "../../services/UsersAPIClient"
import { register } from "../../dto"

interface CustomError extends Error {
    response?: {
        data: {
            message: string
        }
    }
}

const apiClient = new UserAPIClient<register>("/register")

const useRegister = () => {
    const querClient = useQueryClient()
    return useMutation<register, CustomError, register>({
        mutationFn: apiClient.post,
        onSuccess: () => {
            querClient.invalidateQueries({
                queryKey: ["users"],
            })
        },
    })
}

export default useRegister
