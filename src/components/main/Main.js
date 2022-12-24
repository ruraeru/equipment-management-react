import Header from "components/header/Header";
import Profile from "components/profile/Profile";
import RentalList from "components/rentalList/RentalList";
import "./Main.scss";

export default function Main() {
    return (
        <div id="main-wrap">
            <Header />
            <div id="contents">
                <Profile />
                <div className="main">
                    <RentalList />
                </div>
            </div>
        </div >
    );
}