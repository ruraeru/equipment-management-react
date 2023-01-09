import { useEffect, useState } from "react";
import axios from "axios";
import Search from "components/search/Search";
import { SiMicrosoftexcel } from "react-icons/si";
import "./RentalList.scss";
import { Link } from "react-router-dom";
import * as XLSX from "xlsx";
import { useHeaderActive } from "hooks/useActive";
import DetailEquipment from "components/detail/DetailEquipment";
import Modal from "components/detail/EquipmentModal";

export default function RentalList({ userData }) {
    const [modalOpen, setModalOpen] = useState(false);
    const [modalData, setModalData] = useState();

    const setDetailEquipmentData = async (tool_id) => {
        await axios.get(`${process.env.REACT_APP_DOMAIN}/tool/viewTool`, {
            params: {
                tool_id: tool_id
            },
            headers: {
                token: userData.token
            }
        }).then(res => {
            if (res.data.suc) {
                console.log(res.data.tool);
                setModalData(res.data.tool);
                // setModalData(res.data.result[0]);
            }
            else Promise.reject(new Error(res.data.error));
        }).catch(err => {
            console.log(err);
        });
        openModal();
    }

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
    const [rentalList, setRentalList] = useState();
    const [rentalListPage, setRentalListPage] = useState(1);
    const getRentalList = async () => {
        console.log(userData.token)
        await axios.get(`${process.env.REACT_APP_DOMAIN}/tool/viewToolList/1/${rentalListPage}`, {
            headers: {
                token: userData.token
            }
        })
            .then(res => {
                console.log(res);
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
                <Link to="/home/rentalList"
                    className={useHeaderActive("/home/rentalList") ? "active" : null}>
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
                        <th>관리 부서</th>
                        <th>기자재명</th>
                        <th>자산 번호</th>
                        <th>기자재 상태</th>
                    </tr>
                </thead>
                <tbody>
                    {rentalList && rentalList.map((item, index) => (
                        <tr key={index} onClick={() => {
                            setDetailEquipmentData(item.tool_id);
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
                    {/* <DetailEquipment /> */}
                    {/* <tr onClick={() => {
                        openModal();
                        setDetailEquipmentData("test");
                    }}>
                        <td className="check-wrap">
                            <input type="checkbox" id="check-btn" />
                            <label htmlFor="check-btn" />
                        </td>
                        <td>교육용</td>
                        <td>소프트웨어콘텐츠 과</td>
                        <td>스마트 패드</td>
                        <td>2017021402226</td>
                        <td>대여 가능</td>
                    </tr> */}
                    {/* <DetailEquipment /> */}
                </tbody>
            </table>
            <Modal open={modalOpen} close={closeModal} data={modalData}>
                <DetailEquipment data={modalData} />
            </Modal>
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