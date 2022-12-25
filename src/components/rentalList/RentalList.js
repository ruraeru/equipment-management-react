import { useEffect, useState } from "react";
import axios from "axios";
import Search from "components/search/Search";
import { SiMicrosoftexcel } from "react-icons/si";
import "./RentalList.scss";
import DetailEquipment from "components/detail/DetailEquipment";

export default function RentalList() {
    const [rentalList, setRentalList] = useState();
    const [rentalListPage, setRentalListPage] = useState(1);
    const getRentalList = async () => {
        await axios.get(`http://120.142.105.189:5080/tool/viewToolList/1/${rentalListPage}`)
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
            width: "100%"
        }}>
            <div id="contents-header">
                <h3>대여 목록</h3>
                <p>대여 로그</p>
                <Search />
                {/*여기 엑셀 버튼을 나중에 컴포넌트로 따로 분리해주기 바람
                이유는 나중에 엑셀 export해주기 위해!! */}
                <SiMicrosoftexcel size="27px" color="#20744A" />
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
                            e.target.parentNode.classList.add("hide");
                            console.log(rentalList[index]);
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
                    <DetailEquipment />
                </tbody>
            </table>
            <footer>
                <p>
                    &lt;
                </p>
                {/* <ul style={{
                    display: "inline-flex",
                    listStyle: "none",
                }}>
                    <li>1</li>
                    <li>2</li>
                    <li>3</li>
                    <li>4</li>
                    <li>5</li>
                </ul> */}
                <button onClick={() => setRentalListPage(1)}>1</button>
                <button onClick={() => setRentalListPage(2)}>2</button>
                <button onClick={() => setRentalListPage(2)}>3</button>
                <button onClick={() => setRentalListPage(2)}>4</button>
                <button onClick={() => setRentalListPage(2)}>5</button>
                <p>
                    &gt;
                </p>
            </footer>
        </div>
    );
}