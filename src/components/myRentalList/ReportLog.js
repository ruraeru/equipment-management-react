import axios from "axios";
import Search from "components/search/Search";
import { useActive, useHeaderActive } from "hooks/useActive";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function ReportLog({ userData }) {
    const [reportList, setReportList] = useState();
    useEffect(() => {
        getReportList();
    }, []);
    const getReportList = async () => {
        await axios.get(`${process.env.REACT_APP_DOMAIN}/repair/myRepairList/${userData.login.user_id}/1`)
            .then((res) => {
                if (res.data.suc) {
                    setReportList(res.data.result);
                }
                else Promise.reject(new Error("error", res.data.error));
            }).catch((err) => {
                console.log(err);
            });
    }
    return (
        <>
            <div id="contents-header">
                <Link to="/home/myRentalList">
                    내 대여 내역
                </Link>
                <Link to="/home/myRentalList/reportLog" className="active">
                    내 건의 내역
                </Link>
                <Link to="/home/myRentalList/rentalListManagement">
                    대여 관리
                </Link>
                <Search />
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
                    {reportList ? reportList.map((item, index) => (
                        <tr key={index}>
                            {/* <td>{item.result.rental_date.split("-")[1] + " / " + item.result.rental_date.split("-")[2].slice(0, 2)}</td>
                            <td>{item.result.tool.tool_use_division}</td>
                            <td>{item.result.tool.department.department_name}</td>
                            <td>{item.result.tool.tool_name}</td>
                            <td>{item.result.tool.tool_id}</td>
                            <td className={item.D_day === "미반납" ? "rentalF" : ""}>{item.D_day}</td> */}
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
        </>
    )
}