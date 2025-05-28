import { useEffect, useState } from "react";
import "../styles.css";
import { motion } from "framer-motion";
import authLogo from "../assets/images/Blisscuit_Logo_Icon.png";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast, ToastContainer } from "react-toastify";
import useRegister from "./hooks/useRegister";
import { register } from "../dto";
import useAuth from "./hooks/useAuth";

const registerSchema = z.object({
    username: z
        .string()
        .regex(/^[a-zA-Z0-9]*$/, {
            message: "username must contain only letters and numbers",
        })
        .trim()
        .min(3, { message: "username must be at least 3 characters" })
        .max(20, { message: "username must not be at most 20 characters" }),
    firstName: z
        .string()
        .min(3, { message: "First name must be at least 3 characters" })
        .max(20, { message: "First name must not be at most 20 characters" }),
    lastName: z
        .string()
        .min(3, { message: "Last name must be at least 3 characters" })
        .max(20, { message: "Last name must not be more than 20 characters" }),
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
        .string()
        .min(8, { message: "Password must be at least 8 characters" })
        .max(32, { message: "Password must be at most 32 characters" })
        .regex(/[0-9]/, { message: "Must contain at least one number" }),
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

type RegisterFormData = z.infer<typeof registerSchema>;

const Register = () => {
    // validation with zod
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<RegisterFormData>({
        resolver: zodResolver(registerSchema),
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
    const registerUser = useRegister();

    // regstering notifcation
    const handleRegister = async (data: RegisterFormData) => {
        toast.info("Signing up...", {
            autoClose: false,
            toastId: "signup-notification",
            isLoading: true,
        });

        // Call the mutation
        registerUser.mutate(data as register, {
            onSuccess: (data: register) => {
                localStorage.setItem("userData", JSON.stringify(data));
                if (!data.token) {
                    toast.update("signup-notification", {
                        render: "Signup successful but no token received. Please try again.",
                        type: "warning",
                        isLoading: false,
                        autoClose: 3000,
                    });
                    return;
                }

                toast.update("signup-notification", {
                    className: "toast-success",
                    render: "Sign up successfully!",
                    type: "success",
                    isLoading: false,
                    autoClose: 1000,
                });
            },
            onError: (error: any) => {
                toast.update("signup-notification", {
                    render: error.response?.data.message || "Sign up failed!",
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

    // return inside register component
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
                initial={{ transform: "translateY(-20px)" }}
                animate={{ transform: "translateY(0px)" }}
                transition={{ duration: 0.8 }}
            >
                <div className="authPage">
                    <div className="authPageStyle">
                        <div className="authHeaderTypeWLogo">
                            <div>Sign Up</div>
                            <img src={authLogo} className="authLogo" />
                        </div>
                        <form
                            onSubmit={handleSubmit((data) => {
                                handleRegister(data);
                                reset();
                            })}
                            className="authForm"
                        >
                            {/* username Label */}
                            <label
                                className="authInputLabel"
                                htmlFor="username"
                            >
                                <div className="authInputExplenation">
                                    username
                                </div>
                                <input
                                    {...register("username")}
                                    type="text"
                                    id="username"
                                    className={
                                        errors.username
                                            ? "authInput-A"
                                            : "authInput"
                                    }
                                    placeholder="Enter Your username"
                                />
                                <div
                                    className={
                                        errors.username
                                            ? "authInputErrHandler-A"
                                            : "authInputErrHandler"
                                    }
                                >
                                    {errors.username && errors.username.message}
                                    .
                                </div>
                            </label>

                            {/* First Name Label */}
                            <label
                                className="authInputLabel"
                                htmlFor="firstName"
                            >
                                <div className="authInputExplenation">
                                    First Name
                                </div>
                                <input
                                    {...register("firstName")}
                                    type="text"
                                    id="firstName"
                                    className={
                                        errors.firstName
                                            ? "authInput-A"
                                            : "authInput"
                                    }
                                    placeholder="Enter Your First Name"
                                />
                                <div
                                    className={
                                        errors.firstName
                                            ? "authInputErrHandler-A"
                                            : "authInputErrHandler"
                                    }
                                >
                                    {errors.firstName &&
                                        errors.firstName.message}
                                    .
                                </div>
                            </label>

                            {/* Last Name Label */}
                            <label
                                className="authInputLabel"
                                htmlFor="lastName"
                            >
                                <div className="authInputExplenation">
                                    Last Name
                                </div>
                                <input
                                    {...register("lastName")}
                                    type="text"
                                    id="lastName"
                                    className={
                                        errors.lastName
                                            ? "authInput-A"
                                            : "authInput"
                                    }
                                    placeholder="Enter Your Last Name"
                                />
                                <div
                                    className={
                                        errors.lastName
                                            ? "authInputErrHandler-A"
                                            : "authInputErrHandler"
                                    }
                                >
                                    {errors.lastName && errors.lastName.message}
                                    .
                                </div>
                            </label>

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

                            {/* Password Label */}
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
                            <button className="authSubmitBtn">Sign Up</button>
                            <Link to={"/login"}>
                                <button className="authSwitchType">
                                    Log in instead
                                </button>
                            </Link>
                        </form>
                    </div>
                </div>
            </motion.div>
        </>
    );
};

export default Register;
