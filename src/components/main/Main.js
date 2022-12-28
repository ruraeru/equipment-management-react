import Header from "components/header/Header";
import Profile from "components/profile/Profile";
import RentalList from "components/rentalList/RentalList";
import "./Main.scss";

export default function Main({ children }) {
    return (
        <div id="main-wrap">
            <Header />
            <div id="contents">
                <Profile />
                <div className="main">
                    {children}
                </div>
            </div>
        </div >
    );
}