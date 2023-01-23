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
import Navigation from "components/nav/Navigation";
import Pagination from "components/nav/Pagination";

export default function ChangeInfo({ userData }) {
    const [modalOpen, setModalOpen] = useState(false);
    const [modalData, setModalData] = useState();
    const [reportList, setReportList] = useState();
    const [repairData, setRepairData] = useState();

    const [page, setPage] = useState(1);
    const [isSearch, setSearch] = useState(false);

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
            reportList.forEach((el) => {
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

    const getRepairData = async (repair_id) => {
        await axios.get(`${process.env.REACT_APP_DOMAIN}/repair/viewRepair/${repair_id}`, {
            headers: {
                token: userData.token
            }
        })
            .then((res) => {
                console.log(res.data.result);
                if (res.data.suc) {
                    setRepairData(res.data.result);
                }
                else Promise.reject(new Error(res.data.error));
            }).catch((err) => {
                console.log("gerRepairData API", err);
            })
    }

    const getReportList = async () => {
        await axios.get(`${process.env.REACT_APP_DOMAIN}/repair/viewRepairList/${page}`, {
            headers: {
                token: userData.token
            }
        })
            .then((res) => {
                if (res.data.suc) {
                    setReportList(res.data.result);
                    console.log(res.data.result);
                }
                else Promise.reject(new Error(res.data.error));
            }).catch((err) => {
                console.log("Equipment report API Error", err);
            });
    }

    useEffect(() => {
        getReportList();
    }, [page]);

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

        XLSX.writeFile(wb, "기자재 건의사항.xlsx");
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
                <Search
                    type="report"
                    setList={setReportList}
                    getList={getReportList}
                    token={userData.token}
                    isSearch={isSearch}
                    setSearch={setSearch}
                />
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
                                checked={checkItems.length === reportList?.length ? true : false}
                            />
                        </th>
                        <th>구분</th>
                        <th>기자재명</th>
                        <th>자산 번호</th>
                        <th>기자재 상태</th>
                    </tr>
                </thead>
                <tbody>
                    {reportList ?
                        reportList.map((item, index) => (
                            <tr key={index} onClick={(e) => {
                                if (e.target.tagName !== "INPUT") {
                                    getRepairData(item?.repair_id).then(() => openModal());
                                }
                            }}>
                                <td>
                                    <input type="checkbox" name={`select-${item.tool_id}`}
                                        onChange={(e) => handleSingleCheck(e.target.checked, item.tool_id)}
                                        checked={checkItems.includes(item.tool_id) ? true : false}
                                    />
                                </td>
                                <td>{item?.tool?.tool_use_division}</td>
                                {/* <td>{item?.tool?.department_id}</td> */}
                                <td>{item?.tool?.tool_name}</td>
                                <td>{item?.tool?.tool_code}</td>
                                <td>{item?.tool?.tool_state}</td>
                            </tr>
                        ))
                        :
                        <tr>
                            <td colSpan={6}>
                                <p>
                                    건의사항이 없습니다.
                                </p>
                            </td>
                        </tr>
                    }
                </tbody>
            </table>
            <table style={{
                display: "none"
            }} id="equipment-list">
                <thead>
                    <tr>
                        <th>구분</th>
                        {/* <th>관리 부서</th> */}
                        <th>기자재명</th>
                        <th>자산 번호</th>
                        <th>기자재 상태</th>
                    </tr>
                </thead>
                <tbody>
                    {checkItems?.map((item_id) => (
                        reportList?.map((item, index) => (
                            item_id === item.tool_id ?
                                <tr key={index}>
                                    <td>{item.tool.tool_use_division}</td>
                                    {/* <td>{item.tool.department_id}</td> */}
                                    <td>{item.tool.tool_name}</td>
                                    <td>{item.tool.tool_code}</td>
                                    <td>{item.tool.tool_state}</td>
                                </tr>
                                : null
                        ))
                    ))}
                </tbody>
            </table>
            <ChangeInfoModal open={modalOpen} close={closeModal} header={repairData?.user_id}>
                <ReportModal data={repairData} token={userData.token} />
            </ChangeInfoModal>
            <Pagination page={page} setPage={setPage} active={!isSearch} />
            {/* <Navigation list={["/tool/changeInfo/1", "/tool/changeInfo/2", "/tool/changeInfo/3", "/tool/changeInfo/4", "/tool/changeInfo/5",]} /> */}
        </div >
    );
}