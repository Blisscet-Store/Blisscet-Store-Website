import { Navigate, Outlet } from "react-router-dom";
import "../styles.css";
import useAuth from "../Authentication/hooks/useAuth";

const PrivateRoutes = () => {
    const { user } = useAuth();
    if (!user) {
        return <Navigate to="/login" />;
    } else {
        return <Outlet />;
    }
};

export default PrivateRoutes;
