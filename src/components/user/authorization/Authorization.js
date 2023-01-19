import axios from "axios";
import Search from "components/search/Search";
import { useState } from "react";

export default function Authorization({ userData }) {
    const [checkItems, setCheckItems] = useState([]);
    const authUserList = [
        {
            "id": "2021661096",
            "name": "홍길동",
            "division": "학부생",
            "email": "test1234@test.com",
            "date": "11 / 20"
        },
        {
            "id": "2021661096",
            "name": "홍길동",
            "division": "학부생",
            "email": "test1234@test.com",
            "date": "11 / 20"
        },
        {
            "id": "2021661096",
            "name": "홍길동",
            "division": "학부생",
            "email": "test1234@test.com",
            "date": "11 / 20"
        },
        {
            "id": "2021661096",
            "name": "홍길동",
            "division": "학부생",
            "email": "test1234@test.com",
            "date": "11 / 20"
        },
        {
            "id": "2021661096",
            "name": "홍길동",
            "division": "학부생",
            "email": "test1234@test.com",
            "date": "11 / 20"
        },
    ]

    // 체크박스 단일 선택
    const handleSingleCheck = (checked, id) => {
        if (checked) {
            // 단일 선택 시 체크된 아이템을 배열에 추가
            setCheckItems(prev => [...prev, id]);
        } else {
            // 단일 선택 해제 시 체크된 아이템을 제외한 배열 (필터)
            setCheckItems(checkItems.filter((el) => el !== id));
        }
        console.log(checkItems);
    };

    // 체크박스 전체 선택
    const handleAllCheck = (checked) => {
        if (checked) {
            // 전체 선택 클릭 시 데이터의 모든 아이템(id)를 담은 배열로 checkItems 상태 업데이트
            const idArray = [];
            authUserList.forEach((el) => {
                console.log(el.id);
                idArray.push(el.id);
            });
            setCheckItems(idArray);
        }
        else {
            // 전체 선택 해제 시 checkItems 를 빈 배열로 상태 업데이트
            setCheckItems([]);
        }
    }
    const onAuth = () => {
        console.log(checkItems);
        checkItems.map(async (id) => (
            await axios.get(`${process.env.REACT_APP_DOMAIN}/user/qlfctAprvl`, {
                params: {
                    user_id: id
                },
                headers: {
                    token: userData.token
                }
            }).then((res) => {
                console.log(res.data);
            })
        ))
    }
    return (
        <div style={{
            width: "100%",
            height: "804px",
            position: "relative"
        }}>
            <div id="contents-header" style={{
                justifyContent: "space-between"
            }}>
                <p style={{
                    marginLeft: "16px",
                    fontWeight: "700"
                }}>회원가입 승인</p>
                <div style={{
                    display: "flex",
                    alignItems: "center"
                }}>
                    {/* <Search /> */}
                    <button onClick={onAuth} style={{
                        width: "98px",
                        height: "36px",
                        color: "#f5f5f5",
                        fontSize: "16px",
                        fontWeight: "700",

                        borderRadius: "8px",
                        border: "solid 1px #9785CB",
                        backgroundColor: "#9785CB",
                    }}>
                        승인하기
                    </button>
                </div>
            </div>
            <table>
                <thead>
                    <tr>
                        <th>
                            <input type="checkbox" name="select-all"
                                onChange={(e) => handleAllCheck(e.target.checked)}
                                checked={checkItems.length === authUserList?.length ? true : false}
                            />
                        </th>
                        <th>이름</th>
                        <th>분류</th>
                        <th>아이디</th>
                        <th>이메일</th>
                        <th>가입 일자</th>
                    </tr>
                </thead>
                <tbody>
                    {authUserList && authUserList.map((item, index) => (
                        <tr key={index}>
                            <td>
                                <input type="checkbox" name={`select-${item?.id}`}
                                    onChange={(e) => handleSingleCheck(e.target.checked, item?.id)}
                                    checked={checkItems.includes(item?.id) ? true : false}
                                />
                            </td>
                            <td>{item.name}</td>
                            <td>{item.division}</td>
                            <td>{item.id}</td>
                            <td>{item.email}</td>
                            <td>{item.date}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <footer className="list-nav">
                <p>
                    &lt;
                </p>
                <button onClick={() => (1)}>1</button>
                <button onClick={() => (2)}>2</button>
                <button onClick={() => (2)}>3</button>
                <button onClick={() => (2)}>4</button>
                <button onClick={() => (2)}>5</button>
                <p>
                    &gt;
                </p>
            </footer>
        </div>
    );
}