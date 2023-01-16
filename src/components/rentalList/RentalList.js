import { useEffect, useState } from "react";
import axios from "axios";
import Search from "components/search/Search";
import { SiMicrosoftexcel } from "react-icons/si";
import "./RentalList.scss";
import { Link, useNavigate, useParams } from "react-router-dom";
import * as XLSX from "xlsx";
import { useActive, useHeaderActive } from "hooks/useActive";
import DetailEquipment from "components/detail/DetailEquipment";
import Modal from "components/detail/EquipmentModal";
import Navigation from "components/nav/Navigation";

export default function RentalList({ userData }) {
    const page = useParams().page;
    const navigate = useNavigate();
    const [modalOpen, setModalOpen] = useState(false);
    const [modalData, setModalData] = useState();

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
            rentalList.forEach((el) => {
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
                setModalData(res.data.tool);
                console.log("detailData", res.data);
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
    const getRentalList = async () => {
        console.log(userData.login.user_license);
        console.log(userData.token);
        //${userData.login.user_license}
        await axios.get(`${process.env.REACT_APP_DOMAIN}/tool/viewToolList/1/${page}`, {
            headers: {
                token: userData.token
            }
        })
            .then(res => {
                console.log("getRentalList", res.data.result);
                if (res.data.suc) {
                    setRentalList(res.data.result);
                }
                else Promise.reject(new Error("rentalList API 호출 실패"));
            }).catch(err => {
                console.log("rentalList API 오류", err);
            });
    }

    useEffect(() => {
        getRentalList(1, page);
    }, [page]);

    return (
        <div style={{
            width: "100%",
            height: "804px",
            position: "relative"
        }}>
            <div id="contents-header">
                <Link to="/home/rentalList/1"
                    className={useActive("/home/rentalList") ? "active" : null}>
                    대여 목록
                </Link>
                <Link to="/home/rentalLog/1" className={useHeaderActive("/home/rentalList/rentalLog") ? "active" : null}>
                    대여 로그
                </Link>
                <Search setRentalList={setRentalList} rentalList={rentalList} getRentalList={getRentalList} />
                {/*여기 엑셀 버튼을 나중에 컴포넌트로 따로 분리해주기 바람
                이유는 나중에 엑셀 export해주기 위해!! */}
                <SiMicrosoftexcel size="27px" color="#20744A" onClick={ExcelExport} />
            </div>
            <table >
                <thead>
                    <tr>
                        <th>
                            <input type="checkbox" name="select-all"
                                onChange={(e) => handleAllCheck(e.target.checked)}
                                checked={checkItems.length === rentalList?.length ? true : false}
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
                    {rentalList && rentalList.map((item, index) => (
                        <tr key={index} onClick={(e) => {
                            if (e.target.tagName !== "INPUT") {
                                setDetailEquipmentData(item?.tool_id);
                            }
                        }} className={
                            item?.tool_state === "대여가능"
                                ? "rentalT"
                                : item?.tool_state === "대여중"
                                    ? "rentalI"
                                    : item.tool_state === "대여불가" ? "rentalF"
                                        : "repair"
                        }>
                            <td>
                                <input type="checkbox" name={`select-${item?.tool_id}`}
                                    onChange={(e) => handleSingleCheck(e.target.checked, item?.tool_id)}
                                    checked={checkItems.includes(item?.tool_id) ? true : false}
                                />
                            </td>
                            <td>{item?.tool_use_division}</td>
                            <td>{item?.department?.department_name}</td>
                            <td>{item?.tool_name}</td>
                            <td>{item?.tool_id}</td>
                            <td>{item?.tool_state}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <table style={{
                display: "none"
            }} id="equipment-list">
                <thead>
                    <tr>
                        <th>구분</th>
                        <th>관리 부서</th>
                        <th>기자재명</th>
                        <th>자산 번호</th>
                        <th>기자재 상태</th>
                    </tr>
                </thead>
                <tbody>
                    {checkItems?.map((item_id) => (
                        rentalList?.map((item, index) => (
                            item_id === item.tool_id ?
                                <tr key={index}>
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
                                :
                                <tr>
                                    <td colSpan={6}>
                                        검색 결과가 없습니다.
                                    </td>
                                </tr>
                        ))
                    ))}
                </tbody>
            </table>
            {modalData &&
                <Modal open={modalOpen} close={closeModal} data={modalData}>
                    <DetailEquipment data={modalData} />
                </Modal>
            }
            <Navigation list={["/home/rentalList/1", "/home/rentalList/2", "/home/rentalList/3", "/home/rentalList/4", "/home/rentalList/5",]} />
        </div >
    );
}