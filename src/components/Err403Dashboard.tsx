import { Link } from "react-router-dom"
import errImg from "../assets/images/error-svgrepo-com (1).svg"
import "../tailwind.css"

const Err403Dashboard = () => {
    return (
        <>
            <div className="flex justify-center">
                <div className="flex justify-center items-center flex-col gap-4 w-full h-screen bg-neutral-800">
                    <img src={errImg} className=" w-56" />
                    <div className="text-red-300 italic font-medium">
                        Access Forbidden, Only Admin can access this page...{" "}
                        <Link to={"/"} replace={true} className="underline">
                            Ok
                        </Link>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Err403Dashboard
