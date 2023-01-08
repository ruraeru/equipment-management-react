import Header from "components/header/Header";
import Profile from "components/profile/Profile";
import RentalList from "components/rentalList/RentalList";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Main.scss";

export default function Main({ children, userData }) {
    const navigate = useNavigate();
    // useEffect(() => {
    //     if (!userData) navigate("/");
    // })
    return (
        <div id="main-wrap">
            <Header userData={userData} />
            <div id="contents">
                <Profile userData={userData} />
                <div className="main">
                    {children}
                </div>
            </div>
        </div >
    );
}