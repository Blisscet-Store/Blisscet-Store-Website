import { useEffect, useState } from "react";
import "../../../styles.css";
import useDeleteProductsFromCart from "../hooks/useDeleteProductFromCart";
import useGetUserCart from "../hooks/useGetUserCartData";
import { FaTimes, FaShoppingCart, FaWhatsapp } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";

const UserCart = () => {
    // products hooks (GET, DELETE)
    const { data: userCart, isLoading, error } = useGetUserCart();
    const deleteProductFromCart = useDeleteProductsFromCart();

    // handling errors
    const [showError, setShowError] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    // WhatsApp phone number
    const whatsappNumber = "+963939715367";

    // Function to generate WhatsApp message with order details
    const generateWhatsAppMessage = () => {
        if (!userCart || userCart.length === 0) return "";

        const subtotal = userCart.reduce(
            (total, item) => total + item.price * item.count,
            0
        );
        const tax = subtotal * 0.07;
        const shipping = 5;
        const total = subtotal + tax + shipping;

        let message =
            "*Hello! I'd like to place an order for the following items:*\n\n";

        // Add items to the message
        userCart.forEach((item, index) => {
            message += `*${index + 1}.* ${item.name} - Quantity:${
                item.count
            } x $${item.price.toFixed(2)} = $${(
                item.count * item.price
            ).toFixed(2)}\n`;
        });

        // Add order summary
        message += `\n*Subtotal:* $${subtotal.toFixed(2)}\n`;
        message += `*Shipping:* $${shipping.toFixed(2)}\n`;
        message += `*Tax (7%):* $${tax.toFixed(2)}\n`;
        message += `*Total:* $${total.toFixed(2)}\n\n`;
        message += "Please confirm my order. Thank you!";

        return encodeURIComponent(message);
    };

    // Effect to handle error display and auto-hide
    // post error
    useEffect(() => {
        if (deleteProductFromCart.error) {
            setErrorMessage(deleteProductFromCart.error.message);
            setShowError(true);

            // Set a timer to hide the error after 5 seconds
            const timer = setTimeout(() => {
                setShowError(false);
            }, 5000); // 5 seconds

            // Clean up the timer when component unmounts or error changes
            return () => clearTimeout(timer);
        }
    }, [deleteProductFromCart.error]);

    // get error
    useEffect(() => {
        if (error) {
            setErrorMessage(error.message);
            setShowError(true);

            // Set a timer to hide the error after 5 seconds
            const timer = setTimeout(() => {
                setShowError(false);
            }, 5000); // 5 seconds

            // Clean up the timer when component unmounts or error changes
            return () => clearTimeout(timer);
        }
    }, [error]);

    return (
        <>
            <div className="cart p-4">
                {/* Get is Loading */}
                {isLoading && (
                    <div className="loader">
                        <span className="bar"></span>
                        <span className="bar"></span>
                        <span className="bar"></span>
                    </div>
                )}
                {/* Get error handling */}
                <AnimatePresence>
                    {showError && (
                        <motion.div
                            className="productErrorHandling productErrorHandling-A"
                            initial={{ opacity: 0, y: -50 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -50 }}
                            transition={{ duration: 0.3 }}
                        >
                            {errorMessage}
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Get Showing Products */}
                <AnimatePresence mode="wait">
                    {userCart && userCart.length > 0 ? (
                        <>
                            <div className="cart-container flex flex-col md:flex-row justify-center items-start gap-8 w-full">
                                {/* Cart Items */}
                                <motion.div
                                    className="cart-items-container flex flex-col items-center gap-4 w-full md:w-3/5"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    transition={{ duration: 0.3 }}
                                >
                                    <h2 className="text-xl font-redHatB text-white mb-2 self-start pl-4 mt-5 font-bold">
                                        Your Cart Items
                                    </h2>
                                    {userCart.map((item, index) => (
                                        <motion.div
                                            key={index}
                                            className="cart-item flex items-center userCartItem p-4 rounded-lg shadow-md gap-4 w-full"
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, y: -20 }}
                                            transition={{
                                                duration: 0.3,
                                                delay: index * 0.1,
                                            }}
                                            whileHover={{
                                                scale: 1.02,
                                                boxShadow:
                                                    "0px 5px 15px rgba(0,0,0,0.1)",
                                            }}
                                        >
                                            <img
                                                src={item.productImage.url}
                                                className="w-16 h-16 object-cover rounded-md"
                                                alt={item.name}
                                            />
                                            <div className="flex-1">
                                                <h3 className="text-lg font-redHatB text-white">
                                                    {item.name}
                                                </h3>
                                                <p className="text-sm text-[#FFFFFFAA]">
                                                    {item.category}
                                                </p>
                                                <p className="text-sm text-[#FFFFFFAA]">
                                                    ${item.price.toFixed(2)}
                                                </p>
                                                <p className="text-sm text-[#FFFFFFAA]">
                                                    Quantity: {item.count}
                                                </p>
                                                <p className="text-sm text-[#FFFFFFAA]">
                                                    Total: $
                                                    {(
                                                        item.count * item.price
                                                    ).toFixed(2)}
                                                </p>
                                            </div>
                                            <div className="flex flex-col space-y-2">
                                                <motion.button
                                                    className="bg-[#ff706e] text-white px-2 py-2 rounded-md hover:bg-[#e05b5b] transition-all cursor-pointer"
                                                    onClick={() =>
                                                        deleteProductFromCart.mutate(
                                                            item
                                                        )
                                                    }
                                                    whileHover={{ scale: 1.1 }}
                                                    whileTap={{ scale: 0.9 }}
                                                >
                                                    <FaTimes />
                                                </motion.button>
                                            </div>
                                        </motion.div>
                                    ))}
                                </motion.div>

                                {/* Purchase Area */}
                                <motion.div
                                    className="purchase-area w-full md:w-2/5 sticky top-24"
                                    initial={{ opacity: 0, y: 30 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: 30 }}
                                    transition={{
                                        duration: 0.5,
                                        delay: 0.2 + userCart.length * 0.05, // Delay based on number of items
                                    }}
                                >
                                    <div className="bg-[rgba(255,255,255,0.1)] backdrop-blur-md p-6 rounded-lg border border-white">
                                        <h2 className="text-xl font-redHatB text-white mb-4">
                                            Order Summary
                                        </h2>

                                        <div className="space-y-2 mb-4">
                                            <div className="flex justify-between text-[#FFFFFFCC]">
                                                <span>Subtotal</span>
                                                <span>
                                                    $
                                                    {userCart
                                                        .reduce(
                                                            (total, item) =>
                                                                total +
                                                                item.price *
                                                                    item.count,
                                                            0
                                                        )
                                                        .toFixed(2)}
                                                </span>
                                            </div>
                                            <div className="flex justify-between text-[#FFFFFFCC]">
                                                <span>Shipping</span>
                                                <span>$5.00</span>
                                            </div>
                                            <div className="flex justify-between text-[#FFFFFFCC]">
                                                <span>Tax (7%)</span>
                                                <span>
                                                    $
                                                    {(
                                                        userCart.reduce(
                                                            (total, item) =>
                                                                total +
                                                                item.price *
                                                                    item.count,
                                                            0
                                                        ) * 0.07
                                                    ).toFixed(2)}
                                                </span>
                                            </div>
                                            <div className="border-t border-[#FFFFFF33] my-2"></div>
                                            <div className="flex justify-between font-redHatB text-white text-lg">
                                                <span>Total</span>
                                                <span>
                                                    $
                                                    {(
                                                        userCart.reduce(
                                                            (total, item) =>
                                                                total +
                                                                item.price *
                                                                    item.count,
                                                            0
                                                        ) +
                                                        5 +
                                                        userCart.reduce(
                                                            (total, item) =>
                                                                total +
                                                                item.price *
                                                                    item.count,
                                                            0
                                                        ) *
                                                            0.07
                                                    ).toFixed(2)}
                                                </span>
                                            </div>
                                        </div>

                                        <a
                                            href={`https://wa.me/${whatsappNumber}?text=${generateWhatsAppMessage()}`}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="block w-full"
                                        >
                                            <motion.button
                                                className="w-full bg-[#d4a258] text-white py-3 rounded-md font-redHatB mt-4 hover:bg-[#c69347] transition-all flex items-center justify-center gap-2"
                                                whileHover={{ scale: 1.03 }}
                                                whileTap={{ scale: 0.97 }}
                                            >
                                                <FaWhatsapp className="text-xl" />
                                                <span>
                                                    Checkout via WhatsApp
                                                </span>
                                            </motion.button>
                                        </a>

                                        <p className="text-[#FFFFFFAA] text-xs text-center mt-4">
                                            Your order details will be sent to
                                            our WhatsApp for processing.
                                        </p>
                                    </div>
                                </motion.div>
                            </div>
                        </>
                    ) : isLoading ? (
                        ""
                    ) : error || deleteProductFromCart.error ? (
                        ""
                    ) : (
                        <motion.div
                            className="flex justify-center items-center flex-col emptyCartBG"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.5 }}
                        >
                            <motion.div
                                className="text-center flex flex-col justify-center items-center"
                                initial={{ scale: 0.8 }}
                                animate={{ scale: 1 }}
                                transition={{
                                    duration: 0.5,
                                    type: "spring",
                                    stiffness: 200,
                                }}
                            >
                                <motion.div
                                    className="text-white text-8xl mb-4 opacity-70"
                                    animate={{
                                        y: [0, -10, 0],
                                        rotate: [0, 5, 0, -5, 0],
                                    }}
                                    transition={{
                                        duration: 2,
                                        repeat: Infinity,
                                        repeatType: "reverse",
                                    }}
                                >
                                    <FaShoppingCart />
                                </motion.div>
                                <h2 className="text-white text-2xl font-redHatB mb-2">
                                    Your cart is empty
                                </h2>
                                <p className="text-[#FFFFFFAA] mb-6">
                                    Looks like you haven't added any products to
                                    your cart yet.
                                </p>
                                <Link to="/products">
                                    <motion.button
                                        className="exploreProsuctsBtn"
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                    >
                                        Browse Products
                                    </motion.button>
                                </Link>
                            </motion.div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </>
    );
};

export default UserCart;
