import axios from "axios";
import Pagination from "components/nav/Pagination";
import Search from "components/search/Search";
import { useHeaderActive } from "hooks/useActive";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function MyRentalList({ userData }) {
    const [page, setPage] = useState(1);
    const [isSearch, setSearch] = useState(false);

    const [rentalList, setRentalList] = useState();
    const getMyRentalList = async () => {
        await axios.get(`${process.env.REACT_APP_DOMAIN}/rental/myAllRentalList/${page}`, {
            params: {
                user_id: userData.login.user_id
            },
            headers: {
                token: userData.token
            }
        })
            .then((res) => {
                console.log(res);
                setRentalList(res.data.result);
            }).catch(err => {
                console.log(err);
            });
    }
    useEffect(() => {
        getMyRentalList();
    }, [page]);
    return (
        <div style={{
            width: "100%",
            height: "804px",
            position: "relative"
        }}>
            <div id="contents-header">
                <Link to="/home/myRentalList"
                    className={useHeaderActive("/home/myRentalList") ? "active" : null}>
                    내 대여 내역
                </Link>
                <Link to="/home/myRentalList/reportLog" className={useHeaderActive("/home/myRentalList/rentalLog") ? "active" : null}>
                    내 건의 내역
                </Link>
                <Link to="/home/myRentalList/manage" className={useHeaderActive("/home/myRentalList/rentalLog") ? "active" : null}>
                    대여 관리
                </Link>
                <Search
                    type="myRental"
                    setList={setRentalList}
                    getList={getMyRentalList}
                    token={userData.token}
                    isSearch={isSearch}
                    setSearch={setSearch}
                />
            </div>
            <table>
                <thead>
                    <tr>
                        <th>날짜</th>
                        <th>구분</th>
                        <th>관리 부서</th>
                        <th>기자재명</th>
                        <th>자산 번호</th>
                        <th>기자재 상태</th>
                    </tr>
                </thead>
                <tbody>
                    {rentalList ? rentalList.map((item, index) => (
                        <tr key={index}>
                            <td>{item.rental_date.split("-")[1] + " / " + item.rental_date.split("-")[2].slice(0, 2)}</td>
                            <td>{item.tool.tool_use_division}</td>
                            <td>{item.tool.department.department_name}</td>
                            <td>{item.tool.tool_name}</td>
                            <td>{item.tool.tool_id}</td>
                            <td>{item.rental_state}</td>
                        </tr>
                    ))
                        :
                        <tr>
                            <td colSpan={6}>대여 내역이 없습니다.</td>
                        </tr>
                    }
                </tbody>
            </table>
            <Pagination page={page} setPage={setPage} active={!isSearch} />
        </div>
    );
}