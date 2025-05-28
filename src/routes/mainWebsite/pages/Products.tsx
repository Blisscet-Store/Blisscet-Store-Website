import ProductCard from "../../../components/ProductCard";
import "../../../styles.css";
import useGetProducts from "../hooks/useGetProducts";
import { useState, useEffect } from "react";

const Products = () => {
    // get products data
    const { data: products, isLoading, error } = useGetProducts();

    // handling errors
    const [showError, setShowError] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    // Effect to handle error display and auto-hide
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
            {/* Get products error handling */}
            <div
                className={
                    showError
                        ? "productErrorHandling productErrorHandling-A"
                        : "productErrorHandling"
                }
            >
                {showError && errorMessage}
            </div>
            <div className="products">
                <div className="productsStyle">
                    {isLoading && (
                        <div className="loader">
                            <span className="bar"></span>
                            <span className="bar"></span>
                            <span className="bar"></span>
                        </div>
                    )}
                    {products?.map((product, index) => (
                        <ProductCard key={index} product={product} />
                    ))}
                </div>
            </div>
        </>
    );
};

export default Products;
