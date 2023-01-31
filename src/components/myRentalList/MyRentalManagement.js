import axios from "axios";
import DetailEquipment from "components/detail/DetailEquipment";
import EquipmentModal from "components/detail/EquipmentModal";
import Pagination from "components/nav/Pagination";
import Search from "components/search/Search";
import { useHeaderActive } from "hooks/useActive";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function MyRentalManagement({ userData }) {
    const navigate = useNavigate();
    const [page, setPage] = useState(1);
    const [isSearch, setSearch] = useState(false);
    const [rentalList, setRentalList] = useState();

    const [modalOpen, setModalOpen] = useState(false);
    const [due_date, setDue_date] = useState();
    const [rentalID, setRentalID] = useState();
    const [rentalData, setRentalData] = useState();

    useEffect(() => {
        getMyRentalList();
    }, [page]);

    const getMyRentalList = async () => {
        await axios.get(`${process.env.REACT_APP_DOMAIN}/rental/myCurrentRentalList/${page}`, {
            headers: {
                token: userData.token
            }
        })
            .then((res) => {
                console.log(res);
                setRentalList(res.data.result);
            }).catch(err => {
                console.log(err);
            });
    }

    const getEquipmentData = async (tool_id) => {
        await axios.get(`${process.env.REACT_APP_DOMAIN}/tool/viewTool`, {
            params: {
                tool_id: tool_id
            },
            headers: {
                token: userData.token
            }
        }).then(res => {
            if (res.data.suc) {
                setRentalData(res.data.tool);
            }
            else Promise.reject(new Error(res.data.error));
        }).catch(err => {
            console.log(err);
        });
        openModal();
    }

    const extensionDate = async (rental_id) => {
        await axios.post(`${process.env.REACT_APP_DOMAIN}/rental/extension`, {
            rental_id: rental_id
        }).then((res) => {
            if (res.data.suc) {
                alert(res.data.extension);
                navigate("/home/myRentalList/manage");
                window.location.reload();
            }
            else alert(res.data.error);
        });
    }

    const openModal = () => {
        setModalOpen(true);
    }

    const closeModal = () => {
        setModalOpen(false);
    }
    return (
        <div style={{
            width: "100%",
            height: "804px",
            position: "relative"
        }}>
            <div id="contents-header">
                <Link to="/home/myRentalList">
                    내 대여 내역
                </Link>
                <Link to="/home/myRentalList/reportLog">
                    내 건의 내역
                </Link>
                <Link to="/home/myRentalList/manage" className="active">
                    대여 관리
                </Link>
                <Search
                    type="myRentalManage"
                    setList={setRentalList}
                    getList={getMyRentalList}
                    token={userData.token}
                    isSearch={isSearch}
                    setSearch={setSearch}
                />
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
                    {rentalList ? rentalList.map((item, index) => (
                        <tr key={index} onClick={() => {
                            setRentalID(item.result.rental_id);
                            setDue_date({
                                "D_day": item.D_day,
                                "rental_date": item.result.rental_date,
                                "due_date": item.result.rental_due_date
                            });
                            getEquipmentData(item.result.tool.tool_id);
                        }}>
                            <td>{item.result?.rental_date.split("-")[1] + " / " + item.result.rental_date.split("-")[2].slice(0, 2)}</td>
                            <td>{item.result.tool.tool_use_division}</td>
                            <td>{item.result.tool.department.department_name}</td>
                            <td>{item.result.tool.tool_name}</td>
                            <td>{item.result.tool.tool_id}</td>
                            <td>{item.D_day}</td>
                        </tr>
                    ))
                        :
                        <tr>
                            <td colSpan={6}>대여 내역이 없습니다.</td>
                        </tr>
                    }
                </tbody>
            </table>
            {rentalData &&
                <EquipmentModal open={modalOpen} close={closeModal} data={rentalData}>
                    <DetailEquipment data={rentalData} repairBtnActive={true} due_date={due_date}>
                        <button style={{
                            marginTop: "14px"
                        }}
                            onClick={() => {
                                extensionDate(rentalID);
                            }}>
                            대여 기간 연장
                        </button>
                    </DetailEquipment>
                </EquipmentModal>
            }
            <Pagination page={page} setPage={setPage} active={!isSearch} />
        </div>
    );
}