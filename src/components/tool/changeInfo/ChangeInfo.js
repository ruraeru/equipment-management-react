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
    const [reportData, setReportData] = useState();

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
            reportData.forEach((el) => {
                console.log(el.tool_id);
                idArray.push(el.tool_id);
            });
            setCheckItems(idArray);
        }
        else {
            // 전체 선택 해제 시 checkItems 를 빈 배열로 상태 업데이트
            setCheckItems([]);
        }
    }


    const getReportList = async () => {
        await await axios.get(`${process.env.REACT_APP_DOMAIN}/repair/myRepairList/student/1`)
            .then((res) => {
                // setReportData(res.data);

                // if (res.data.suc) {
                //     console.log(res.data);
                //     setReportData(res.data);
                // }
                // else {
                //     setReportData(res.data.error);
                //     Promise.reject(new Error(res.data.error));
                // }
            }).catch((err) => {
                console.log("Equipment report API Error", err);
            });
    }

    useEffect(() => {
        getReportList();
    }, []);

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
                        <th>
                            <input type="checkbox" name="select-all"
                                onChange={(e) => handleAllCheck(e.target.checked)}
                                checked={checkItems.length === reportData?.length ? true : false}
                            />
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
                        <td>
                            <input type="checkbox" />
                        </td>
                        <td>교육용</td>
                        <td>소프트웨어콘텐츠 과</td>
                        <td>스마트 패드</td>
                        <td>2017021402226</td>
                        <td>대여 가능</td>
                    </tr>
                    {reportData ?
                        <tr>
                            <td>
                                {/* 건의사항 출력 */}
                                {/* <td>
                            <input type="checkbox" name={`select-${item.tool_id}`}
                                onChange={(e) => handleSingleCheck(e.target.checked, item.tool_id)}
                                checked={checkItems.includes(item.tool_id) ? true : false}
                            />
                        </td> */}
                            </td>
                        </tr>
                        :
                        <tr>
                            <td colspan={6}>
                                <p>
                                    건의사항이 없습니다.
                                </p>
                            </td>
                        </tr>
                    }
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