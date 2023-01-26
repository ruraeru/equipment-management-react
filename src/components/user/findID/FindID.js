import axios from "axios";
// import { authEmail } from "hooks/authEmail";
import { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../signUp/SignUp.scss";

export default function FindID() {
    const authEmail = async (user_email, setAuth) => {
        console.log(user_email)
        await axios.get(`${process.env.REACT_APP_DOMAIN}/email/authEmail/${user_email}`)
            .then((res) => {
                console.log(res);
            })
    }
    const navigate = useNavigate();
    const [input, setInput] = useState({
        "email": "",
        "atEmail": "",
        "authNumber": ""
    });
    const [auth, setAuth] = useState();

    const [userInfo, setUserInfo] = useState();

    const onChange = (e) => {
        const { name, value } = e.target;
        setInput({
            ...input,
            [name]: value
        });
    }

    const onFindID = async () => {
        const { email: domain, atEmail } = input;
        console.log(input);
        const email = `${domain}@${atEmail}`;
        await axios.get(`${process.env.REACT_APP_DOMAIN}/user/findId`, {
            params: {
                user_email: email
            }
        }).then((res) => {
            console.log(res.data.result);
            if (res.data.suc) {
                setUserInfo(res.data.result);
            }
        })
    }

    return (
        <div id="loginWrap">
            <div id="center">
                {!userInfo ?
                    <>
                        <h1>아이디 찾기</h1>
                        <div id="id-email">
                            <div id="email">
                                <p>이메일</p>
                                <input
                                    style={{
                                        width: "240px",
                                        marginRight: "16px"
                                    }}
                                    name="email"
                                    value={input.email}
                                    onChange={onChange}
                                    placeholder="이메일을 입력해주세요."
                                />@
                                <input
                                    style={{
                                        width: "160px",
                                        marginLeft: "16px"
                                    }}
                                    id="input-select-atEmail"
                                    name="atEmail"
                                    value={input.atEmail}
                                    onChange={onChange}
                                />
                            </div>
                            <div id="id">
                                <p>인증번호</p>
                                <input
                                    style={{
                                        width: "350px",
                                        marginRight: "16px"
                                    }}
                                    name="authNumber"
                                    onChange={onChange}
                                    value={input.authNumber}
                                    placeholder="인증번호를 입력해주세요."
                                />
                                <button
                                    id="emailAuth"
                                    onClick={() => {
                                        console.log(`${input.email}@${input.atEmail}`);
                                        authEmail(`${input.email}@${input.atEmail}`);
                                    }}>
                                    인증하기</button>
                            </div>
                        </div>
                        <button
                            onClick={onFindID}
                            className={(input.authNumber && (input.email && input.atEmail)) ? "activeLoginBtn" : ""}
                            disabled={!(input.authNumber && (input.email && input.atEmail))}>
                            다음
                        </button>
                    </>
                    :
                    <div id="ID-View">
                        <h1>아이디 찾기</h1>
                        <div>
                            <p>
                                <span>{userInfo?.user_name}</span> 님의 아이디는
                            </p>
                            <p>
                                <span>{userInfo?.user_id}</span> 입니다.
                            </p>
                        </div>
                        <button onClick={() => navigate("/")} className="activeLoginBtn" style={{
                            width: "540px"
                        }}>로그인 페이지 가기</button>
                    </div>
                }
            </div>
        </div>
    )
}