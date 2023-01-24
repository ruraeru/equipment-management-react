import { useState } from "react";
import { useNavigate } from "react-router-dom";
import AdminImg from "../../../../images/admin.svg";
import EnterImg from "../../../../images/enterprice.svg";
import StuImg from "../../../../images/student.svg";

export default function UserType() {
    const navigate = useNavigate();
    const [userType, setUserType] = useState("");
    const selectUserType = (e) => {
        setUserType(userType === "" ? e.target.name : "");
        if (e.target.className === "select") {
            e.target.className = ""
        }
        else e.target.className = "select";
    }
    return (
        <>
            <div id="userType">
                <img
                    name="student"
                    src={StuImg}
                    alt="student"
                    onClick={selectUserType}
                />
                <img
                    name="admin"
                    src={AdminImg}
                    alt="admin"
                    onClick={selectUserType}
                />
                <img
                    name="enterprice"
                    src={EnterImg}
                    alt="enterprice"
                    onClick={selectUserType}
                />
            </div>
            <button onClick={() => { navigate(`${userType}/1`) }} className={userType !== "" ? "activeLoginBtn" : " "} disabled={userType === "" ? true : false}>다음</button>
        </>
    )
}