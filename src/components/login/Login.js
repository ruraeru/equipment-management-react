import axios from "axios";
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { Link, useNavigate } from "react-router-dom";
import "./Login.scss";

export default function Login({ cookies, setCookie, removeCookie }) {
    const navigate = useNavigate();

    useEffect(() => {
        if (cookies.token) {
            navigate("/home/rentalList");
        }
        else {
            removeCookie('token');
            removeCookie('login');
        }
        console.log("login render");
    }, [cookies.token, navigate, removeCookie]);
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
                setCookie('token', res.data.token.token, {
                    // httpOnly: true
                });
                setCookie('login', res.data.login, {
                    // httpOnly: true
                });
                navigate("/home/rentalList");
            }
            else Promise.reject(new Error(res.data.err));
        }).catch(err => Promise.reject(new Error("서버 에러", err)));
    }

    const onSubmit = (e) => {
        e.preventDefault();
        onLogin();
    }

    return (
        <div id="loginWrap">
            <div id="center">
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
                    <button type="submit"
                        className={(input.user_id && input.user_pw) ? "activeLoginBtn" : "noneActiveLoginBtn"}
                        disabled={!(input.user_id && input.user_pw)}>
                        로그인
                    </button>
                </form>
                <ul>
                    <li>
                        <Link to="/user/findId">아이디 찾기</Link>
                    </li>
                    <li>
                        <Link to="/user/changePw/1">비밀번호 변경</Link>
                    </li>
                    <li>
                        <Link to="/user/signUp/userType">회원가입</Link>
                    </li>
                </ul>
            </div>
        </div>
    );
}