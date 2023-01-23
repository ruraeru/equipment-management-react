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
        await axios.get(`${process.env.REACT_APP_DOMAIN}/rental/myCurrentRentalList/${page}`, {
            headers: {
                token: userData.token
            }
        })
            .then((res) => {
                console.log(res);
                if (res.data.suc === false) return;
                setRentalList(res.data);
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
                {/* <Link to="/home/myRentalList/rentalListManagement" className={useHeaderActive("/home/myRentalList/rentalLog") ? "active" : null}>
                    대여 관리
                </Link> */}
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
                        <th>대여 기간</th>
                    </tr>
                </thead>
                <tbody>
                    {rentalList?.map((item, index) => (
                        <tr key={index}>
                            <td>{item.result.rental_date.split("-")[1] + " / " + item.result.rental_date.split("-")[2].slice(0, 2)}</td>
                            <td>{item.result.tool.tool_use_division}</td>
                            <td>{item.result.tool.department.department_name}</td>
                            <td>{item.result.tool.tool_name}</td>
                            <td>{item.result.tool.tool_id}</td>
                            <td>{item.D_day}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <Pagination page={page} setPage={setPage} active={!isSearch} />
        </div>
    );
}