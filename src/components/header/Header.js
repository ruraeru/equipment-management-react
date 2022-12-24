import styled from "styled-components"
import "./Header.scss";

export default function Header() {
    return (
        <div id="header-wrap">
            <div id="logo">
                <a href="/">로고</a>
            </div>
            <div id="location">
                <p>
                    <b>2022661108</b> 교번
                </p>
                <p>
                    <b>홍길동</b> 님
                </p>
                <p>로그아웃</p>
                <p>대여 목록 보기</p>
                <p>대여 내역</p>
            </div>
        </div>
    )
}