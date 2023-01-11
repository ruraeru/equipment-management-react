import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components"
import "./Header.scss";

export default function Header({ userData }) {
    const navigate = useNavigate();
    return (
        <div id="header-wrap">
            <div id="logo">
                <a href="/">로고</a>
            </div>
            <div id="location">
                <p>
                    <b>{userData?.login?.user_student_number}</b> 교번
                </p>
                <p>
                    <b>{userData?.login?.user_name}</b> 님
                </p>
                <p style={{
                    cursor: "pointer"
                }} onClick={() => {
                    navigate("/");
                    alert("로그아웃 되었습니다.");
                }}>
                    로그아웃
                </p>
                <Link to={"/home/rentalList/1"}>
                    <p>대여 목록 보기</p>
                </Link>
                <Link to={"/home/myRentalList"}>
                    <p>대여 내역</p>
                </Link>
            </div>
        </div>
    )
}