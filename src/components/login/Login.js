import axios from "axios";
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { Link } from "react-router-dom";
import "./Login.scss";

export default function Login() {
    const [cookies, setCookie, removeCookie] = useCookies(['token']);
    const [input, setInput] = useState({
        user_id: "",
        user_pw: ""
    });
    const { user_id, user_pw } = input;

    useEffect(() => {
        removeCookie('token');
    }, []);

    const onInputChange = (e) => {
        const { name, value } = e.target;
        setInput({
            ...input,
            [name]: value
        });
    }

    const onLogin = async () => {
        await axios.post("http://120.142.105.189:5080/user/login",
            {
                user_id: user_id,
                user_pw: user_pw
            }
        ).then(res => {
            if (res.data.suc) {
                console.log(res.data);
                setCookie('token', res.data.token.token);
            }
            else Promise.reject(new Error(res.data.err));
        }).catch(err => Promise.reject(new Error("서버 에러", err)));
    }

    const onDetailEquipment = async () => {
        await axios.get("http://120.142.105.189:5080/tool/viewTool",
            {
                params: {
                    tool_id: "test1"
                },
                headers: {
                    token: cookies.token
                }
            }).catch(err => console.log(err));
    }

    const onSubmit = (e) => {
        e.preventDefault();
        onLogin();
    }
    return (
        <div>
            <div>
                {cookies?.token}
                <button onClick={onDetailEquipment}>토큰 인증</button>
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
                    <input type="submit" value="로그인" />
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
        </div >
    );
}