import { useQuery } from "@tanstack/react-query"
import UsersAPIClient from "../../../services/UsersAPIClient"
import { Products } from "../../../dto"

const apiClient = new UsersAPIClient<Products>("/cart")

interface CustomError extends Error {
    response?: {
        data: {
            message: string
        }
    }
}

const useGetUserCart = () => {
    return useQuery<Products[], CustomError>({
        queryKey: ["userCart"],
        queryFn: apiClient.getAll,
    })
}

export default useGetUserCart
