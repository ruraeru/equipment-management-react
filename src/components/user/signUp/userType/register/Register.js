import axios from "axios";
import { useEffect } from "react";
import { useState } from "react"
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
                <>
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
                        <button
                            onClick={setRegisterData}
                            className={(univInput.name && univInput.phone_number) && "activeLoginBtn"}
                            disabled={!(univInput.name && univInput.phone_number)}>
                            다음
                        </button>
                    </div>
                </>
            }


            {page === "3" &&
                <>
                    <div id="id-email">
                        <div id="id">
                            <p>아이디</p>
                            <input
                                name="id"
                                value={univInput.id}
                                onChange={onChange}
                                placeholder="아이디를 입력해주세요."
                            />
                            <button id="checkID">중복 확인</button>
                        </div>
                        <div id="email">
                            <p>이메일</p>
                            <input
                                name="email"
                                value={univInput.email}
                                onChange={onChange}
                                placeholder="이메일을 입력해주세요."
                            />&nbsp; @ &nbsp;
                            <select onChange={onChange} value={univInput.atEmail} name="atEmail">
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
                </>
            }

            {page === "4" &&
                <>
                    <div id="id-email">
                        <div id="email">
                            <p>이메일</p>
                            <input
                                name="email"
                                value={univInput.email}
                                disabled
                                placeholder="이메일을 입력해주세요."
                            />&nbsp; @ &nbsp;
                            <select value={univInput.atEmail} name="atEmail" disabled>
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
                </>
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
                                placeholder="비밀번호를 입력해주세요."
                            />
                        </div>
                        <button
                            type="submit"
                            onClick={onSignUp}
                            className={(univInput.pw && univInput.checkPW) ? "activeLoginBtn" : ""}
                            disabled={!(univInput.pw && univInput.checkPW)}>
                            회원가입 완료
                        </button>
                    </form>
                </>
            }
        </div>
    )
}

// const Univ = () => {
//     return (
//         <>
//             <div>
//                 <p>학교</p>
//                 <select onChange={onChange} name="univ">
//                     <option>학교를 선택해주세요.</option>
//                     <option>명지전문대학교</option>
//                     <option>명지대학교 서울캠퍼스</option>
//                     <option>명지대학교 용인캠퍼스</option>
//                 </select>
//             </div>
//             <div>
//                 <p>학과</p>
//                 <select onChange={onChange} name="department">
//                     <option>학과를 선택해주세요.</option>
//                     <option value="1">소프트웨어콘텐츠과</option>
//                 </select>
//             </div>
//             <button
//                 onClick={setRegisterData}
//                 disabled={!(univInput.univ && univInput.department)}
//                 className={(univInput.univ && univInput.department) ? "activeLoginBtn" : ""}>
//                 다음
//             </button>
//         </>
//     );
// }