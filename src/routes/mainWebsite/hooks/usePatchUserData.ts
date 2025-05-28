import { useMutation, useQueryClient } from "@tanstack/react-query";
import UsersAPIClient from "../../../services/UsersAPIClient";
import { updateUser } from "../../../dto";
import axios from "axios";

const apiClient = new UsersAPIClient<updateUser>("/userSettings");

interface CustomError extends Error {
    response?: {
        data: {
            message: string;
        };
    };
}

const usePatchUserData = () => {
    const queryClient = useQueryClient();

    return useMutation<updateUser, CustomError, updateUser>({
        mutationFn: apiClient.update,
        onSuccess: async () => {
            // Invalidate queries to refresh data
            queryClient.invalidateQueries({
                queryKey: ["users"],
            });

            try {
                // Get the current user data from localStorage
                const userDataStr = localStorage.getItem("userData");
                if (!userDataStr) return;

                const userData = JSON.parse(userDataStr);

                // Get the auth token
                const token = userData.token;
                if (!token) return;

                // Fetch the updated user data
                const response = await axios.get(
                    "http://localhost:3000/userSettings",
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );

                if (response.data) {
                    // Create updated user data object, preserving the token
                    const updatedUserData = {
                        ...userData,
                        ...response.data,
                    };

                    // Update localStorage
                    localStorage.setItem(
                        "userData",
                        JSON.stringify(updatedUserData)
                    );
                }
            } catch (error) {
                console.error(
                    "Failed to update user data in localStorage:",
                    error
                );
            }
        },
    });
};

export default usePatchUserData;
