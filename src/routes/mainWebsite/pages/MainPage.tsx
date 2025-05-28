import "../../../tailwind.css"
import { motion } from "framer-motion"
import logo from "../../../assets/images/Blisscuit_Logo_Icon.png"
import { Link } from "react-router-dom"

const MainPage = () => {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen p-4 text-white mainPage">
            {/* Hero Section */}
            <motion.div
                className="w-full max-w-4xl text-center mb-16"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
            >
                <div className="flex justify-center mb-6">
                    <img
                        src={logo}
                        alt="Blisscuit Logo"
                        className="w-32 h-32"
                    />
                </div>
                <h1 className="text-5xl font-bold mb-4 font-redHatB">
                    Welcome to Blisscuit
                </h1>
                <p className="text-xl mb-8 font-redHatR">
                    Discover a world of delightful treats and confectionery
                    treasures
                </p>
                <Link to="/products">
                    <motion.button
                        className="exploreProsuctsBtn"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        Explore Our Products
                    </motion.button>
                </Link>
            </motion.div>

            {/* Features Section */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-4xl mb-16">
                <motion.div
                    className="bg-white/20 backdrop-blur-sm p-6 rounded-lg"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                >
                    <h2 className="text-2xl font-redHatB mb-3">
                        Premium Quality
                    </h2>
                    <p className="font-redHatR">
                        Our products are crafted with the finest ingredients,
                        ensuring a delightful experience with every bite.
                    </p>
                </motion.div>

                <motion.div
                    className="bg-white/20 backdrop-blur-sm p-6 rounded-lg"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                >
                    <h2 className="text-2xl font-redHatB mb-3">
                        Fast Delivery
                    </h2>
                    <p className="font-redHatR">
                        Enjoy quick and reliable delivery services, bringing
                        your favorite treats right to your doorstep.
                    </p>
                </motion.div>

                <motion.div
                    className="bg-white/20 backdrop-blur-sm p-6 rounded-lg"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.6 }}
                >
                    <h2 className="text-2xl font-redHatB mb-3">
                        Customer Satisfaction
                    </h2>
                    <p className="font-redHatR">
                        Your satisfaction is our priority. We're committed to
                        providing an exceptional shopping experience.
                    </p>
                </motion.div>
            </div>

            {/* About Section */}
            <motion.div
                className="w-full max-w-4xl text-center mb-16"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.8 }}
            >
                <h2 className="text-3xl font-redHatB mb-4">About Blisscuit</h2>
                <p className="text-lg mb-6 font-redHatR">
                    Blisscuit was founded with a passion for creating
                    exceptional confectionery products that bring joy to our
                    customers. Our journey began with a simple idea: to craft
                    delicious treats using traditional recipes and modern
                    techniques.
                </p>
                <p className="text-lg font-redHatR">
                    Today, we're proud to offer a wide range of products, from
                    classic favorites to innovative creations, all made with
                    love and attention to detail. Join us on this sweet journey
                    and discover the Blisscuit difference.
                </p>
            </motion.div>

            {/* Call to Action */}
            <motion.div
                className="w-full max-w-4xl text-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 1 }}
            >
                <h2 className="text-3xl font-redHatB mb-4">
                    Ready to Experience Blisscuit?
                </h2>
                <div className="flex flex-col sm:flex-row justify-center gap-4 mt-6">
                    <Link to="/products">
                        <motion.button
                            className="exploreProsuctsBtn"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            Shop Now
                        </motion.button>
                    </Link>
                    <Link to="/cart">
                        <motion.button
                            className="showCartBtn"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            View Cart
                        </motion.button>
                    </Link>
                </div>
            </motion.div>
        </div>
    )
}

export default MainPage
