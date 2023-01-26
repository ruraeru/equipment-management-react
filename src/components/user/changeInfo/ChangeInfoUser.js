import axios from "axios";
import { useCallback, useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import "./ChangeInfoUser.scss";

export default function ChangeInfoUser({ userInfo }) {
    const [edited, setEdited] = useState(false);
    const [userData, setUserData] = useState()
    const [newUserData, setNewUerData] = useState();
    const [myRentalList, setMyRentalList] = useState();
    const [myRepairList, setRepairList] = useState();

    const getUserInfo = useCallback(async () => {
        await axios.get(`${process.env.REACT_APP_DOMAIN}/user/inquireMyInfo`, {
            // params: {
            //     user_id: userInfo.login.user_id
            // },
            headers: {
                token: userInfo.token
            }
        }).then((res) => {
            console.log("userInfo", res);
            if (res.data.suc) {
                setUserData(res.data.inquireMyInfo);
                setNewUerData(res.data.inquireMyInfo);
            }
            else Promise.reject(new Error("ChangeInfoUser", res.data.error));
            console.log(res.data.inquireMyInfo);
        });
    }, [userInfo.token]);


    const getMyRentalList = async () => {
        axios.get(`${process.env.REACT_APP_DOMAIN}/rental/myAllRentalList/1`, {
            headers: {
                token: userInfo.token
            }
        })
            .then((res) => {
                console.log("getMyRentalList", res.data.result);
                if (res.data.suc) {
                    setMyRentalList(res.data.result.slice(0, 2));
                }
                else Promise.reject(new Error("getMyRentalList", res.data.error));
            })
            .catch((err) => {
                console.log("getMyRentalList", err);
            });
    };

    const getRepairList = async () => {
        axios.get(`${process.env.REACT_APP_DOMAIN}/repair/myRepairList/1`, {
            headers: {
                token: userInfo.token
            }
        })
            .then((res) => {
                console.log("getRepairList", res.data.result.slice(0, 2));
                if (res.data.suc) {
                    setRepairList(res.data.result.slice(0, 2));
                }
                else Promise.reject(new Error("getRepairList", res.data.error));
            })
            .catch((err) => {
                console.log("getRepairList", err);
            });
    }

    useEffect(() => {
        getUserInfo();
        getMyRentalList();
        getRepairList();
    }, [getUserInfo]);

    const onChange = (e) => {
        console.log(e);
        const { name, value } = e.target;
        setNewUerData({
            ...newUserData,
            [name]: value
        });
    }

    const onSubmit = (e) => {
        e.preventDefault();
        setUserData(newUserData);
        setEdited(false);
        updateUserInfo();
    }

    const updateUserInfo = async () => {
        const { user_id, user_email, user_name, user_phone_number } = newUserData;
        console.log("newUserData", newUserData);
        await axios.post(`${process.env.REACT_APP_DOMAIN}/user/changeInfo`, {
            user_id: user_id,
            user_email: user_email,
            user_name: user_name,
            user_phone_number: user_phone_number,
        }, {
            headers: {
                token: userInfo.token
            }
        }).then((res) => {
            console.log(res);
        });
    }

    return (
        <div id="changeInfoUser-wrap">
            <div id="contents-header" style={{
                // width: "100%",
                padding: 0
            }}>
                <h3 style={{
                    margin: 0
                }}>{userData?.user_name?.slice(0, 3)}님의 정보</h3>
                <button onClick={() => setEdited(true)}>
                    정보 수정
                </button>
            </div>
            {
                !edited ?
                    userData &&
                    <div style={{
                        fontWeight: "700",
                        color: "#676767",
                    }}>
                        <p>
                            아이디 : {userData.user_id} <br />
                            이름 : {userData.user_name} <br />
                            전화번호 : {userData.user_phone_number}
                        </p>
                        <p>
                            학번 : {userData.user_student_number}<br />
                            학과 : {userData.department.department_name} <br />
                            이메일 : {userData.user_email}
                        </p>
                    </div>
                    :
                    newUserData &&
                    <form onSubmit={onSubmit}>
                        <p>
                            아이디 : <input
                                name="user_id"
                                value={newUserData.user_id}
                                onChange={onChange}
                                autoComplete="none"
                            />
                            <br />
                            이름 : <input
                                name="user_name"
                                value={newUserData.user_name}
                                onChange={onChange}
                                autoComplete="none"
                            />
                            <br />
                            전화번호 : <input
                                type="tel"
                                name="user_phone_number"
                                value={newUserData.user_phone_number}
                                onChange={onChange}
                                pattern="[0-9]{3}[0-9]{4}[0-9]{4}"
                                maxLength={13}
                            />
                        </p>
                        <p>
                            학번 : <input
                                name="user_student_number"
                                value={newUserData.user_student_number}
                                onChange={onChange}
                                disabled
                            />
                            <br />
                            학과 : <input
                                name="department_name"
                                value={newUserData.department.department_name}
                                onChange={onChange}
                                disabled
                            />
                            <br />
                            이메일 : <input
                                type="email"
                                name="user_email"
                                value={newUserData.user_email}
                                onChange={onChange}
                            // pattern=".+@mjc.ac.kr"
                            />
                        </p>
                        <button type="submit" style={{
                            display: "none"
                        }}>
                            완료
                        </button>
                    </form>
            }
            <hr style={{
                border: "solid 1px #9785CB"
            }} />
            <div>
                <div id="contents-header" style={{
                    justifyContent: "space-between",
                    padding: "0px 5px 0px 5px"
                }}>
                    <h3>최근 대여 품목</h3>
                    <Link to={"/home/myRentalList"}>더보기</Link>
                </div>
                {myRentalList ?
                    <div style={{
                        display: "flex",
                        justifyContent: "space-between",
                        paddingBottom: "32px",
                        borderBottom: "solid 1px black"
                    }}>
                        {myRentalList.map((item, index) => (
                            <RentalPackage key={index}>
                                <div style={{
                                    display: "flex",
                                }}>
                                    <img src={`${process.env.REACT_APP_DOMAIN}/tool/${item.tool.img.img_url}`} alt="태블릿" />
                                    <div style={{
                                        // minWidth: "300px",
                                        marginRight: "8px"
                                    }}>
                                        <span>{item.tool.tool_name}</span> &nbsp; 대여 중
                                        <p id="code">
                                            품목 코드 : 9115 <br />
                                            자산번호 : {item.tool.tool_id}
                                        </p>
                                        <p id="info">
                                            구입 구분 : 교비 (등록금) <br />
                                            구입 일자 : 2017년 2월 14일 <br />
                                            물품 규격 : LG G패드 3 8.0 Wi-Fi 32G
                                        </p>
                                    </div>
                                </div>
                                <div style={{
                                    textAlign: "center",
                                }}>
                                    <h3>{item.rental_state}</h3>
                                    <p>~ {item.rental_date.split("-")[1]} / {item.rental_date.split("-")[2].slice(0, 2)}</p>
                                </div>
                            </RentalPackage>
                        ))}
                    </div>
                    :
                    <div>
                        <p>최근 대여 품목이 없습니다.</p>
                    </div>
                }
                <div id="contents-header" style={{
                    justifyContent: "space-between",
                    padding: "0px 5px 0px 5px"
                }}>
                    <h3>최근 건의 내역</h3>
                    <Link to={"/home/myRentalList/reportLog"}>더보기</Link>
                </div>
                {myRepairList ?
                    <div style={{
                        display: "flex",
                        justifyContent: "space-between",
                        paddingBottom: "32px",
                        borderBottom: "solid 1px black"
                    }}>
                        {myRepairList.map((item, index) => (
                            <RentalPackage key={index}>
                                <div style={{
                                    display: "flex",
                                }}>
                                    <img src={`${process.env.REACT_APP_DOMAIN}/tool/${item.tool.img.img_url}`} alt="태블릿" />
                                    <div style={{
                                        // maxWidth: "300px",
                                        marginRight: "8px"
                                    }}>
                                        <span>{item.tool.tool_name}</span> &nbsp; 대여 중
                                        <p id="code">
                                            품목 코드 : {item.tool.tool_code} <br />
                                            자산번호 : {item.tool.tool_id}
                                        </p>
                                        <p id="info">
                                            구입 구분 : {item.tool.tool_purchase_division} <br />
                                            구입 일자 : {item.tool.tool_purchase_date.split("-")[0]}년 {item.tool.tool_purchase_date.split("-")[1]}월 {item.tool.tool_purchase_date.split("-")[2].slice(0, 2)}일<br />
                                            물품 규격 : {item.tool.tool_standard}
                                        </p>
                                    </div>
                                </div>
                                <div style={{
                                    textAlign: "center",
                                }}>
                                    <h3>{item.tool.tool_state}</h3>
                                    {/* <p>~ 11 / 30</p> */}
                                </div>
                            </RentalPackage>
                        ))}
                    </div>
                    :
                    <div>
                        <p>최근 건의 내역이 없습니다.</p>
                    </div>
                }
            </div>
        </div>
    );
}

const RentalPackage = styled.div`
   display: flex;
   align-items: center;
   color: #676767;
   font-weight: 700;
   margin-right: 64px;

   width: 100%;

   
   img {
    width: 160px;
    height: 160px;
    border-radius: 8px;
    border: solid 1px black;
    margin-right: 36px;
   }

   span {
    color: #181818;
   }

   #info {
    font-weight: 400;
   }
`