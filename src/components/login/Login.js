import axios from "axios";
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { Link, useNavigate } from "react-router-dom";
import "./Login.scss";

export default function Login({ userData, setUserData, setCookie, removeCookie }) {
    const navigate = useNavigate();

    useEffect(() => {
        removeCookie('token');
        removeCookie('login');
        // window.location.reload();
    }, []);
    const [input, setInput] = useState({
        user_id: "",
        user_pw: ""
    });
    const { user_id, user_pw } = input;

    const onInputChange = (e) => {
        const { name, value } = e.target;
        setInput({
            ...input,
            [name]: value
        });
    }

    const onLogin = async () => {
        await axios.post(`${process.env.REACT_APP_DOMAIN}/user/login`,
            {
                user_id: user_id,
                user_pw: user_pw
            }
        ).then(res => {
            if (res.data.suc) {
                console.log(res.data.login);
                setCookie('token', res.data.token.token);
                setCookie('login', res.data.login);
                navigate("/home/rentalList");
            }
            else Promise.reject(new Error(res.data.err));
        }).catch(err => Promise.reject(new Error("서버 에러", err)));
    }

    const EquipmentImg = (path) => {
        const img = document.querySelector("img");
        img.src = `${process.env.REACT_APP_DOMAIN}/tool/${path}`;
    }

    const onSubmit = (e) => {
        e.preventDefault();
        onLogin();
    }

    return (
        <div id="loginWrap">
            <div id="center">
                {/* <img src="" alt="이미지" style={{
                    width: "160px"
                }} />
                {equipmentData &&
                    <>
                        <p>{equipmentData.tool_code}</p>
                        <p>{equipmentData.tool_id}</p>
                        <p>{equipmentData.tool_name}</p>
                        <p>{equipmentData.tool_purchase_date}</p>
                        <p>{equipmentData.tool_purchase_division}</p>
                        <p>{equipmentData.tool_standard}</p>
                        <p>{equipmentData.tool_update_at}</p>
                        <p>{equipmentData.tool_use_division}</p>
                    </>
                }
                {cookies?.token}
                <button onClick={onDetailEquipment} style={{
                    backgroundColor: "tomato"
                }}>토큰 인증</button> */}
                <h1>로그인</h1>
                <form onSubmit={onSubmit}>
                    <p>아이디</p>
                    <input
                        name="user_id"
                        placeholder="학번 혹은 아이디를 입력해주세요."
                        value={input.user_id}
                        onChange={onInputChange} />
                    <p>비밀번호</p>
                    <input
                        name="user_pw"
                        placeholder="비밀번호를 입력해주세요."
                        value={input.user_pw}
                        onChange={onInputChange} />
                    <button type="submit">로그인</button>
                </form>
                <ul>
                    <li>
                        <Link to="/user/findid">아이디 찾기</Link>
                    </li>
                    <li>
                        <Link to="/user/modifypass">비밀번호 변경</Link>
                    </li>
                    <li>
                        <Link to="/user/signup">회원가입</Link>
                    </li>
                </ul>
            </div>
        </div>
    );
}