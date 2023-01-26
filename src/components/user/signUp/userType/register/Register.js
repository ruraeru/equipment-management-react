import axios from "axios";
import { useEffect } from "react";
import { useState } from "react"
import { SiJitsi } from "react-icons/si";
import { useNavigate, useParams } from "react-router-dom";

export default function Register() {
    const page = useParams().page;
    const navigate = useNavigate();
    const [univInput, setUnivInput] = useState({
        "name": "",
        "phone_number": "",
        "univ": "",
        "department": "",
        "id": "",
        "email": "",
        "atEmail": "",
        "pw": "",
        "checkPW": ""
    });
    const [authNumber, setAuthNumber] = useState();

    useEffect(() => {
        console.log(univInput);
    }, [univInput]);
    const onChange = (e) => {
        const { name, value } = e.target;
        setUnivInput({
            ...univInput,
            [name]: value
        });
    }

    const setRegisterData = () => {
        // localStorage.setItem("register", JSON.stringify({
        //     ...univInput
        // }));
        navigate(`/user/signUp/userType/${"student"}/${parseInt(page) + 1}`)
    }

    const onSignUp = async () => {
        // localStorage.setItem("register", JSON.stringify({
        //     ...univInput
        // }));
        if (univInput.email === "") {
            alert("필수값을 입력해주세요.");
            return;
        }
        const { name, phone_number, univ, department, id, email: domain, atEmail, pw } = univInput;
        const email = `${domain}@${atEmail}`;
        console.log(email);
        await axios.post(`${process.env.REACT_APP_DOMAIN}/user/signUp`, {
            user_id: id,
            user_pw: pw,
            user_email: email,
            user_student_number: id,
            user_name: name,
            user_phone_number: phone_number,
            department_id: parseInt(department),
        }).then((res) => {
            console.log(res);
            if (!res.data.suc) {
                alert(res.data.error);
            } else {
                alert("회원가입을 성공적으로 마쳤습니다.");
                navigate("/");
            }
        });
    }

    return (
        <div id="univInput">
            {page === "1" &&
                <>
                    <div>
                        <p>학교</p>
                        <select onChange={onChange} name="univ">
                            <option>학교를 선택해주세요.</option>
                            <option>명지전문대학교</option>
                            <option>명지대학교 서울캠퍼스</option>
                            <option>명지대학교 용인캠퍼스</option>
                        </select>
                    </div>
                    <div>
                        <p>학과</p>
                        <select onChange={onChange} name="department">
                            <option>학과를 선택해주세요.</option>
                            <option value="1">소프트웨어콘텐츠과</option>
                        </select>
                    </div>
                    <button
                        onClick={setRegisterData}
                        disabled={!(univInput.univ && univInput.department)}
                        className={(univInput.univ && univInput.department) ? "activeLoginBtn" : ""}>
                        다음
                    </button>
                </>
            }

            {page === "2" &&
                <div>
                    <div>
                        <p>이름</p>
                        <input
                            name="name"
                            onChange={onChange}
                            value={univInput.name}
                            placeholder="이름을 입력해주세요."
                        />
                        <p>전화번호</p>
                        <input
                            name="phone_number"
                            onChange={onChange}
                            value={univInput.phone_number}
                            type="tel"
                            placeholder="전화번호를 입력해주세요. ex) 01012345678"
                        />
                    </div>
                    <button
                        onClick={setRegisterData}
                        className={(univInput.name && univInput.phone_number) && "activeLoginBtn"}
                        disabled={!(univInput.name && univInput.phone_number)}>
                        다음
                    </button>
                </div>
            }


            {page === "3" &&
                <div style={{
                    width: "100%"
                }}>
                    <div id="id-email">
                        <div id="id">
                            <p>아이디</p>
                            <input
                                style={{
                                    width: "384px",
                                    marginRight: "16px"
                                }}
                                name="id"
                                value={univInput.id}
                                onChange={onChange}
                                placeholder="아이디를 입력해주세요."
                            />
                            <button id="checkID" onClick={onSignUp}>중복 확인</button>
                        </div>
                        <div id="email">
                            <p>이메일</p>
                            <input
                                style={{
                                    width: "280px",
                                    marginRight: "16px"
                                }}
                                name="email"
                                value={univInput.email}
                                onChange={onChange}
                                placeholder="이메일을 입력해주세요."
                            />@
                            <select onChange={onChange} value={univInput.atEmail} name="atEmail" style={{
                                width: "210px",
                                marginLeft: "16px"
                            }}>
                                <option>gmail.com</option>
                                <option>mjc.ac.kr</option>
                                <option>daum.net</option>
                                <option>naver.com</option>
                            </select>
                        </div>
                    </div>
                    <button
                        onClick={setRegisterData}
                        disabled={!(univInput.id && (univInput.email && univInput.atEmail))}
                        className={(univInput.id && (univInput.email && univInput.atEmail)) ? "activeLoginBtn" : ""}>
                        다음
                    </button>
                </div>
            }

            {page === "4" &&
                <div style={{
                    width: "100%"
                }}>
                    <div id="id-email">
                        <div id="email">
                            <p>이메일</p>
                            <input
                                style={{
                                    width: "280px",
                                    marginRight: "16px"
                                }}
                                name="email"
                                value={univInput.email}
                                disabled
                                placeholder="이메일을 입력해주세요."
                            />@
                            <select value={univInput.atEmail} name="atEmail" disabled style={{
                                width: "210px",
                                marginLeft: "16px"
                            }}>
                                <option>gmail.com</option>
                                <option>mjc.ac.kr</option>
                                <option>daum.net</option>
                                <option>naver.com</option>
                            </select>
                        </div>
                        <div>
                            <p>인증번호</p>
                            <input
                                onChange={(e) => {
                                    setAuthNumber(e.target.value);
                                }}
                                style={{
                                    width: "384px",
                                    marginRight: "16px"
                                }}
                                placeholder="인증번호를 입력해주세요."
                            />
                            <button id="emailAuth">이메일 인증</button>
                        </div>
                        <button
                            onClick={setRegisterData}
                            className={authNumber ? "activeLoginBtn" : ""}
                            disabled={authNumber ? false : true}>
                            다음
                        </button>
                    </div>
                </div>
            }

            {page === "5" &&
                <>
                    <form id="id-email" onSubmit={(e) => e.preventDefault()}>
                        <div>
                            <p>비밀번호</p>
                            <input
                                name="pw"
                                type="password"
                                // pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
                                maxLength={16}
                                onChange={onChange}
                                placeholder="비밀번호를 입력해주세요."
                            />
                        </div>
                        <div>
                            <p>비밀번호 재입력</p>
                            <input
                                name="checkPW"
                                type="password"
                                onChange={onChange}
                                placeholder="비밀번호를 한 번 더 입력해주세요."
                            />
                            {univInput.pw !== univInput.checkPW && univInput.checkPW.length > 0 &&
                                <p style={{
                                    margin: 0,
                                    fontSize: "14px",
                                    color: "#E03333"
                                }}>입력하신 비밀번호가 일치하지 않습니다.</p>
                            }
                        </div>
                        <button
                            type="submit"
                            onClick={onSignUp}
                            className={(univInput.pw && univInput.checkPW) ? "activeLoginBtn" : ""}
                            disabled={!(univInput.pw && univInput.checkPW) || (univInput.pw !== univInput.checkPW)}>
                            회원가입 완료
                        </button>
                    </form>
                </>
            }
        </div>
    )
}