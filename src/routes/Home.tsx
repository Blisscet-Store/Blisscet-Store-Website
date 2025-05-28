import { Outlet } from "react-router-dom";
import "../styles.css";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const Home = () => {
    return (
        <>
            <div className="BG"></div>
            <Navbar />
            <main className="min-h-screen">
                <Outlet />
            </main>
            <Footer />
        </>
    );
};

export default Home;
