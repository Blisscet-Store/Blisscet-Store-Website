import { useMutation, useQueryClient } from "@tanstack/react-query"
import ProductsAPIClient from "../../../services/ProductsAPIClient"
import { Products } from "../../../dto"

const apiClient = new ProductsAPIClient("/products")

interface CustomError extends Error {
    response?: {
        data: {
            message: string
        }
    }
}

const usePostProductToCart = () => {
    const querClient = useQueryClient()
    return useMutation<Products, CustomError, Products>({
        mutationFn: apiClient.post,
        onSuccess: () => {
            querClient.invalidateQueries({
                queryKey: ["userCart"],
            })
        },
    })
}

export default usePostProductToCart
