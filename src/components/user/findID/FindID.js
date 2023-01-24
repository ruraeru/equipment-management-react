import { useState } from "react";
import "../signUp/SignUp.scss";

export default function FindID() {
    const [input, setInput] = useState({
        "email": "",
        "atEmail": "",
        "authNumber": ""
    });

    const onChange = (e) => {
        const { name, value } = e.target;
        setInput({
            ...input,
            [name]: value
        });
    }
    return (
        <div id="loginWrap">
            <div id="center">
                <h1>아이디 찾기</h1>
                <div id="id-email">
                    <div id="email">
                        <p>이메일</p>
                        <input
                            name="email"
                            value={input.email}
                            onChange={onChange}
                            placeholder="이메일을 입력해주세요."
                        />&nbsp; @ &nbsp;
                        <input id="input-select-atEmail" />
                        {/* <select onChange={onChange} value={input.atEmail} name="atEmail">
                            <option>gmail.com</option>
                            <option>mjc.ac.kr</option>
                            <option>daum.net</option>
                            <option>naver.com</option>
                        </select> */}
                    </div>
                    <div>
                        <p>인증번호</p>
                        <input
                            name="authNumber"
                            onChange={onChange}
                            value={input.authNumber}
                            placeholder="인증번호를 입력해주세요."
                        />
                    </div>
                </div>
                <button
                    className={(input.authNumber && (input.email && input.atEmail)) ? "activeLoginBtn" : ""}
                    disabled={!(input.authNumber && (input.email && input.atEmail))}>
                    다음
                </button>
            </div>
        </div>
    )
}