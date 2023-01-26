import axios from "axios";
import { authEmail } from "hooks/authEmail";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

export default function ChangePW() {
    const page = useParams().page;
    const navigate = useNavigate();
    const [auth, setAuth] = useState();
    const [input, setInput] = useState({
        "email": "",
        "atEmail": "",
        "authNumber": "",
        "pw": "",
        "checkPW": ""
    });

    const authEmailNumber = () => {
        console.log(auth, input.authNumber)
        if (auth.toString() !== input.authNumber) {
            alert("인증번호가 일치하지 않습니다.");
            return;
        }
        navigate("/user/changePw/2");
    }

    const onChange = (e) => {
        const { name, value } = e.target;
        setInput({
            ...input,
            [name]: value
        });
    }

    const onChangePW = async () => {
        const { email: domain, atEmail, pw } = input;
        const email = `${domain}@${atEmail}`;
        await axios.post(`${process.env.REACT_APP_DOMAIN}/user/changePw`, {
            user_email: email,
            user_pw: pw,
        }).then((res) => {
            console.log(res);
        })
    }

    return (
        <div id="loginWrap">
            <div id="center">
                {page === "1" &&
                    <>
                        <div id="id-email">
                            <h1>비밀번호 변경</h1>
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
                                    placeholder="이메일을 입려해주세요."
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
                            <div>
                                <p>인증번호</p>
                                <input
                                    style={{
                                        width: "350px",
                                        marginRight: "16px"
                                    }}
                                    name="authNumber"
                                    value={input.authNumber}
                                    onChange={onChange}
                                    placeholder="인증번호를 입려해주세요."
                                />
                                <button
                                    id="emailAuth"
                                    onClick={() => authEmail(`${input.email}@${input.atEmail}`, setAuth)}>
                                    인증하기
                                </button>
                            </div>
                        </div>
                        <button
                            onClick={authEmailNumber}
                            className={(input.authNumber && (input.email && input.atEmail)) ? "activeLoginBtn" : ""}
                            disabled={!(input.authNumber && (input.email && input.atEmail))}>
                            다음
                        </button>
                    </>
                }

                {page === "2" &&
                    <div id="id-email">
                        <h1>비밀번호 변경</h1>
                        <div>
                            <p>비밀번호</p>
                            <input
                                name="pw"
                                value={input.pw}
                                onChange={onChange}
                                type="password"
                                placeholder="변경할 비밀번호를 입력해주세요."
                            />
                        </div>
                        <div>
                            <p>비밀번호 재입력</p>
                            <input
                                name="checkPW"
                                value={input.checkPW}
                                onChange={onChange}
                                type="password"
                                placeholder="변경할 비밀번호를 입력해주세요."
                            />
                            {input.pw !== input.checkPW && input.checkPW.length > 0 &&
                                <p style={{
                                    margin: 0,
                                    fontSize: "14px",
                                    color: "#E03333"
                                }}>입력하신 비밀번호가 일치하지 않습니다.</p>
                            }
                        </div>
                        <button
                            className={(input.pw && input.checkPW) ? "activeLoginBtn" : ""}
                            disabled={!(input.pw && input.checkPW) || (input.pw !== input.checkPW)}
                            onClick={() => {
                                onChangePW();
                                navigate("/");
                            }}>
                            로그인 페이지 가기
                        </button>
                    </div>
                }
            </div>
        </div>
    );
}