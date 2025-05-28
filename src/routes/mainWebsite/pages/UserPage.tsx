import "../../../styles.css";
import useAuth from "../../../Authentication/hooks/useAuth";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { FaUserLock, FaUserEdit } from "react-icons/fa";
import { useState, useEffect } from "react";
import usePatchUserData from "../hooks/usePatchUserData";
import { updateUser } from "../../../dto";
import usePatchUserPassword from "../hooks/usePatchUserPassword";
import useDeleteUser from "../hooks/useDeleteUser";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

// Function to format date as "created X days/months/years ago"
const formatTimeAgo = (dateString: string): string => {
    const date = new Date(dateString);
    const now = new Date();

    // Calculate the difference in milliseconds
    const diffMs = now.getTime() - date.getTime();

    // Convert to days, months, years
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
    const diffMonths = Math.floor(diffDays / 30);
    const diffYears = Math.floor(diffDays / 365);

    if (diffYears > 0) {
        return `Created ${diffYears} ${diffYears === 1 ? "year" : "years"} ago`;
    } else if (diffMonths > 0) {
        return `Created ${diffMonths} ${
            diffMonths === 1 ? "month" : "months"
        } ago`;
    } else if (diffDays > 0) {
        return `Created ${diffDays} ${diffDays === 1 ? "day" : "days"} ago`;
    } else {
        return "Created today";
    }
};

const updateUserDataSchema = z.object({
    _id: z.string().optional(),
    username: z
        .string()
        .regex(/^[a-zA-Z0-9]*$/, {
            message: "username must contain only letters and numbers",
        })
        .trim()
        .min(3, { message: "username must be at least 3 characters" })
        .max(20, { message: "username must not be at most 20 characters" })
        .optional(),
    firstName: z
        .string()
        .min(3, { message: "First name must be at least 3 characters" })
        .max(20, { message: "First name must not be at most 20 characters" })
        .optional(),
    lastName: z
        .string()
        .min(3, { message: "Last name must be at least 3 characters" })
        .max(20, { message: "Last name must not be more than 20 characters" })
        .optional(),
    email: z
        .string()
        .min(5, { message: "Email must be at least 5 characters" })
        .max(100, { message: "Email must be at most 100 characters" })
        .email({ message: "Please enter a valid email address" })
        .refine(
            (email) =>
                email.endsWith("@gmail.com") || email.endsWith("@hotmail.com"),
            { message: "Only gmail.com or hotmail.com emails allowed" }
        )
        .optional(),
    userAvatar: z
        .instanceof(File)
        .refine(
            (file) => file.size <= 5 * 1024 * 1024, // Max 5MB
            "File size must be less than 5MB"
        )
        .refine(
            (file) =>
                ["image/jpeg", "image/png", "image/svg+xml"].includes(
                    file.type
                ),
            "Only .jpg, .png, and .svg files are allowed"
        )
        .optional(),
});

const updateUserPasswordSchema = z.object({
    _id: z.string().optional(),
    password: z
        .string({ message: "This field is required" })
        .min(8, { message: "Password must be at least 8 characters" })
        .max(32, { message: "Password must be at most 32 characters" })
        .regex(/[0-9]/, { message: "Must contain at least one number" }),
});

type updateUserDataForm = z.infer<typeof updateUserDataSchema>;
type updateUserPasswordForm = z.infer<typeof updateUserPasswordSchema>;

const UserSettings = () => {
    // validation with zod (userData)
    const updateUserDataV = useForm<updateUserDataForm>({
        resolver: zodResolver(updateUserDataSchema),
    });

    const selectedFile = updateUserDataV.watch("userAvatar");

    // validation with zod (userPassword)
    const updateUserPasswordV = useForm<updateUserPasswordForm>({
        resolver: zodResolver(updateUserPasswordSchema),
    });

    // get logged user data
    const { user } = useAuth();

    // show page
    const [isProfSec, setProfSec] = useState(true);

    // Clean up object URLs when component unmounts
    useEffect(() => {
        return () => {
            // Revoke any object URLs to prevent memory leaks
            if (selectedFile instanceof File) {
                URL.revokeObjectURL(URL.createObjectURL(selectedFile));
            }
        };
    }, [selectedFile]);

    // useMutaion to update user data
    const updateUserData = usePatchUserData();

    // useMutaion to update user password
    const updateUserPassword = usePatchUserPassword();

    // show password function
    const [isPassword, setPassword] = useState(false);
    const showPasswordFun = () => {
        if (isPassword) {
            setPassword(false);
        } else {
            setPassword(true);
        }
    };

    // delete confirmation
    const [isconfirmd, setConifrmation] = useState(false);
    const [deleteError, setDeleteError] = useState<string | null>(null);
    const deleteUser = useDeleteUser();

    // navigate
    const navigate = useNavigate();

    // Animation variants
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                duration: 0.5,
                when: "beforeChildren",
                staggerChildren: 0.2,
            },
        },
        exit: {
            opacity: 0,
            transition: { duration: 0.3 },
        },
    };

    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: { duration: 0.4 },
        },
    };

    return (
        <>
            <motion.div
                className="userSettings"
                initial="hidden"
                animate="visible"
                exit="exit"
                variants={containerVariants}
            >
                <motion.div
                    className="userSettingsStyle"
                    variants={itemVariants}
                >
                    {/* Page Header */}
                    <motion.div className="usHeader" variants={itemVariants}>
                        <motion.div
                            className={
                                isProfSec === true
                                    ? "usSection bg-white/20"
                                    : "usSection"
                            }
                            onClick={() => setProfSec(true)}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            <FaUserEdit size={20} />
                            <div onClick={() => setConifrmation(false)}>
                                Profile
                            </div>
                        </motion.div>
                        <motion.div
                            className={
                                isProfSec === false
                                    ? "usSection bg-white/20"
                                    : "usSection"
                            }
                            onClick={() => setProfSec(false)}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            <FaUserLock size={20} />
                            <div>Security</div>
                        </motion.div>
                    </motion.div>

                    {/* Main Content Container */}
                    <motion.div className="usMainCon" variants={itemVariants}>
                        {/* User Profile Card */}
                        <motion.div
                            className="flex flex-col w-full"
                            variants={itemVariants}
                        >
                            <motion.div
                                className="usDataCard mb-3"
                                initial={{ scale: 0.95, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                transition={{ duration: 0.5 }}
                            >
                                {/* User Avatar */}
                                <motion.div
                                    className="flex justify-center mb-6"
                                    initial={{ y: 20, opacity: 0 }}
                                    animate={{ y: 0, opacity: 1 }}
                                    transition={{ duration: 0.6, delay: 0.2 }}
                                >
                                    <motion.div
                                        className="w-32 h-32 rounded-full overflow-hidden border-4 border-white/30"
                                        whileHover={{
                                            scale: 1.05,
                                            borderColor:
                                                "rgba(255,255,255,0.5)",
                                        }}
                                        transition={{ duration: 0.3 }}
                                    >
                                        <motion.img
                                            src={
                                                selectedFile instanceof File
                                                    ? URL.createObjectURL(
                                                          selectedFile
                                                      )
                                                    : user.userAvatar.url
                                            }
                                            alt="UserAvatar"
                                            className="w-full h-full object-cover"
                                            initial={{ scale: 1.2 }}
                                            animate={{ scale: 1 }}
                                            transition={{ duration: 0.5 }}
                                        />
                                    </motion.div>
                                </motion.div>

                                {/* User Info */}
                                <motion.div
                                    className="text-center flex flex-col"
                                    initial={{ y: 20, opacity: 0 }}
                                    animate={{ y: 0, opacity: 1 }}
                                    transition={{ duration: 0.6, delay: 0.4 }}
                                >
                                    <motion.h2
                                        className="text-2xl font-redHatB mb-2"
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        transition={{
                                            duration: 0.5,
                                            delay: 0.5,
                                        }}
                                    >{`${user.firstName} ${user.lastName}`}</motion.h2>
                                    <motion.p
                                        className="text-white/80 font-redHatR mb-1"
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        transition={{
                                            duration: 0.5,
                                            delay: 0.6,
                                        }}
                                    >
                                        @{user.username}
                                    </motion.p>
                                    <motion.p
                                        className="text-white/80 font-redHatR mb-1"
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        transition={{
                                            duration: 0.5,
                                            delay: 0.7,
                                        }}
                                    >
                                        {user.email}
                                    </motion.p>
                                    <motion.p
                                        className="text-white/80 font-redHatR mb-3"
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        transition={{
                                            duration: 0.5,
                                            delay: 0.8,
                                        }}
                                    >
                                        {formatTimeAgo(user.createdAt)}
                                    </motion.p>

                                    {user.admin && (
                                        <motion.div
                                            className="mt-3"
                                            initial={{ scale: 0, opacity: 0 }}
                                            animate={{ scale: 1, opacity: 1 }}
                                            transition={{
                                                type: "spring",
                                                stiffness: 500,
                                                damping: 15,
                                                delay: 0.9,
                                            }}
                                        >
                                            <motion.span
                                                className="bg-white/30 text-white px-4 py-1 rounded-full text-sm font-redHatB"
                                                whileHover={{
                                                    backgroundColor:
                                                        "rgba(255,255,255,0.4)",
                                                    scale: 1.05,
                                                }}
                                            >
                                                Admin
                                            </motion.span>
                                        </motion.div>
                                    )}
                                </motion.div>

                                {/* Upload Avatar Button */}
                            </motion.div>
                        </motion.div>
                    </motion.div>

                    {/* Forms Container */}
                    <motion.div className="flex w-full" variants={itemVariants}>
                        <AnimatePresence mode="wait">
                            {isProfSec === true ? (
                                // Update User Data
                                <motion.div
                                    className="w-full h-auto bg-white/20 backdrop-blur-sm rounded-xl p-6 border border-white/30 mb-8"
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -20 }}
                                    transition={{ duration: 0.3 }}
                                    key="profile-section"
                                >
                                    <h3 className="text-xl font-redHatB mb-6 pb-2 border-b border-white/30">
                                        Profile Information
                                    </h3>

                                    <form
                                        onSubmit={updateUserDataV.handleSubmit(
                                            (data) => {
                                                const updateData: updateUser = {
                                                    _id: user._id,
                                                    username:
                                                        data.username ||
                                                        undefined,
                                                    firstName:
                                                        data.firstName ||
                                                        undefined,
                                                    lastName:
                                                        data.lastName ||
                                                        undefined,
                                                    email:
                                                        data.email || undefined,
                                                    userAvatar: data.userAvatar,
                                                };
                                                updateUserData.mutate(
                                                    updateData
                                                );
                                            }
                                        )}
                                        className="space-y-2"
                                    >
                                        {/* Username */}
                                        <div className="flex flex-col">
                                            <div>
                                                <label
                                                    className="block font-redHatSB"
                                                    htmlFor="username"
                                                >
                                                    Username
                                                </label>
                                                <input
                                                    {...updateUserDataV.register(
                                                        "username"
                                                    )}
                                                    type="text"
                                                    id="username"
                                                    className={`w-full p-3 bg-white/10 border ${
                                                        updateUserDataV
                                                            .formState.errors
                                                            .username
                                                            ? "border-red-400"
                                                            : "border-white/30"
                                                    } rounded-lg focus:outline-none focus:border-white/60 transition-colors`}
                                                    placeholder="Enter your username"
                                                    defaultValue={user.username}
                                                />
                                                <div
                                                    className={
                                                        updateUserDataV
                                                            .formState.errors
                                                            .username
                                                            ? "text-red-400 text-sm mt-1 font-redHatR italic"
                                                            : "hidden"
                                                    }
                                                >
                                                    {
                                                        updateUserDataV
                                                            .formState.errors
                                                            .username?.message
                                                    }
                                                </div>
                                            </div>
                                        </div>

                                        {/* Email */}
                                        <div className="flex flex-col">
                                            <label
                                                className="block font-redHatSB"
                                                htmlFor="email"
                                            >
                                                Email
                                            </label>
                                            <input
                                                {...updateUserDataV.register(
                                                    "email"
                                                )}
                                                type="email"
                                                id="email"
                                                className={`w-full p-3 bg-white/10 border ${
                                                    updateUserDataV.formState
                                                        .errors.email
                                                        ? "border-red-400"
                                                        : "border-white/30"
                                                } rounded-lg focus:outline-none focus:border-white/60 transition-colors`}
                                                placeholder="Enter your email"
                                                defaultValue={user.email}
                                            />
                                            <div
                                                className={
                                                    updateUserDataV.formState
                                                        .errors.email
                                                        ? "text-red-400 text-sm mt-1 font-redHatR italic"
                                                        : "hidden"
                                                }
                                            >
                                                {
                                                    updateUserDataV.formState
                                                        .errors.email?.message
                                                }
                                            </div>
                                        </div>

                                        {/* First Name */}
                                        <div className="flex flex-col">
                                            <div>
                                                <label
                                                    className="block font-redHatSB"
                                                    htmlFor="firstName"
                                                >
                                                    First Name
                                                </label>
                                                <input
                                                    {...updateUserDataV.register(
                                                        "firstName"
                                                    )}
                                                    type="text"
                                                    id="firstName"
                                                    className={`w-full p-3 bg-white/10 border ${
                                                        updateUserDataV
                                                            .formState.errors
                                                            .firstName
                                                            ? "border-red-400"
                                                            : "border-white/30"
                                                    } rounded-lg focus:outline-none focus:border-white/60 transition-colors`}
                                                    placeholder="Enter your first name"
                                                    defaultValue={
                                                        user.firstName
                                                    }
                                                />
                                                <div
                                                    className={
                                                        updateUserDataV
                                                            .formState.errors
                                                            .firstName
                                                            ? "text-red-400 text-sm mt-1 font-redHatR italic"
                                                            : "hidden"
                                                    }
                                                >
                                                    {
                                                        updateUserDataV
                                                            .formState.errors
                                                            .firstName?.message
                                                    }
                                                </div>
                                            </div>
                                        </div>

                                        {/* Last Name */}
                                        <div className="flex flex-col">
                                            <label
                                                className="block font-redHatSB"
                                                htmlFor="lastName"
                                            >
                                                Last Name
                                            </label>
                                            <input
                                                {...updateUserDataV.register(
                                                    "lastName"
                                                )}
                                                type="text"
                                                id="lastName"
                                                className={`w-full p-3 bg-white/10 border ${
                                                    updateUserDataV.formState
                                                        .errors.lastName
                                                        ? "border-red-400"
                                                        : "border-white/30"
                                                } rounded-lg focus:outline-none focus:border-white/60 transition-colors`}
                                                placeholder="Enter your last name"
                                                defaultValue={user.lastName}
                                            />
                                            <div
                                                className={
                                                    updateUserDataV.formState
                                                        .errors.lastName
                                                        ? "text-red-400 text-sm mt-1 font-redHatR italic"
                                                        : "hidden"
                                                }
                                            >
                                                {
                                                    updateUserDataV.formState
                                                        .errors.lastName
                                                        ?.message
                                                }
                                            </div>
                                        </div>

                                        {/* User Avatar */}
                                        <div className="flex flex-col">
                                            <label
                                                className="block font-redHatSB"
                                                htmlFor="changeUserAvatar"
                                            >
                                                UserAvatar
                                            </label>
                                            <label
                                                htmlFor="changeUserAvatar"
                                                className={`w-full p-3 bg-white/10 border ${
                                                    updateUserDataV.formState
                                                        .errors.lastName
                                                        ? "border-red-400"
                                                        : "border-white/30"
                                                } rounded-lg focus:outline-none focus:border-white/60 transition-colors`}
                                            >
                                                {selectedFile instanceof File
                                                    ? `Selected: ${selectedFile.name}`
                                                    : "Change Avatar"}
                                            </label>
                                            <input
                                                id="changeUserAvatar"
                                                type="file"
                                                accept="image/jpeg, image/png, image/svg+xml"
                                                onChange={(e) => {
                                                    const file =
                                                        e.target.files?.[0];
                                                    if (file) {
                                                        // Set the file in the form
                                                        updateUserDataV.setValue(
                                                            "userAvatar",
                                                            file,
                                                            {
                                                                shouldValidate:
                                                                    true,
                                                            }
                                                        );
                                                    }
                                                }}
                                            />
                                            <div
                                                className={
                                                    updateUserDataV.formState
                                                        .errors.userAvatar
                                                        ? "text-red-400 text-sm mt-1 font-redHatR italic"
                                                        : "hidden"
                                                }
                                            >
                                                {updateUserDataV.formState.errors.userAvatar?.message?.toString()}
                                            </div>
                                        </div>

                                        {/* Submit Button */}
                                        <div className="w-full mt-5">
                                            <button
                                                type="submit"
                                                className="submitUserDataBtn"
                                            >
                                                Update Profile
                                            </button>
                                        </div>
                                    </form>
                                </motion.div>
                            ) : (
                                // Update User Password
                                <motion.div
                                    className="w-full h-auto bg-white/20 backdrop-blur-sm rounded-xl p-6 border border-white/30"
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: 20 }}
                                    transition={{ duration: 0.3 }}
                                    key="security-section"
                                >
                                    <h3 className="text-xl font-redHatB mb-6 pb-2 border-b border-white/30">
                                        Change Password
                                    </h3>

                                    <form
                                        onSubmit={updateUserPasswordV.handleSubmit(
                                            (data) => {
                                                const updatedUserPassword = {
                                                    _id: user._id,
                                                    password: data.password,
                                                };
                                                updateUserPassword.mutate(
                                                    updatedUserPassword
                                                );
                                                updateUserPasswordV.reset();
                                            }
                                        )}
                                        className="space-y-2"
                                    >
                                        {/* New Password */}
                                        <label
                                            className="authInputLabel"
                                            htmlFor="password"
                                        >
                                            <div className="authInputExplenation">
                                                New Password
                                            </div>
                                            <input
                                                {...updateUserPasswordV.register(
                                                    "password"
                                                )}
                                                type={
                                                    isPassword
                                                        ? "text"
                                                        : "password"
                                                }
                                                id="password"
                                                className={`w-full p-3 bg-white/10 border ${
                                                    updateUserPasswordV
                                                        .formState.errors
                                                        .password
                                                        ? "border-red-400"
                                                        : "border-white/30"
                                                } rounded-lg focus:outline-none focus:border-white/60 transition-colors`}
                                                placeholder="Enter Your password"
                                            />
                                            <div
                                                className=" absolute self-end mt-[38px] mr-3 cursor-pointer"
                                                onClick={showPasswordFun}
                                            >
                                                {isPassword ? "Hide" : "Show"}
                                            </div>
                                            <div
                                                className={
                                                    updateUserPasswordV
                                                        .formState.errors
                                                        .password
                                                        ? "authPasswordInputErrHandler-A"
                                                        : "authPasswordInputErrHandler"
                                                }
                                            >
                                                {updateUserPasswordV.formState
                                                    .errors.password &&
                                                    updateUserPasswordV
                                                        .formState.errors
                                                        .password.message}
                                                .
                                            </div>
                                        </label>

                                        {/* Submit Button */}
                                        <div className="w-full">
                                            <button
                                                type="submit"
                                                className="submitUserDataBtn"
                                            >
                                                Change Password
                                            </button>
                                        </div>
                                    </form>
                                    <h3 className="mt-5 text-xl font-redHatB mb-6 pb-2 border-b border-white/30">
                                        Account Deletion
                                    </h3>
                                    <div>
                                        {!isconfirmd ? (
                                            <button
                                                className="confirmDeletion"
                                                onClick={() =>
                                                    setConifrmation(true)
                                                }
                                            >
                                                Are you sure you want to delete
                                                you account?
                                            </button>
                                        ) : (
                                            <button
                                                className="deleteAccountBtn"
                                                disabled={deleteUser.isPending}
                                                onClick={() => {
                                                    setDeleteError(null);
                                                    deleteUser.mutate(
                                                        user._id,
                                                        {
                                                            onSuccess: () => {
                                                                localStorage.removeItem(
                                                                    "userData"
                                                                );
                                                                navigate(
                                                                    "/login",
                                                                    {
                                                                        replace:
                                                                            true,
                                                                    }
                                                                );
                                                            },
                                                            onError: (
                                                                error
                                                            ) => {
                                                                const errorMessage =
                                                                    error
                                                                        .response
                                                                        ?.data
                                                                        ?.message ||
                                                                    "Failed to delete account. Please try again.";
                                                                setDeleteError(
                                                                    errorMessage
                                                                );
                                                                setConifrmation(
                                                                    false
                                                                );
                                                            },
                                                        }
                                                    );
                                                }}
                                            >
                                                {deleteUser.isPending
                                                    ? "Deleting..."
                                                    : "Delete Account"}
                                            </button>
                                        )}
                                        {deleteError && (
                                            <div className="text-red-400 text-sm mt-2 font-redHatR italic">
                                                {deleteError}
                                            </div>
                                        )}
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </motion.div>
                </motion.div>
            </motion.div>
        </>
    );
};

export default UserSettings;
