import Search from "components/search/Search";
import { useEffect, useState } from "react";
import axios from "axios";
import { SiMicrosoftexcel } from "react-icons/si";
// import "../RentalList.scss";
import { Link } from "react-router-dom";
import * as XLSX from "xlsx";
import { useActive, useHeaderActive } from "hooks/useActive";
import { Cookies } from "react-cookie";
import Navigation from "components/nav/Navigation";

export default function RentalLog() {
    const ExcelExport = () => {
        const table = document.getElementById("equipment-list");
        const wb = XLSX.utils.table_to_book(table, {
            raw: true
        });

        XLSX.writeFile(wb, `대여로그 - ${new Date().toLocaleString()}.xlsx`);
    }
    const [rentalList, setRentalList] = useState();
    const [rentalListPage, setRentalListPage] = useState(1);
    const getRentalList = async () => {
        await axios.get(`${process.env.REACT_APP_DOMAIN}/tool/viewToolList`, {
            params: {
                department_id: 1,
                page: 1
            }
        })
            .then(res => {
                if (res.data.suc) {
                    setRentalList(res.data.result);
                }
                else Promise.reject(new Error("rentalList API 호출 실패"));
            }).catch(err => {
                console.log("rentalList API 오류", err);
            });
    }

    useEffect(() => {
        getRentalList(1, rentalListPage);
    }, [rentalListPage]);

    return (
        <div style={{
            width: "100%",
            height: "804px",
            position: "relative"
        }}>
            <div id="contents-header">
                <Link to="/home/rentalList/1">
                    대여 목록
                </Link>
                <Link to="/home/rentalList/rentalLog" className={useHeaderActive("/home/rentalList/rentalLog") ? "active" : null}>
                    대여 로그
                </Link>
                <Search />
                {/*여기 엑셀 버튼을 나중에 컴포넌트로 따로 분리해주기 바람
                이유는 나중에 엑셀 export해주기 위해!! */}
                <SiMicrosoftexcel size="27px" color="#20744A" onClick={ExcelExport} />
            </div>
            <table id="equipment-list">
                <thead>
                    <tr>
                        <th className="check-wrap">
                            <input type="checkbox" id="check-btn" />
                            <label htmlFor="check-btn" />
                        </th>
                        <th>구분</th>
                        <th>대여자명</th>
                        <th>기자재명</th>
                        <th>자산 번호</th>
                        <th>대여 일자</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td className="check-wrap">
                            <input type="checkbox" id="check-btn" />
                            <label htmlFor="check-btn" />
                        </td>
                        <td>교육용</td>
                        <td>김홍길동</td>
                        <td>스마트 패드</td>
                        <td>2017021402226</td>
                        <td>11 / 21</td>
                    </tr>
                </tbody>
            </table>
            <Navigation list={["/home/rentalLog/1", "/home/rentalLog/2", "/home/rentalLog/3", "/home/rentalLog/4", "/home/rentalLog/5",]} />
        </div>
    );
}