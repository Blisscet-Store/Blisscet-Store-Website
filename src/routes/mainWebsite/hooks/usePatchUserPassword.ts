import { useMutation, useQueryClient } from "@tanstack/react-query";
import UsersAPIClient from "../../../services/UsersAPIClient";
import { updatePassword } from "../../../dto";

const apiClient = new UsersAPIClient<updatePassword>("/userSettings");

interface CustomError extends Error {
    response?: {
        data: {
            message: string;
        };
    };
}

const usePatchUserPassword = () => {
    const querClient = useQueryClient();
    return useMutation<updatePassword, CustomError, updatePassword>({
        mutationFn: apiClient.updatePassword,
        onSuccess: () => {
            querClient.invalidateQueries({
                queryKey: ["users"],
            });
        },
    });
};

export default usePatchUserPassword;
