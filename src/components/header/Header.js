import { userLicense } from "hooks/userSorting";
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components"
import "./Header.scss";

export default function Header({ userData }) {
    const navigate = useNavigate();
    const [, , removeCookie] = useCookies();
    const [userType, setUserType] = useState();
    useEffect(() => {
        setUserType(userLicense(userData.login.user_license));
    }, []);
    return (
        <div id="header-wrap">
            <div id="logo">
                <a href="/">로고</a>
            </div>
            <div id="location">
                <p>
                    <b>{userData?.login?.user_student_number}</b> {userType?.userSort}
                </p>
                <p>
                    <b>{userData?.login?.user_name}</b> 님
                </p>
                <p style={{
                    cursor: "pointer"
                }} onClick={() => {
                    alert("로그아웃 되었습니다.");
                    removeCookie('login', {
                        path: '/'
                    });
                    removeCookie('token', {
                        path: '/'
                    });
                    navigate("/");
                    window.location.reload();
                }}>
                    로그아웃
                </p>
                <Link to={"/home/rentalList"}>
                    <p>대여 목록 보기</p>
                </Link>
                <Link to={"/home/myRentalList"}>
                    <p>대여 내역</p>
                </Link>
            </div>
        </div>
    )
}