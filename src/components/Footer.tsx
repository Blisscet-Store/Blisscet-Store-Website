import "../tailwind.css"
import { Link } from "react-router-dom"
import { FaFacebook, FaTwitter, FaInstagram, FaPinterest } from "react-icons/fa"
import logo from "../assets/images/Blisscuit_Logo_Icon.png"

const Footer = () => {
    const currentYear = new Date().getFullYear()

    return (
        <footer className="w-full py-10 text-white Footer">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    {/* Logo and About */}
                    <div className="col-span-1 md:col-span-1">
                        <div className="flex items-center mb-4">
                            <img
                                src={logo}
                                alt="Blisscuit Logo"
                                className="w-10 h-10 mr-2"
                            />
                            <span className="text-xl font-redHatB">
                                Blisscuit
                            </span>
                        </div>
                        <p className="text-sm font-redHatR mb-4">
                            Delightful treats and confectionery treasures for
                            every occasion.
                        </p>
                        <div className="flex space-x-4">
                            <a className="text-white hover:underline transition-all cursor-pointer">
                                <FaFacebook size={20} />
                            </a>
                            <a className="text-white hover:underline transition-all cursor-pointer">
                                <FaTwitter size={20} />
                            </a>
                            <a className="text-white hover:underline transition-all cursor-pointer">
                                <FaInstagram size={20} />
                            </a>
                            <a className="text-white hover:underline transition-all cursor-pointer">
                                <FaPinterest size={20} />
                            </a>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div className="col-span-1">
                        <h3 className="text-lg font-redHatB mb-4">
                            Quick Links
                        </h3>
                        <ul className="space-y-2 font-redHatR">
                            <li>
                                <Link
                                    to="/"
                                    className="hover:underline transition-all"
                                >
                                    Home
                                </Link>
                            </li>
                            <li>
                                <Link
                                    to="/products"
                                    className="hover:underline transition-all"
                                >
                                    Products
                                </Link>
                            </li>
                            <li>
                                <Link
                                    to="/cart"
                                    className="hover:underline transition-all"
                                >
                                    Cart
                                </Link>
                            </li>
                            <li>
                                <Link
                                    to="/userSettings"
                                    className="hover:underline transition-all"
                                >
                                    My Account
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Categories */}
                    <div className="col-span-1">
                        <h3 className="text-lg font-redHatB mb-4">
                            Categories
                        </h3>
                        <ul className="space-y-2 font-redHatR">
                            <li>
                                <a className="hover:underline transition-all cursor-pointer">
                                    Cookies
                                </a>
                            </li>
                            <li>
                                <a className="hover:underline transition-all cursor-pointer">
                                    Pastries
                                </a>
                            </li>
                            <li>
                                <a className="hover:underline transition-all cursor-pointer">
                                    Cakes
                                </a>
                            </li>
                            <li>
                                <a className="hover:underline transition-all cursor-pointer">
                                    Seasonal Specials
                                </a>
                            </li>
                            <li>
                                <a className="hover:underline transition-all cursor-pointer">
                                    Gift Boxes
                                </a>
                            </li>
                        </ul>
                    </div>

                    {/* Contact */}
                    <div className="col-span-1">
                        <h3 className="text-lg font-redHatB mb-4">
                            Contact Us
                        </h3>
                        <ul className="space-y-2 font-redHatR">
                            <li>123 Bakery Street</li>
                            <li>Sweet City, SC 12345</li>
                            <li>Phone: (123) 456-7890</li>
                            <li>Email: info@blisscuit.com</li>
                        </ul>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="border-t border-white/20 mt-8 pt-6 flex flex-col md:flex-row justify-between items-center">
                    <p className="text-sm font-redHatR mb-4 md:mb-0">
                        &copy; {currentYear} Blisscuit. All rights reserved.
                    </p>
                    <div className="flex space-x-4 text-sm font-redHatR">
                        <a className="hover:underline transition-all cursor-pointer">
                            Privacy Policy
                        </a>
                        <a className="hover:underline transition-all cursor-pointer">
                            Terms of Service
                        </a>
                        <a className="hover:underline transition-all cursor-pointer">
                            Shipping Info
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    )
}

export default Footer
