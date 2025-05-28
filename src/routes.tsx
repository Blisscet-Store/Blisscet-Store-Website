import { createBrowserRouter } from "react-router-dom"
import Home from "./routes/Home"
import DashBoard from "./routes/dashboard/DashBoard"
import MainPage from "./routes/mainWebsite/pages/MainPage"
import Products from "./routes/mainWebsite/pages/Products"
import UserSettings from "./routes/mainWebsite/pages/UserPage"
import ErrPage from "./components/ErrPage"
import UserCart from "./routes/mainWebsite/pages/UserCart"
import Login from "./Authentication/Login"
import Register from "./Authentication/Register"
import PrivateRoutes from "./routes/PrivateRoutes"
import PrivateDashboard from "./routes/PrivateDashboard"
import Err403Dashboard from "./components/Err403Dashboard"      

const router = createBrowserRouter([
    // Private Routes
    {
        element: <PrivateRoutes />,
        children: [
            // Main Website
            {
                path: "/",
                element: <Home />,
                errorElement: <ErrPage />,
                children: [
                    { index: true, element: <MainPage /> },
                    { path: "products", element: <Products /> },
                    { path: `userSettings`, element: <UserSettings /> },
                    { path: `cart`, element: <UserCart /> },
                ],
            },

            // private dashboard
            {
                element: <PrivateDashboard />,
                children: [
                    // dashboard
                    {
                        path: "/dashboard/",
                        element: <DashBoard />,
                        errorElement: <ErrPage />,
                        children: [
                            { index: true, element: <h1>Dashboard</h1> },
                            { path: "admins", element: <h1>Admins</h1> },
                            { path: "users", element: <h1>Users</h1> },
                            { path: "products", element: <h1>Products</h1> },
                            { path: "myAccount", element: <h1>myAccount</h1> },
                        ],
                    },
                ],
            },

            {},
        ],
    },

    // Auth
    { path: "/accessForbidden", element: <Err403Dashboard /> },
    { path: `/login`, element: <Login /> },
    { path: `/register`, element: <Register /> },
])

export default router
