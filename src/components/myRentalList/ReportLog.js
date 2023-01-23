import axios from "axios";
import Pagination from "components/nav/Pagination";
import Search from "components/search/Search";
import { useActive, useHeaderActive } from "hooks/useActive";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function ReportLog({ userData }) {
    const [page, setPage] = useState(1);
    const [isSearch, setSearch] = useState(false);
    const [reportList, setReportList] = useState();
    useEffect(() => {
        getReportList();
    }, [page]);
    const getReportList = async () => {
        await axios.get(`${process.env.REACT_APP_DOMAIN}/repair/myRepairList/${page}`, {
            headers: {
                token: userData.token
            }
        })
            .then((res) => {
                console.log(res.data);
                if (res.data.suc) {
                    setReportList(res.data.result);
                }
                else Promise.reject(new Error("error", res.data.error));
            }).catch((err) => {
                console.log(err);
            });
    }
    return (
        <div style={{
            width: "100%",
            height: "804px",
            position: "relative"
        }}>
            <div id="contents-header">
                <Link to="/home/myRentalList">
                    내 대여 내역
                </Link>
                <Link to="/home/myRentalList/reportLog" className="active">
                    내 건의 내역
                </Link>
                {/* <Link to="/home/myRentalList/rentalListManagement">
                    대여 관리
                </Link> */}
                <Search
                    type="myReport"
                    setList={setReportList}
                    getList={getReportList}
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
                    {reportList ? reportList.map((item, index) => (
                        <tr key={index}>
                            <td>{item.repair_create_at.split("-")[1] + " / " + item.repair_create_at.split("-")[2].slice(0, 2)}</td>
                            <td>{item.tool.tool_use_division}</td>
                            <td>{item.tool.department_id}</td>
                            <td>{item.tool.tool_name}</td>
                            <td>{item.tool.tool_id}</td>
                            <td>{item.tool.tool_state}</td>
                        </tr>
                    )) :
                        <tr>
                            <td colSpan={6}>
                                <p>건의 내역이 없습니다.</p>
                            </td>
                        </tr>
                    }
                </tbody>
            </table>
            <Pagination page={page} setPage={setPage} active={!isSearch} />
        </div>
    )
}