import axios from "axios";
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { Link } from "react-router-dom";
import "./Login.scss";

export default function Login() {
    const [equipmentData, setEquipmentData] = useState();
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
        await axios.post(`${process.env.REACT_APP_DOMAIN}/user/login`,
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
        await axios.get(`${process.env.REACT_APP_DOMAIN}/tool/viewTool`,
            {
                params: {
                    tool_id: "123456"
                },
                headers: {
                    token: cookies.token
                }
            }).then((res) => {
                if (res.data.suc) {
                    console.log(res.data);
                    setEquipmentData(res.data.tool.result);
                    EquipmentImg(res.data.tool.image.img_url);
                }
                else Promise.reject(new Error(res.data.err));
            }).catch(err => console.log(err));
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
        <div>
            <div>
                <img src="" alt="이미지" style={{
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
                }}>토큰 인증</button>
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