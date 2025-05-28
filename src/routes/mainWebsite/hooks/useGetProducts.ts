import { useQuery } from "@tanstack/react-query";
import ProductsAPIClient from "../../../services/ProductsAPIClient";
import { Products } from "../../../dto";

const apiClient = new ProductsAPIClient("/products");

const useGetProducts = () => {
    return useQuery<Products[], Error>({
        queryKey: ["products"],
        queryFn: apiClient.getAll,
    });
};

export default useGetProducts;
