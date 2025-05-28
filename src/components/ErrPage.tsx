import "../styles.css";
import errImg from "../assets/images/error-svgrepo-com (1).svg";
import { isRouteErrorResponse, useRouteError } from "react-router-dom";

const ErrPage = () => {
    const err = useRouteError();
    return (
        <>
            <div className="flex justify-center">
                <div className="flex justify-center items-center flex-col gap-4 w-full h-screen bg-neutral-800">
                    <img src={errImg} className=" w-64" />
                    <div className="text-red-300 italic font-medium">
                        Sorry, &nbsp;
                        {isRouteErrorResponse(err)
                            ? "Invalid Page"
                            : "an Unexpected error has occurred"}
                    </div>
                </div>
            </div>
        </>
    );
};

export default ErrPage;
