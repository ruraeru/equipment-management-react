import axios from "axios";
import { useState } from "react";
import styled from "styled-components";

export default function Login() {
    const [token, setToken] = useState();
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
        await axios.post("http://120.142.105.189:5080/user/login",
            {
                user_id: user_id,
                user_pw: user_pw
            }
        ).then(res => {
            if (res.data) {
                console.log(res.data);
            }
            else Promise.reject(new Error("API 반환값 에러"));
        }).catch(err => Promise.reject(new Error("서버 에러", err)));
    }

    const onSubmit = (e) => {
        e.preventDefault();
        onLogin();
    }
    return (
        <>
            <LoginFormWrap onSubmit={onSubmit}>
                <input
                    type="text"
                    name="user_id"
                    value={user_id}
                    autoComplete="none"
                    placeholder="아이디"
                    onChange={onInputChange} />
                <input
                    type="password"
                    name="user_pw" value={user_pw}
                    autoComplete="none"
                    placeholder="비밀번호"
                    onChange={onInputChange} />
                <input type="submit" />
            </LoginFormWrap>
        </>
    );
}

const LoginFormWrap = styled.form`
   display: flex;
   flex-direction: column;
   justify-content: center;
   align-items: center;

   input {
    width: 220px;
    height: 36px;
   }
`;