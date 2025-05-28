import { useEffect, useState } from "react"
import { Products } from "../dto"
import { motion } from "framer-motion"
import usePostProductToCart from "../routes/mainWebsite/hooks/usePostProductsToCart"
import useGetUserCart from "../routes/mainWebsite/hooks/useGetUserCartData"
import usePatchProductToCart from "../routes/mainWebsite/hooks/usePatchProductsInCart"

interface ProductCardProps {
    product: Products
}

const ProductCard = ({ product }: ProductCardProps) => {
    const [productCount, setProductCount] = useState(1)
    const [isHovered, setIsHovered] = useState(false)

    // decrease quantity by one
    const decrementQuantity = () => {
        setProductCount(productCount - 1)
    }

    // increase quantity by one
    const incrementQuantity = () => {
        setProductCount(productCount + 1)
    }

    // get user cart
    const { data: userCart } = useGetUserCart()
    let isProductHere = false
    userCart?.map(
        (cart) =>
            cart.productImage.url === product.productImage.url &&
            (isProductHere = true)
    )

    // post product data to backend
    const postProductData = usePostProductToCart()
    const patchProductData = usePatchProductToCart()
    const handleProdcutData = () => {
        if (isProductHere) {
            console.log("updated")
            patchProductData.mutate({
                productImage: {
                    public_id: product.productImage.public_id,
                    url: product.productImage.url,
                },
                name: product.name,
                category: product.category,
                price: product.price,
                count: productCount,
            })
        } else {
            console.log("created")
            postProductData.mutate({
                productImage: {
                    public_id: product.productImage.public_id,
                    url: product.productImage.url,
                },
                name: product.name,
                category: product.category,
                price: product.price,
                count: productCount,
            })
        }
    }

    // handling errors
    const [showError, setShowError] = useState(false)
    const [errorMessage, setErrorMessage] = useState("")

    // Effect to handle error display and auto-hide
    useEffect(() => {
        if (postProductData.error) {
            setErrorMessage(postProductData.error.message)
            setShowError(true)

            // Set a timer to hide the error after 5 seconds
            const timer = setTimeout(() => {
                setShowError(false)
            }, 5000) // 5 seconds

            // Clean up the timer when component unmounts or error changes
            return () => clearTimeout(timer)
        }
    }, [postProductData.error])

    return (
        <>
            {/* Post error Hadndling */}
            <div
                className={
                    showError
                        ? "productErrorHandling productErrorHandling-A"
                        : "productErrorHandling"
                }
            >
                {showError && errorMessage}
            </div>
            <motion.div
                className="bg-white/10 backdrop-blur-sm rounded-lg overflow-hidden shadow-lg"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                whileHover={{ y: -5 }}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
            >
                <div className="relative h-44 overflow-hidden w-80 productCard">
                    <img
                        src={product.productImage.url}
                        alt={product.name}
                        className="w-full h-full object-cover transition-transform duration-500 productImage"
                        style={{
                            transform: isHovered ? "scale(1.1)" : "scale(1)",
                        }}
                    />
                    <div className="absolute top-2 right-2 bg-[#d4a258] text-white text-xs font-redHatB px-2 py-1 rounded-full">
                        {product.category}
                    </div>
                </div>

                <div className="p-4 w-full">
                    <h3 className="text-lg font-redHatB text-white mb-1 truncate">
                        {product.name}
                    </h3>
                    <p className="text-xl font-redHatB text-[#FFFFFFAA] mb-3">
                        ${product.price.toFixed(2)}
                    </p>

                    <div className="flex mb-3 w-full">
                        <div className="flex items-center w-full">
                            <button
                                onClick={decrementQuantity}
                                className="bg-white/20 text-white w-12 h-8 flex items-center justify-center rounded-l-md hover:bg-white/30 transition-all cursor-pointer"
                                disabled={productCount <= 1}
                            >
                                -
                            </button>
                            <div className="bg-white/10 text-white w-full h-8 flex items-center justify-center">
                                {productCount}
                            </div>
                            <button
                                onClick={incrementQuantity}
                                className="bg-white/20 text-white w-12 h-8 flex items-center justify-center rounded-r-md hover:bg-white/30 transition-all cursor-pointer"
                                disabled={productCount >= 100}
                            >
                                +
                            </button>
                        </div>
                    </div>

                    <motion.button
                        onClick={handleProdcutData}
                        className="w-full bg-[#d4a258] hover:bg-[#c69345] text-white font-redHatSB py-2 px-4 rounded-md transition-all cursor-pointer"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                    >
                        {isProductHere ? "Update Count" : "Add To Cart"}
                    </motion.button>
                </div>
            </motion.div>
        </>
    )
}

export default ProductCard
