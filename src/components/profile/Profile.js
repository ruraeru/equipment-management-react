import axios from "axios";
import { useActive } from "hooks/useActive";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./Profile.scss";

export default function Profile({ userData }) {
    const [userType, setUserType] = useState("");
    const [rentalList, setRentalList] = useState();
    const getMyRentalList = async () => {
        await axios.get(`${process.env.REACT_APP_DOMAIN}/rental/myCurrentRentalList/student/1`)
            .then((res) => {
                if (res.suc) {
                    setRentalList(res.data);
                }
                else Promise.reject(new Error(res.error));
            }).catch(err => {
                console.log(err);
            });
    }
    useEffect(() => {
        getMyRentalList();
    }, []);
    useEffect(() => {
        switch (userData?.login?.user_license) {
            case 1:
                setUserType("마스터");
                break;
            case 2:
                setUserType("관리자");
                break;
            case 3:
                setUserType("학부생");
                break;
            default:
                break;
        }
    }, []);
    return (
        <div style={{
            display: "flex",
            flexDirection: "column",
            height: "100vh",
            marginLeft: "24px"
        }}>
            <div id="profile-wrap">
                <div style={{
                    borderBottom: "2px solid rgba(103, 103, 130, 0.3)",
                }}>
                    <p>
                        <b>{userData?.login?.user_student_number}</b> 교번
                    </p>
                    <p>
                        <b>{userData?.login?.user_name}</b> 님
                    </p>
                    <p>({userType})</p>
                </div>
                <hr />
                <div id="navigation">
                    <Link to="/home/rentalList/1"
                        className={useActive("/home/rental") ? "active" : null}>대여 목록</Link>
                    <Link to="/home/myRentalList"
                        className={useActive("/home/myRentalList") ? "active" : null}>내 대여 내역</Link>
                    <Link to="/user/changeInfo"
                        className={useActive("/user/changeInfo") ? "active" : null}>회원 정보 수정</Link>
                    {userType !== "학부생" &&
                        <>
                            <Link to="/tool/changeInfo"
                                // eslint-disable-next-line react-hooks/rules-of-hooks
                                className={useActive("/tool/changeInfo") ? "active" : null}>기자재 정보 수정</Link>
                            <Link to="/tool/addTool"
                                // eslint-disable-next-line react-hooks/rules-of-hooks
                                className={useActive("/tool/addTool") ? "active" : null}>기자재 추가</Link>
                        </>}
                    {userType === "마스터" &&
                        <Link to={"/user/authorization"}
                            // eslint-disable-next-line react-hooks/rules-of-hooks
                            className={useActive("/user/authorization") ? "active" : null}>회원가입 승인</Link>}
                </div>
            </div>
            {/*추후 분리 예정 */}

            <div id="myRentalList">
                <h4>내 대여 목록</h4>
                {rentalList && rentalList.map((item, index) => (
                    <div key={index}>
                        <p style={{
                            fontSize: "16px",
                            color: "#E03333",
                        }}>{item.D_day}</p>
                        <p>
                            {item.result.tool.tool_name} <br />
                            <span>품목 코드 : {item.result.tool.tool_id}</span>
                        </p>
                    </div>
                ))}
            </div>
        </div >
    );
}