import { useMutation, useQueryClient } from "@tanstack/react-query";
import UsersAPIClient from "../../../services/UsersAPIClient";

const apiClient = new UsersAPIClient<string>("/userSettings");

interface CustomError extends Error {
    response?: {
        data: {
            message: string;
        };
    };
}

const useDeleteUser = () => {
    const queryClient = useQueryClient();
    return useMutation<string, CustomError, string>({
        mutationFn: apiClient.delete,
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["users"],
            });
        },
    });
};

export default useDeleteUser;
