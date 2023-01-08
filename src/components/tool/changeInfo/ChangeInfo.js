import { useEffect, useState } from "react";
import axios from "axios";
import Search from "components/search/Search";
import { SiMicrosoftexcel } from "react-icons/si";
// import "../../rentalList/RentalList.scss";
import "./ChangeInfo.scss";
import { Link } from "react-router-dom";
import * as XLSX from "xlsx";
import styled from "styled-components";
import ChangeInfoModal from "./ChangeInfoModal";
import ReportModal from "./ReportModal";

export default function ChangeInfo({ userData }) {
    const [modalOpen, setModalOpen] = useState(false);
    const [modalData, setModalData] = useState();

    const openModal = () => {
        setModalOpen(true);
    }
    const closeModal = () => {
        setModalOpen(false);
    }
    const ExcelExport = () => {
        const table = document.getElementById("equipment-list");
        const wb = XLSX.utils.table_to_book(table, {
            raw: true
        });

        XLSX.writeFile(wb, "기자재리스트.xlsx");
    }

    return (
        <div style={{
            width: "100%",
            height: "804px",
            position: "relative"
        }}>
            <div id="contents-header">
                <p style={{
                    fontWeight: "700"
                }}>기자재 건의사항</p>
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
                    <tr onClick={openModal}>
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
                </tbody>
            </table>
            <ChangeInfoModal open={modalOpen} close={closeModal} header={"황태우"}>
                <ReportModal data={{
                    tool: {
                        name: "스마트 패드",
                        code: "9155",
                        number: "201702140226",
                    },
                    comment: {
                        comment: "터치가 안돼요",
                        user: {
                            name: "홍길동(학부생)",
                            date: new Date().toLocaleString(),
                            change_date: new Date().toLocaleString()
                        }
                    }
                }} />
            </ChangeInfoModal>
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
        </div >
    );
}