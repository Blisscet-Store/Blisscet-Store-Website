import { Navigate, Outlet } from "react-router-dom";
import "../styles.css";
import useAuth from "../Authentication/hooks/useAuth";

const PrivateDashboard = () => {
    const { user } = useAuth();
    if (!user.admin) {
        return <Navigate to="/accessForbidden" replace={true} />;
    } else {
        return <Outlet />;
    }
};

export default PrivateDashboard;
