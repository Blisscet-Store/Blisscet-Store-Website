import { user } from "../../dto"

const useAuth = () => {
    // Retrieve userData from localStorage
    const getUserDataFromLocalStorage = () => {
        const storedData = localStorage.getItem("userData")
        if (storedData) {
            try {
                return JSON.parse(storedData)
            } catch (error) {
                console.error(
                    "Failed to parse userData from localStorage:",
                    error
                )
            }
        }
        return null
    }

    const userData: user = getUserDataFromLocalStorage()

    return {
        user: userData,
    }
}

export default useAuth
