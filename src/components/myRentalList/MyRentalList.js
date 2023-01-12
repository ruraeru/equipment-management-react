import axios from "axios";
import Search from "components/search/Search";
import { useHeaderActive } from "hooks/useActive";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function MyRentalList() {
    const [rentalList, setRentalList] = useState();
    const getMyRentalList = async () => {
        await axios.get(`${process.env.REACT_APP_DOMAIN}/rental/myCurrentRentalList/student/1`)
            .then((res) => {
                setRentalList(res.data);
            }).catch(err => {
                console.log(err);
            });
    }
    useEffect(() => {
        getMyRentalList();
    }, []);
    return (
        <>
            <div id="contents-header">
                <Link to="/home/myRentalList"
                    className={useHeaderActive("/home/myRentalList") ? "active" : null}>
                    내 대여 내역
                </Link>
                <Link to="/home/myRentalList/reportLog" className={useHeaderActive("/home/myRentalList/rentalLog") ? "active" : null}>
                    내 건의 내역
                </Link>
                <Link to="/home/myRentalList/rentalListManagement" className={useHeaderActive("/home/myRentalList/rentalLog") ? "active" : null}>
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
                    {rentalList && rentalList.map((item, index) => (
                        <tr key={index}>
                            <td>{item.result.rental_date.split("-")[1] + " / " + item.result.rental_date.split("-")[2].slice(0, 2)}</td>
                            <td>{item.result.tool.tool_use_division}</td>
                            <td>{item.result.tool.department.department_name}</td>
                            <td>{item.result.tool.tool_name}</td>
                            <td>{item.result.tool.tool_id}</td>
                            <td className={item.D_day === "미반납" ? "rentalF" : ""}>{item.D_day}</td>
                        </tr>
                    ))}
                    <tr>
                        <td>11 / 16</td>
                        <td>교육용</td>
                        <td>소프트웨어콘텐츠 과</td>
                        <td>스마트 패드</td>
                        <td>2017021402226</td>
                        <td>대여중</td>
                    </tr>
                </tbody>
            </table>
        </>
    );
}