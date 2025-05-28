import "../styles.css";
import logo from "../assets/images/Blisscuit_Logo_Icon.png";
import { FaShoppingCart } from "react-icons/fa";
import useAuth from "../Authentication/hooks/useAuth";
import { Link, useLocation } from "react-router-dom";
import { useState } from "react";
import useGetUserCart from "../routes/mainWebsite/hooks/useGetUserCartData";

const Navbar = () => {
    // current path for active link
    const location = useLocation();
    const currentPath = location.pathname;

    // get user data
    const { user } = useAuth();

    // show routes in navbar after 600px width
    const [isNavSmall, setNavSmall] = useState(false);

    // logout function
    const logout = () => {
        localStorage.removeItem("userData");
        window.location.href = "/login";
    };

    // get user cart length
    const { data: userCart } = useGetUserCart();

    return (
        <>
            <div className="navbar">
                <div className="navbarStyle">
                    {/* Logo and name */}
                    <Link to={"/"}>
                        <div className="navLogoWName">
                            <img src={logo} alt="logo" className="navLogo" />
                            <div>Blisscuit</div>
                        </div>
                    </Link>
                    {/* Routes before 600px width */}
                    <div className="navRoutes">
                        {/* dashboard route */}
                        {user.admin ? (
                            <Link to={"/dashboard"}>
                                <div className="navDashboard">dashboard</div>
                            </Link>
                        ) : null}

                        {/* product route */}
                        <Link to={"/products"}>
                            <div
                                className={
                                    currentPath === "/products"
                                        ? "navProducts navProducts-A"
                                        : "navProducts"
                                }
                            >
                                Products
                            </div>
                        </Link>

                        {/* cart */}
                        <Link to={"/cart"}>
                            <div
                                className={
                                    currentPath === "/cart"
                                        ? "navCart navCart-A"
                                        : "navCart"
                                }
                            >
                                <div>Cart ({userCart?.length})</div>
                                <FaShoppingCart
                                    className="navIconCart"
                                    size={25}
                                />
                            </div>
                        </Link>

                        {/* User avatar with userSettings */}
                        <Link to={"/userSettings"}>
                            <div
                                className={
                                    currentPath === "/userSettings"
                                        ? "navUser navUser-A"
                                        : "navUser"
                                }
                            >
                                <img
                                    src={user.userAvatar.url}
                                    className="userImg"
                                />
                            </div>
                        </Link>

                        <button className="LogoutBtn" onClick={logout}>
                            Logout
                        </button>
                    </div>
                    {/* Sandwich Btn */}
                    <div
                        className="navSandwich"
                        onClick={() => setNavSmall(!isNavSmall)}
                    >
                        <div className={isNavSmall ? "SWLine1" : ""}></div>
                        <div className={isNavSmall ? "SWLine2" : ""}></div>
                        <div className={isNavSmall ? "SWLine3" : ""}></div>
                    </div>
                </div>
            </div>
            {/* Routes after 600px width */}
            <div
                className={
                    isNavSmall ? "navRoutesAf6 navRoutesAf6-A" : "navRoutesAf6"
                }
            >
                {/* dashboard route */}
                {user.admin ? (
                    <Link to={"/dashboard"}>
                        <div className="navDashboard">dashboard</div>
                    </Link>
                ) : null}

                {/* product route */}
                <Link to={"/products"}>
                    <div
                        className={
                            currentPath === "/products"
                                ? "navProducts navProducts-A"
                                : "navProducts"
                        }
                    >
                        Products
                    </div>
                </Link>

                {/* cart */}
                <Link to={"/cart"}>
                    <div
                        className={
                            currentPath === "/cart"
                                ? "navCart navCart-A"
                                : "navCart"
                        }
                    >
                        <div>Cart ({userCart?.length})</div>
                        <FaShoppingCart className="navIconCart" size={25} />
                    </div>
                </Link>

                {/* User avatar with userSettings */}
                <Link to={"/userSettings"}>
                    <div
                        className={
                            currentPath === "/userSettings"
                                ? "navUser navUser-A"
                                : "navUser"
                        }
                    >
                        <img src={user.userAvatar.url} className="userImg" />
                    </div>
                </Link>

                <button className="LogoutBtn LogoutBtnAf6" onClick={logout}>
                    Logout
                </button>
            </div>
        </>
    );
};

export default Navbar;
