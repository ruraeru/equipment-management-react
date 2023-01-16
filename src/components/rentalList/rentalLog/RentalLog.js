import Search from "components/search/Search";
import { useEffect, useState } from "react";
import axios from "axios";
import { SiMicrosoftexcel } from "react-icons/si";
// import "../RentalList.scss";
import { Link, useParams } from "react-router-dom";
import * as XLSX from "xlsx";
import { useActive, useHeaderActive } from "hooks/useActive";
import { Cookies } from "react-cookie";
import Navigation from "components/nav/Navigation";

export default function RentalLog() {
    const page = useParams().page;

    const [checkItems, setCheckItems] = useState([]);

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
            rentalLog.forEach((el) => {
                console.log(el.log_id);
                idArray.push(el.log_id);
            });
            setCheckItems(idArray);
        }
        else {
            // 전체 선택 해제 시 checkItems 를 빈 배열로 상태 업데이트
            setCheckItems([]);
        }
    }

    const ExcelExport = () => {
        const table = document.getElementById("equipment-list");
        const wb = XLSX.utils.table_to_book(table, {
            raw: true
        });

        XLSX.writeFile(wb, `대여로그 - ${new Date().toLocaleString()}.xlsx`);
    }
    const [rentalLog, setRentalLog] = useState();

    const getRentalLog = async () => {
        await axios.get(`${process.env.REACT_APP_DOMAIN}/rental/viewLog/1/${page}`)
            .then((res) => {
                console.log(res.data.result);
                setRentalLog(res.data.result);
            })
    }

    useEffect(() => {
        getRentalLog();
    }, [page]);

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
                <Link to="/home/rentalLog/1" className="active">
                    대여 로그
                </Link>
                <Search />
                {/*여기 엑셀 버튼을 나중에 컴포넌트로 따로 분리해주기 바람
                이유는 나중에 엑셀 export해주기 위해!! */}
                <SiMicrosoftexcel size="27px" color="#20744A" onClick={ExcelExport} />
            </div>
            <table>
                <thead>
                    <tr>
                        <th>
                            <input type="checkbox" name="select-all"
                                onChange={(e) => handleAllCheck(e.target.checked)}
                                checked={checkItems.length === rentalLog?.length ? true : false}
                            />
                        </th>
                        <th>번호</th>
                        <th>구분</th>
                        <th>로그</th>
                        <th>학과 번호</th>
                        <th>로그 일자</th>
                    </tr>
                </thead>
                <tbody>
                    {rentalLog && rentalLog.map((item, index) => {
                        return (
                            <tr key={index}>
                                <td>
                                    <input type="checkbox" name={`select-${item?.log_id}`}
                                        onChange={(e) => handleSingleCheck(e.target.checked, item?.log_id)}
                                        checked={checkItems.includes(item?.log_id) ? true : false}
                                    />
                                </td>
                                <td>{item?.log_id}</td>
                                <td>{item?.log_title}</td>
                                <td>{item?.log_content}</td>
                                <td>{item?.department_id}</td>
                                <td>{item?.log_create_at.split("-")[1]} / {item?.log_create_at.split("-")[0].slice(0, 2)}</td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
            <table style={{
                display: "none"
            }} id="equipment-list">
                <thead>
                    <tr>
                        <th>번호</th>
                        <th>구분</th>
                        <th>로그</th>
                        <th>학과 번호</th>
                        <th>로그 일자</th>
                    </tr>
                </thead>
                <tbody>
                    {checkItems?.map((log_id) => (
                        rentalLog?.map((item, index) => (
                            log_id === item.log_id ?
                                <tr key={index}>
                                    <td>{item.log_id}</td>
                                    <td>{item.log_title}</td>
                                    <td>{item.log_content}</td>
                                    <td>{item.department_id}</td>
                                    <td>{item.log_create_at.split("-")[1]} / {item.log_create_at.split("-")[2].slice(0, 2)}</td>
                                </tr>
                                : null
                        )
                        )))}
                </tbody>
            </table>
            <Navigation list={["/home/rentalLog/1", "/home/rentalLog/2", "/home/rentalLog/3", "/home/rentalLog/4", "/home/rentalLog/5",]} />
        </div>
    );
}