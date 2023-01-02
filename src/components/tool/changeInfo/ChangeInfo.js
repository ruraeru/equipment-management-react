import { useEffect, useState } from "react";
import axios from "axios";
import Search from "components/search/Search";
import { SiMicrosoftexcel } from "react-icons/si";
// import "../../rentalList/RentalList.scss";
import "./ChangeInfo.scss";
import DetailEquipment from "components/detail/DetailEquipment";
import { Link } from "react-router-dom";
import * as XLSX from "xlsx";
import styled from "styled-components";

export default function ChangeInfo() {
    const ExcelExport = () => {
        const table = document.getElementById("equipment-list");
        const wb = XLSX.utils.table_to_book(table, {
            raw: true
        });

        XLSX.writeFile(wb, "기자재리스트.xlsx");
    }
    const [rentalList, setRentalList] = useState();
    const [rentalListPage, setRentalListPage] = useState(1);
    const getRentalList = async () => {
        await axios.get(`${process.env.REACT_APP_DOMAIN}/tool/viewToolList/1/${rentalListPage}`)
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
                <h3>기자재 건의사항</h3>
                <p>기자재 반납</p>
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
                        <th>관리 부서</th>
                        <th>기자재명</th>
                        <th>자산 번호</th>
                        <th>기자재 상태</th>
                    </tr>
                </thead>
                <tbody>
                    {rentalList && rentalList.map((item, index) => (
                        <tr key={index} onClick={(e) => {

                        }}>
                            <td className="check-wrap">
                                <input type="checkbox" id="check-btn" />
                                <label htmlFor="check-btn" />
                            </td>
                            <td>{item.tool_use_division}</td>
                            <td>{item.department.department_name}</td>
                            <td>{item.tool_name}</td>
                            <td>{item.tool_id}</td>
                            <td className={
                                item.tool_state === "대여가능"
                                    ? "rentalT"
                                    : item.tool_state === "대여 중"
                                        ? "rentalI"
                                        : "rentalF"
                            }>{item.tool_state}</td>
                        </tr>
                    ))}
                    <tr>
                        <td className="check-wrap">
                            <input type="checkbox" id="check-btn" />
                            <label htmlFor="check-btn" />
                        </td>
                        <td>교육용</td>
                        <td>소프트웨어콘텐츠 과</td>
                        <td>스마트 패드</td>
                        <td>2017021402226</td>
                        <td>대여 가능</td>
                    </tr>
                    <tr id="equipment-report">
                        <td className="check-wrap" colSpan={1}>
                            <input type="checkbox" id="check-btn" />
                            <label htmlFor="check-btn" />
                        </td>
                        <td id="code-detail" colSpan={4}>
                            <div style={{
                                display: "flex",
                                flexDirection: "row",
                                justifyContent: "left",
                                alignItems: "center"
                            }}>
                                <div>
                                    <img src="https://www.lenovo.com/medias/lenovo-tablet-lenovo-tab-p12-pro-subseries-hero.png?context=bWFzdGVyfHJvb3R8MjM1NTEwfGltYWdlL3BuZ3xoOTgvaGQ3LzEyNjgwMzcxOTI5MTE4LnBuZ3wzZjU1YzNmYmMzZDgxOTQ5NjBkZjU2ZThhNmUxZGMzY2E2ZjM3ZjM1OGMyZDA4YzhjNTBhNjUxZDRhMDlhZjgx" alt="태블릿" />
                                </div>
                                <div id="info">
                                    <span>스마트 패드</span>
                                    <p id="code">
                                        품목 코드 : 9115 <br />
                                        자산 번호 : 2017021402226
                                    </p>
                                    <p id="detail">
                                        구입 구분 : 교비 (등록금) <br />
                                        구입 일자 : 2017년 2월 14일 <br />
                                        물품 규격 : LG G패드 3 8.0 Wi-Fi 32G
                                    </p>
                                </div>
                                <div id="report">
                                    <span>건의 신청</span>
                                    <p id="code">
                                        건의자: 홍길동(학부생) <br />
                                        건의 일자 : 2022 / 11 / 21
                                    </p>
                                    <p>
                                        변동 일자 : 2022 / 12 / 05
                                    </p>
                                </div>
                            </div>
                            <div id="report-comment">
                                <h3>건의 내용 : </h3>
                                <p>터치가 안돼요</p>
                            </div>
                        </td>
                        <td>
                            <select className="equipment-state-select">
                                <option>대여 불가</option>
                                <option>대여 가능</option>
                            </select>
                        </td>
                    </tr>
                </tbody>
            </table>
            <footer className="list-nav">
                <p>
                    &lt;
                </p>
                <button onClick={() => setRentalListPage(1)}>1</button>
                <button onClick={() => setRentalListPage(2)}>2</button>
                <button onClick={() => setRentalListPage(2)}>3</button>
                <button onClick={() => setRentalListPage(2)}>4</button>
                <button onClick={() => setRentalListPage(2)}>5</button>
                <p>
                    &gt;
                </p>
            </footer>
        </div >
    );
}