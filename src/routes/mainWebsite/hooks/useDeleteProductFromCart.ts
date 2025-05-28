import { useMutation, useQueryClient } from "@tanstack/react-query"
import ProductsAPIClient from "../../../services/ProductsAPIClient"
import { Products } from "../../../dto"

const apiClient = new ProductsAPIClient("/cart")

interface CustomError extends Error {
    response?: {
        data: {
            message: string
        }
    }
}

const useDeleteProductFromCart = () => {
    const querClient = useQueryClient()
    return useMutation<Products, CustomError, Products>({
        mutationFn: apiClient.delete,
        onSuccess: () => {
            querClient.invalidateQueries({
                queryKey: ["userCart"],
            })
        },
    })
}

export default useDeleteProductFromCart
