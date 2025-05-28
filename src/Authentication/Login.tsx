import "../styles.css";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import authLogo from "../assets/images/Blisscuit_Logo_Icon.png";
import useLogin from "./hooks/useLogin";
import { login } from "../dto";
import useAuth from "./hooks/useAuth";

const loginSchema = z.object({
    email: z
        .string()
        .min(5, { message: "Email must be at least 5 characters" })
        .max(100, { message: "Email must be at most 100 characters" })
        .email({ message: "Please enter a valid email address" })
        .refine(
            (email) =>
                email.endsWith("@gmail.com") || email.endsWith("@hotmail.com"),
            { message: "Only gmail.com or hotmail.com emails allowed" }
        ),
    password: z
        .string({ message: "This field is required" })
        .min(8, { message: "Password must be at least 8 characters" })
        .max(32, { message: "Password must be at most 32 characters" }),
    // .regex(/[0-9]/, { message: "Must contain at least one number" }),
    token: z.string().optional(),
    _id: z.string().optional(),
    username: z.string().optional(),
    firstName: z.string().optional(),
    lastName: z.string().optional(),
    userAvatar: z.object({ public_id: z.string(), url: z.string() }).optional(),
    cart: z
        .tuple([
            z.object({
                _id: z.string(),
                productImage: z.object({
                    public_id: z.string(),
                    url: z.string(),
                }),
                name: z.string(),
                category: z.string(),
                price: z.number(),
                count: z.number(),
            }),
        ])
        .optional(),
    admin: z.boolean().optional(),
});

type LoginFormData = z.infer<typeof loginSchema>;

const Login = () => {
    // validation with zod
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<LoginFormData>({
        resolver: zodResolver(loginSchema),
    });

    // show password function
    const [isPassword, setPassword] = useState(false);
    const showPasswordFun = () => {
        if (isPassword) {
            setPassword(false);
        } else {
            setPassword(true);
        }
    };

    // mutation with query
    const loginUser = useLogin();

    // logging notification
    const handleLogin = async (data: LoginFormData) => {
        toast.info("Logging in...", {
            autoClose: false,
            toastId: "login-notification",
            isLoading: true,
        });

        // Call the mutation
        loginUser.mutate(data as login, {
            onSuccess: (data: login) => {
                localStorage.setItem("userData", JSON.stringify(data));
                if (!data.token) {
                    toast.update("login-notification", {
                        render: "Login successful but no token received. Please try again.",
                        type: "warning",
                        isLoading: false,
                        autoClose: 3000,
                    });
                    return;
                }

                toast.update("login-notification", {
                    className: "toast-success",
                    render: "Login successfully!",
                    type: "success",
                    isLoading: false,
                    autoClose: 1000,
                });
            },
            onError: (error: any) => {
                toast.update("login-notification", {
                    render: error.response?.data.message || "Login failed!",
                    type: "error",
                    isLoading: false,
                    autoClose: 3000,
                });
            },
        });
    };

    // preventing going back to login page
    const { user } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (user) {
            navigate("/", { replace: true });
        }
    }, [user, navigate]);

    // return inside login component
    return (
        <>
            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
            />
            <div className="BG"></div>
            <motion.div
                className="AuthAnimate"
                initial={{ transform: "translateY(-25px)" }}
                animate={{ transform: "translateY(0px)" }}
                transition={{ duration: 0.8 }}
            >
                <div className="authPage">
                    <div className="authPageStyle">
                        <div className="authHeaderTypeWLogo">
                            <div>Log in</div>
                            <img src={authLogo} className="authLogo" />
                        </div>
                        <form
                            onSubmit={handleSubmit((data) => {
                                handleLogin(data);
                                reset();
                            })}
                            className="authForm"
                        >
                            {/* Email Label */}
                            <label className="authInputLabel" htmlFor="email">
                                <div className="authInputExplenation">
                                    Email
                                </div>
                                <input
                                    {...register("email")}
                                    type="text"
                                    id="email"
                                    className={
                                        errors.email
                                            ? "authInput-A"
                                            : "authInput"
                                    }
                                    placeholder="Enter Your email"
                                />
                                <div
                                    className={
                                        errors.email
                                            ? "authInputErrHandler-A"
                                            : "authInputErrHandler"
                                    }
                                >
                                    {errors.email && errors.email.message}.
                                </div>
                            </label>

                            {/* PassWord Label */}
                            <label
                                className="authInputLabel"
                                htmlFor="password"
                            >
                                <div className="authInputExplenation">
                                    Password
                                </div>
                                <input
                                    {...register("password")}
                                    type={isPassword ? "text" : "password"}
                                    id="password"
                                    className={
                                        errors.password
                                            ? "authInput-A"
                                            : "authInput"
                                    }
                                    placeholder="Enter Your password"
                                />
                                <div
                                    className="authShowPassword"
                                    onClick={showPasswordFun}
                                >
                                    {isPassword ? "Hide" : "Show"}
                                </div>
                                <div
                                    className={
                                        errors.password
                                            ? "authPasswordInputErrHandler-A"
                                            : "authPasswordInputErrHandler"
                                    }
                                >
                                    {errors.password && errors.password.message}
                                    .
                                </div>
                            </label>

                            {/* Submit Button */}
                            <button className="authSubmitBtn">Login</button>
                            <Link to={"/register"}>
                                <button className="authSwitchType">
                                    Sign Up instead
                                </button>
                            </Link>
                        </form>
                    </div>
                </div>
            </motion.div>
        </>
    );
};

export default Login;
