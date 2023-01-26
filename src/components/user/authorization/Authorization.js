import axios from "axios";
import Pagination from "components/nav/Pagination";
import Search from "components/search/Search";
import { useEffect } from "react";
import { useState } from "react";

export default function Authorization({ userData }) {
    const [checkItems, setCheckItems] = useState([]);
    const [approvalRequestList, setApprovalRequestList] = useState();
    const [page, setPage] = useState(1);
    const [isSearch, setSearch] = useState(false);

    useEffect(() => {
        getApprovalRequestList();
    }, [page]);

    const getApprovalRequestList = async () => {
        await axios.get(`${process.env.REACT_APP_DOMAIN}/user/approvalRequestList/${page}`, {
            headers: {
                token: userData.token
            }
        }).then((res) => {
            console.log(res);
            setApprovalRequestList(res.data.result);
        })
    }

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
            approvalRequestList.forEach((el) => {
                console.log(el.user_id);
                idArray.push(el.user_id);
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
                if (res.data.suc) {
                    setApprovalRequestList(res.data.result);
                }
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
                <Search
                    type="approvalList"
                    setList={setApprovalRequestList}
                    getList={getApprovalRequestList}
                    token={userData.token}
                    isSearch={isSearch}
                    setSearch={setSearch}
                />
                <div style={{
                    display: "flex",
                    alignItems: "center"
                }}>
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
                                checked={checkItems.length === approvalRequestList?.length ? true : false}
                            />
                        </th>
                        <th>이름</th>
                        {/* <th>분류</th> */}
                        <th>아이디</th>
                        <th>이메일</th>
                        <th>가입 일자</th>
                    </tr>
                </thead>
                <tbody>
                    {approvalRequestList && approvalRequestList.map((item, index) => (
                        <tr key={index}>
                            <td>
                                <input type="checkbox" name={`select-${item?.user_id}`}
                                    onChange={(e) => handleSingleCheck(e.target.checked, item?.user_id)}
                                    checked={checkItems.includes(item?.user_id) ? true : false}
                                />
                            </td>
                            <td>{item.user_name}</td>
                            {/* <td>{item.division}</td> */}
                            <td>{item.user_id}</td>
                            <td>{item.user_email}</td>
                            <td>{item.user_created_at.split("-")[1]} / {item.user_created_at.split("-")[2].slice(0, 2)}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <Pagination page={page} setPage={setPage} active={!isSearch} />
        </div>
    );
}